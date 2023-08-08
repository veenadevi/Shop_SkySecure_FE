import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { AddCompareProductModalComponent } from 'src/shared/components/modals/add-compare-product-modal/add-compare-product-modal.component';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'app-compare-products-result',
  templateUrl: './compare-products-result2.component.html',
  styleUrls: ['./compare-products-result2.component.css']
})
export class CompareProductsResultComponent {

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';
  allProducts: any[] = [];
  public onPageLoad: boolean = true;
  public subscriptions: Subscription[] = [];
  products: any[] = [];
  productVariants: any[] = [];
  productFamilyList: any[] = [];
  productFamilyVariants: any[] = [];
  public cachedProductsList : any[];

  public columnValues : any[];
  public comparisonCategories : any;

  tableData: any = [];
  cols: any[] = [];
  cars : any[] = [];

  public itemQuantity : number = 1;

  public emptyProductsLength : any = 0;
  allProperties = [
    // { 'ProductName': 'Product Name' },
    { 'DevelopedBy': 'Developed by' },
    // { 'SolutionCategory': 'Solution Category' },
    { 'Subscription': 'Subscription' },
    { 'EntryLevelPricing': 'Entry level pricing' },
    { 'Features': 'Features' }
  ]

  allSelectedItems = {
    "products": ["6480bdea94c4a49d614093f8", "64898f01cf520500558e7589"],
    "productsVariants": ["641308a7bdb764f8d6a252bb", "641308b1bdb764f8d6a252bd"],
    "productFamily": ["6412ac15bdb764f8d6a252a5", "64142fe6bdb764f8d6a25394"],
    "productFamilyVariants": ["64777c2afd0e9fa399bac9bc", "64777c2afd0e9fa399bac9bc"]
  }

  isArray(value: any): value is any[] {
    return Array.isArray(value);
  }

  getKey(obj: any): string {
    return Object.keys(obj)[0];
  }

  dataSource = [];
  displayColumns = ['username', 'age', 'title'];

  constructor(
    private route: ActivatedRoute,
    private metaDataSvc: MetadataService,
    private authService: MsalService,
    private cartStore: CartStore,
    private router: Router,
    private modalService: NgbModal,
    private userAccountStore : UserAccountStore,
    private compareProductsStore : CompareProductsStore
  ) {
    for (let i = 0; i < 50; ++i) {
      this.dataSource.push({
        username: 'test' + Math.random(),
        age: Math.floor(Math.random() * 50 + 1),
        title: Math.random() < 0.5 ? 'Mr' : 'Ms'
      });
    }
  }
  public ngOnInit(): void {

    
    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let combinedData = [...cacheData, ...cacheData2];
    let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];
    let reqBody = this.setPrdList(uniqueElements);
    this.cachedProductsList = uniqueElements;

    if(this.cachedProductsList.length <= 4){
      this.emptyProductsLength = 4 - this.cachedProductsList.length;
    }
    else{
      this.emptyProductsLength = 4;
    }
    
    
    //this.fetchCompareProductsList(this.allSelectedItems);
    this.fetchCompareProductsList(reqBody);
  }

  public setPrdList(data){
    let tempPrd = [];
    let tempPrdVar = [];
    let tempBundles = [];
    let tempPrdBundleVar = [];

 

    data.forEach(element => {
      switch (element.type) {
        case 'product':
          tempPrd.push(element._id);
          return;
  
        case 'productVariants':
          tempPrdVar.push(element._id);
          return;
          
        case 'productBundles':
          tempBundles.push(element._id);
          return;
        
        case 'productBundleVariants':
          tempPrdBundleVar.push(element._id);
          return;
  
        default:
          return null;
      }
    });
    let reqBody = {
      "products": tempPrd,
      "productsVariants": tempPrdVar,
      "productFamily": tempBundles,
      "productFamilyVariants": tempPrdBundleVar
    }


    
    return reqBody;
  }

  public fetchCompareProductsList(allSelectedItems: any) {
    this.onPageLoad = false;
    this.subscriptions.push(
      this.metaDataSvc.fetchCompareProductsList(allSelectedItems).subscribe(response => {
        
        this.products = this.setProductsData(response);

        /*this.products = response.products.map((data: any) => {
        
          //let productData = data.products[0];
          let productData = data.products;
          
          let properties = {
            'productName': productData.name,
            'developedBy': 'Microsoft',
            'solutionCategory': productData?.subcategories?.name ? productData?.subcategories?.name : '-',
            'subscription': productData?.priceList[0]?.priceType ? productData?.priceList[0]?.priceType : '-',
            'entryLevelPricing': productData?.priceList[0]?.price ? `INR ${productData?.priceList[0].price}` : '-',
            'price' : productData?.priceList[0]?.price ? productData?.priceList[0].price : '',
            'features': data.featureList.length > 0 ? data.featureList : 'No Features',
           'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
           '_id' : productData._id
          }
          return { properties};
        })*/


        
        this.productVariants = this.setProductVarientsData(response);

        /*this.productVariants = response.productVariants.map((data: any) => {
          let productData = data.products;
          let productVariantData = data.productVariants;
          let properties = {
            'productName': productVariantData.name,
            'developedBy': 'Microsoft',
            'solutionCategory': productData?.subcategories[0]?.name ? productData?.subcategories[0]?.name : '-',
            'subscription': productVariantData?.priceList[0]?.priceType ? productVariantData?.priceList[0]?.priceType : '-',
            'entryLevelPricing': productVariantData?.priceList[0]?.price ? `INR ${productVariantData?.priceList[0].price}` : '-',
            'price' : productVariantData?.priceList[0]?.price ? productVariantData?.priceList[0].price : '',
            'features': data.featureList.length > 0 ? data.featureList : 'No Features',
            'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
            '_id' : productVariantData._id

          }
          return { properties };
        })*/

        this.productFamilyList  = this.setProductFamilyList(response);
        /*this.productFamilyList = response.productFamily.map((data: any) => {
          let productData = data.productFamily;
          let properties = {
            'productName': productData.name,
            'developedBy': 'Microsoft',
            'solutionCategory': productData?.subcategories[0]?.name ? productData?.subcategories[0]?.name : '-',
            'subscription': productData?.priceList[0]?.priceType ? productData?.priceList[0]?.priceType : '-',
            'entryLevelPricing': productData?.priceList[0]?.price ? `INR ${productData?.priceList[0].price}` : '-',
            'price' : productData?.priceList[0]?.price ? productData?.priceList[0].price : '',
            'features': data.features.length > 0 ? data.features : 'No Features',
            'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
            '_id' : productData._id
          }
          return { properties};
        })*/

        this.productFamilyVariants = this.setProductFamilyVarients(response);
        /*this.productFamilyVariants = response.productFamilyVariants.map((data: any) => {
          let productData = data.productFamily;
          let productVariantData = data.productFamilyVariant;
          let properties = {
            'productName': productVariantData.name,
            'developedBy': 'Microsoft',
            'solution Category': productVariantData?.subcategories[0]?.name ? productVariantData?.subcategories[0]?.name : '-',
            'subscription': productVariantData?.priceList[0]?.priceType ? productVariantData?.priceList[0]?.priceType : '-',
            'entryLevelPricing': productVariantData?.priceList[0]?.price ? `INR ${productVariantData?.priceList[0].price}` : '-',
            'price' : productVariantData?.priceList[0]?.price ? productVariantData?.priceList[0].price : '',
            'features': data.productFamilyVariantFeatures.length > 0 ? data.productFamilyVariantFeatures : 'No Features',
            'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
            '_id' : productVariantData._id
          }
          return { properties};
        })*/
        

        this.allProducts = this.products.concat(this.productVariants,this.productFamilyList,this.productFamilyVariants);

        this.setQuantity();
        this.setTableData(this.allProducts);
        
        console.log("))))))++++++ ", this.allProducts);
        this.allProducts = this.allProducts.slice(0,4);
      })
    );
  }


  public setProductsData(response){
    let item = response.products.map((data: any) => {
        
      //let productData = data.products[0];
      let productData = data.products;
      
      let properties = {
        'productName': productData.name,
        'developedBy': 'Microsoft',
        'solutionCategory': productData?.subcategories?.name ? productData?.subcategories?.name : '-',
        'subscription': productData?.priceList[0]?.priceType ? productData?.priceList[0]?.priceType : '-',
        'entryLevelPricing': productData?.priceList[0]?.price ? `INR ${productData?.priceList[0].price}` : '-',
        'price' : productData?.priceList[0]?.price ? productData?.priceList[0].price : '',
        'features': data.featureList.length > 0 ? data.featureList : 'No Features',
       'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
       '_id' : productData._id
      }
      return { properties};
    })

    return item;

  }


  public setProductVarientsData(response){
    let item = response.productVariants.map((data: any) => {
      let productData = data.products;
      let productVariantData = data.productVariants;
      let properties = {
        'productName': productVariantData.name,
        'developedBy': 'Microsoft',
        'solutionCategory': productData?.subcategories[0]?.name ? productData?.subcategories[0]?.name : '-',
        'subscription': productVariantData?.priceList[0]?.priceType ? productVariantData?.priceList[0]?.priceType : '-',
        'entryLevelPricing': productVariantData?.priceList[0]?.price ? `INR ${productVariantData?.priceList[0].price}` : '-',
        'price' : productVariantData?.priceList[0]?.price ? productVariantData?.priceList[0].price : '',
        'features': data.featureList.length > 0 ? data.featureList : 'No Features',
        'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
        '_id' : productVariantData._id

      }
      return { properties };
    })

    
    return item;
  }

  public setProductFamilyList(response){
    let item = response.productFamily.map((data: any) => {
      let productData = data.productFamily;
      let properties = {
        'productName': productData.name,
        'developedBy': 'Microsoft',
        'solutionCategory': productData?.subcategories[0]?.name ? productData?.subcategories[0]?.name : '-',
        'subscription': productData?.priceList[0]?.priceType ? productData?.priceList[0]?.priceType : '-',
        'entryLevelPricing': productData?.priceList[0]?.price ? `INR ${productData?.priceList[0].price}` : '-',
        'price' : productData?.priceList[0]?.price ? productData?.priceList[0].price : '',
        'features': data.features.length > 0 ? data.features : 'No Features',
        'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
        '_id' : productData._id
      }
      return { properties};
    })

    return item;
  }

  public setProductFamilyVarients(response){
    let item = response.productFamilyVariants.map((data: any) => {
      let productData = data.productFamily;
      let productVariantData = data.productFamilyVariant;
      let properties = {
        'productName': productVariantData.name,
        'developedBy': 'Microsoft',
        'solution Category': productVariantData?.subcategories[0]?.name ? productVariantData?.subcategories[0]?.name : '-',
        'subscription': productVariantData?.priceList[0]?.priceType ? productVariantData?.priceList[0]?.priceType : '-',
        'entryLevelPricing': productVariantData?.priceList[0]?.price ? `INR ${productVariantData?.priceList[0].price}` : '-',
        'price' : productVariantData?.priceList[0]?.price ? productVariantData?.priceList[0].price : '',
        'features': data.productFamilyVariantFeatures.length > 0 ? data.productFamilyVariantFeatures : 'No Features',
        'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
        '_id' : productVariantData._id
      }
      return { properties};
    })

    return item;
  }

  public setQuantity(){

    this.allProducts.forEach(element => {
        if(element.quantity){
          element.quantity = element.quantity
        }
        else{
          element['quantity'] = 1;
        }
    });
  }

  public quantityEdit(i, opr) : void {


    if(opr === 'plus'){
      this.allProducts[i].quantity = Number(this.allProducts[i].quantity) + 1;
      
    }
    else if(opr === 'minus'){

      if(this.allProducts[i].quantity === 0){
        this.allProducts[i].quantity = 0;
      }
      else{
        this.allProducts[i].quantity = Number(this.allProducts[i].quantity) - 1;
      }
        
        
    }
  }

  public requestQuote (productItem : any) : void {

    console.log("()()(+++++++ ", productItem);
    var product = productItem.properties;
    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    
    let queryParams;
      // if(product.productVariants.length>0){
        queryParams = {
          productName : product.productName,
          productId : product._id,
          quantity : productItem.quantity,
          price : product.price,
        };



    this.userAccountStore.userDetails$.subscribe(res=>{
      
      if(res && res.email !== null){
        this.router.navigate(['/cart'], {queryParams: queryParams});
      }
      else{
        this.viewModal(queryParams);
      }
    })
  }

  public removeItem(product){
    
      
      this.allProducts = this.allProducts.filter(function(item) {
        return item.properties._id != product.properties._id;
      });
      
      
      this.cachedProductsList = this.cachedProductsList.filter(function(item) {
        return item._id != product.properties._id;
      });
      
      
      localStorage.setItem('product_list_to_compare', JSON.stringify(this.cachedProductsList));
      localStorage.setItem('product_list_to_compare2', JSON.stringify(this.cachedProductsList));
      this.compareProductsStore.setCompareProductsList2(this.cachedProductsList); 
      
     
      
      this.emptyProductsLength = this.emptyProductsLength + 1;
      let tempData = {

        'id' : 'null',
        'properties' : {
          'productName': '-',
          'developedBy': '-',
          'solutionCategory': '-',
          'subscription': '-',
          'entryLevelPricing': '-',
          'price' : '-',
          'features': null,
          'bannerLogo' : '-',
          '_id' : null
        }
        
      }
  
      
        this.allProducts.push(tempData);
      
      
      
    
  }

  public viewModal(queryParams) {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
    modalRef.componentInstance.request = queryParams;
  }


  public frozenCols : any;
  public scrollableCols : any;
  public setTableData(products){


    let emptyLength = 4 - products.length;

    let tempData = {

      'id' : 'null',
      'properties' : {
        'productName': '-',
        'developedBy': '-',
        'solutionCategory': '-',
        'subscription': '-',
        'entryLevelPricing': '-',
        'price' : '-',
        'features': null,
        'bannerLogo' : '-',
        '_id' : null
      }
      
    }

    for(let i=0;i<emptyLength;i++){
      this.allProducts.push(tempData);
    }

    
    

  this.scrollableCols = [
    { field: 'headerName', header: '' },
    { field: 'prd1', header: '' },
    { field: 'prd2', header: '' },
    { field: 'prd3', header: '' },
    { field: 'prd4', header: '' }
  ];

  this.columnValues = [];
  

  this.comparisonCategories = [
    { "header" : "price" , "headerName" : "Price"},
    // { "header" : "productName" , "headerName" : "Product Name"},
    { "header" : "developedBy" , "headerName" : "Developed By"},
    { "header" : "solutionCategory" , "headerName" : "Solution Category"},
    { "header" : "subscription" , "headerName" : "Product Name"},
    { "header" : "entryLevelPricing" , "headerName" : "Entry Level Pricing"},
    { "header" : "features" , "headerName" : "Features"},
    
    
  ]

  // this.frozenCols = [
  //     { field: 'vin', header: 'Vin' },
  // ];
    this.cars = [
          {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
          {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
          {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
          {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
          {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
          {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
          {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
          {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
          {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
          {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"},
          {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
          {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
          {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
          {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
          {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
          {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
          {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
          {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
          {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
          {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
          {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
          {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
          {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
          {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
          {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
          {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
          {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
          {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
      ]
  
  
  }

  public selectedProductItem(event){

    event.receivedEntry.type = event.receivedEntry.productType;


    let reqBody = this.setReqBody(event.receivedEntry);


    this.subscriptions.push(
      this.metaDataSvc.fetchCompareProductsList(reqBody).subscribe( response => {
      
        if(event.receivedEntry.productType === "productVariants"){
 
    
          let finalData = this.setProductVarientsData(response);
  
          this.allProducts[event.index] = finalData[0];
          
        }
        else if(event.receivedEntry.productType === "productBundles"){
          let aa = this.setProductFamilyList(response);
          let finalData = this.setProductFamilyList(response);
  
          this.allProducts[event.index] = finalData[0];
         
        }
        else if(event.receivedEntry.productType === "productBundleVariants"){
          let aa = this.setProductFamilyVarients(response);
          let finalData = this.setProductFamilyVarients(response);
  
          this.allProducts[event.index] = finalData[0];
          
        }
        else{
          let aa = this.setProductsData(response);
          let finalData = this.setProductsData(response);
  
          this.allProducts[event.index] = finalData[0];
          
        }

        

        let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
        let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
        let combinedData = [...cacheData, ...cacheData2];
        let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];

        let finalProducts = [...uniqueElements, event.receivedEntry];

        
        localStorage.setItem('product_list_to_compare', JSON.stringify(finalProducts));
        localStorage.setItem('product_list_to_compare2', JSON.stringify(finalProducts));
      })
    )

    
    
    

  }

  public setReqBody(receivedEntry){
    let reqBody = {
      "products": [],
      "productsVariants": [],
      "productFamily": [],
      "productFamilyVariants": []
    }

      
    switch (receivedEntry.productType) {
      case 'product':
        reqBody.products.push(receivedEntry._id);
        return reqBody;

      case 'productVariants':
        reqBody.productsVariants.push(receivedEntry._id);
        return reqBody;
        
      case 'productBundles':
        reqBody.productFamily.push(receivedEntry._id);
        return reqBody;
      
      case 'productBundleVariants':
        reqBody.productFamilyVariants.push(receivedEntry._id);
        return reqBody;

      default:
        return null;
    }
  }

  public quantityEditForRequestQuote(quantity, type){

    if(type === 'plus'){
      quantity = quantity+1;
      this.itemQuantity = quantity;
    }
  }

  public requestQuoteItem(val){
    console.log("++++++++ ", val);
    
  }

  public addProductModal(index) {
    const modalRef = this.modalService.open(AddCompareProductModalComponent, {size: 'lg', windowClass: 'add-compare-products-custom-class'});
    //modalRef.componentInstance.request = queryParams;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      let productJson = {
        "receivedEntry" : receivedEntry,
        "index" : index
      }

      this.selectedProductItem(productJson);
      //this.selectedProductItem.emit(productJson);

    })
  }

   
}

  

