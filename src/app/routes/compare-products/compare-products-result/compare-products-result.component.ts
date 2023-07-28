import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'app-compare-products-result',
  templateUrl: './compare-products-result.component.html',
  styleUrls: ['./compare-products-result.component.css']
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
        
        this.products = response.products.map((data: any) => {
        
          //let productData = data.products[0];
          let productData = data.products;
          
          let properties = {
            'ProductName': productData.name,
            'DevelopedBy': 'Microsoft',
            'SolutionCategory': productData?.subcategories[0]?.name ? productData?.subcategories[0]?.name : '-',
            'Subscription': productData?.priceList[0]?.priceType ? productData?.priceList[0]?.priceType : '-',
            'EntryLevelPricing': productData?.priceList[0]?.price ? `INR ${productData?.priceList[0].price}` : '-',
            'price' : productData?.priceList[0]?.price ? productData?.priceList[0].price : '',
            'Features': data.featureList.length > 0 ? data.featureList : 'No Features',
           'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
           '_id' : productData._id
          }
          return { properties};
        })

        this.productVariants = response.productVariants.map((data: any) => {
          let productData = data.products;
          let productVariantData = data.productVariants;
          let properties = {
            'ProductName': productVariantData.name,
            'DevelopedBy': 'Microsoft',
            'SolutionCategory': productData?.subcategories[0]?.name ? productData?.subcategories[0]?.name : '-',
            'Subscription': productVariantData?.priceList[0]?.priceType ? productVariantData?.priceList[0]?.priceType : '-',
            'EntryLevelPricing': productVariantData?.priceList[0]?.price ? `INR ${productVariantData?.priceList[0].price}` : '-',
            'price' : productVariantData?.priceList[0]?.price ? productVariantData?.priceList[0].price : '',
            'Features': data.featureList.length > 0 ? data.featureList : 'No Features',
            'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
            '_id' : productVariantData._id

          }
          return { properties };
        })

        this.productFamilyList = response.productFamily.map((data: any) => {
          let productData = data.productFamily;
          let properties = {
            'ProductName': productData.name,
            'DevelopedBy': 'Microsoft',
            'SolutionCategory': productData?.subcategories[0]?.name ? productData?.subcategories[0]?.name : '-',
            'Subscription': productData?.priceList[0]?.priceType ? productData?.priceList[0]?.priceType : '-',
            'EntryLevelPricing': productData?.priceList[0]?.price ? `INR ${productData?.priceList[0].price}` : '-',
            'price' : productData?.priceList[0]?.price ? productData?.priceList[0].price : '',
            'Features': data.features.length > 0 ? data.features : 'No Features',
            'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
            '_id' : productData._id
          }
          return { properties};
        })

        this.productFamilyVariants = response.productFamilyVariants.map((data: any) => {
          let productData = data.productFamily;
          let productVariantData = data.productFamilyVariant;
          let properties = {
            'ProductName': productVariantData.name,
            'DevelopedBy': 'Microsoft',
            'Solution Category': productVariantData?.subcategories[0]?.name ? productVariantData?.subcategories[0]?.name : '-',
            'Subscription': productVariantData?.priceList[0]?.priceType ? productVariantData?.priceList[0]?.priceType : '-',
            'EntryLevelPricing': productVariantData?.priceList[0]?.price ? `INR ${productVariantData?.priceList[0].price}` : '-',
            'price' : productVariantData?.priceList[0]?.price ? productVariantData?.priceList[0].price : '',
            'Features': data.productFamilyVariantFeatures.length > 0 ? data.productFamilyVariantFeatures : 'No Features',
            'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png',
            '_id' : productVariantData._id
          }
          return { properties};
        })
        

        this.allProducts = this.products.concat(this.productVariants,this.productFamilyList,this.productFamilyVariants);

        this.setQuantity();
        
        
        this.allProducts = this.allProducts.slice(0,4);
      })
    );
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

    var product = productItem.properties;
    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    let queryParams;
      // if(product.productVariants.length>0){
        queryParams = {
          productName : product.ProductName,
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
      
      
    
  }

  public viewModal(queryParams) {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
    modalRef.componentInstance.request = queryParams;
  }

   
}

  

