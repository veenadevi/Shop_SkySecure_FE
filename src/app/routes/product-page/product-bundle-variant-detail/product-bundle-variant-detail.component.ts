import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { GetFreeCallModalComponent } from 'src/shared/components/modals/get-free-call-modal/get-free-call-modal.component';
import { CompressOutlined } from '@mui/icons-material';


@Component({
  selector: 'app-product-bundle-variant-detail',
  templateUrl: './product-bundle-variant-detail.component.html',
  styleUrls: ['./product-bundle-variant-detail.component.css']
})
export class ProductBundleVariantDetailComponent implements OnInit {
  public displayBasic: boolean; 

  productDescriptionWordLimit: number = 50;

  public currentRoute: string;
  // links = ['#description', '#feature', '#specification', '#reviews', '#compProd', '#bundleDetailsRef', '#simProd','#faq'];
  // titles = ['Description', 'Features', 'Specification', 'Reviews', 'Compare Products', 'Bundle Details', 'Similar Products','FAQ'];

  public completeFeatureList : any[] = [];

  public viewAllFeaturesDetails = false;
  productVideoURL: string;
  
  links = ['#description', '#feature', '#specification', '#compProd', '#bundleDetailsRef', '#simProd','#faq'];
  titles = ['Description', 'Features', 'Specification', 'Compare Products', 'Bundle Details', 'Similar Products','FAQ'];
  activeLink = this.links[0];
  myColor = '';
  public productImages=[];

  public dummyImages = [1,2,3,4];


  @ViewChild('descriptionRef') descriptionRef!: ElementRef;
  @ViewChild('featureRef') featureRef!: ElementRef;
  @ViewChild('specificationRef') specificationRef!: ElementRef;
  @ViewChild('reviewsRef') reviewsRef!: ElementRef;
  @ViewChild('compProdRef') compProdRef!: ElementRef;
  @ViewChild('bundleDetailsRef') bundleDetailsRef!: ElementRef;
  @ViewChild('simProdRef') simProdRef!: ElementRef;
  @ViewChild('section2Ref') section2Ref!: ElementRef;
  @ViewChild('faqRef') faqRef!: ElementRef;


    // ----- >>>> compare products Scroll function ----- >>>>

    scrollFunctionRight(){
      let left = document.querySelector(".scroll-content")
      left.scrollBy(200, 0);
    };
  
    scrollFunctionLeft(){
      let right = document.querySelector(".scroll-content")
      right.scrollBy(-200, 0);
    };

    public offerVisible:boolean = true
    
    onclickOffer(){
      {
        // this.ReadMore = !this.ReadMore; //not equal to condition
        this.offerVisible = !this.offerVisible
      }
    }


  scrollToSection(sectionId: any): void {

    this.activeLink = sectionId;
    sectionId = sectionId.slice(1);
    let section;
    if (sectionId === 'description') {
      section = this.descriptionRef.nativeElement
    } else if (sectionId === 'feature') {
      section = this.featureRef.nativeElement
    } else if (sectionId === 'specification') {
      section = this.specificationRef.nativeElement
    }
    else if (sectionId === 'reviews') {
      section = this.reviewsRef.nativeElement
    }
    else if (sectionId === 'compProd') {
      section = this.compProdRef.nativeElement
    }
    else if (sectionId === 'bundleDetailsRef') {
      section = this.bundleDetailsRef.nativeElement
    }
    else if (sectionId === 'simProd') {
      section = this.simProdRef.nativeElement
    }
    else if (sectionId === 'faq') {
      section = this.faqRef.nativeElement
    }
    section.scrollIntoView({ behavior: 'smooth' });
  }

  openLink(url: any): void {
    // console.log("url", url);
    window.open(url, '_blank');
  }


  readMore: boolean= false;
  
  public openDescription01(): void {
    this.readMore= !this.readMore;
  }



  seeMore: boolean = false;

  public openDescription(): void {
    this.seeMore= !this.seeMore;
  }

  private setData(response){}



  private  getProductDetails(productId: string): void {
    this.subscriptions.push(
      this.metaDataSvc.fetchSingleProductDetails(productId).subscribe( (response) => {
        let fList = [];
        if (response.featureList?.length > 0) {
          
          this.completeFeatureList = response.featureList;
         if(response.featureList.length > 5){
            // this.features = response.featureList.slice(0,5);
            this.features = response.featureList;
          }
          else{
            this.features = response.featureList;
          }
        //  this.features = response.featureList.slice(0,5);
    
        }
       
        // console.log("inside", this.features);
        
      })


    );
  }


  viewAllFeature = false;
  checked: boolean = false;

  featureList = [];
  productbundlevariants ;


  constructor(
    private route: ActivatedRoute,
    private metaDataSvc : MetadataService,
    private authService : MsalService,
    private cartStore : CartStore,
    private router : Router,
    private modalService : NgbModal,
    private compareProductsStore : CompareProductsStore,
    private userAccountStore : UserAccountStore
  ){
    this.router.events.subscribe((event: Event) => {
        let currentUrl = this.route.snapshot.paramMap.get('id');
        
        if (event instanceof NavigationStart) {
            // Show progress spinner or progress bar
            //this.ngOnInit();
            //console.log('@@@@@@@@ _ Route change detected');
            currentUrl = this.route.snapshot.paramMap.get('id');
            //console.log('@@@@@@@@ _ Route change Start', currentUrl);
        }

        if (event instanceof NavigationEnd) {
            // Hide progress spinner or progress bar
            this.currentRoute = event.url; 
            currentUrl = this.route.snapshot.paramMap.get('id');
            this.ngOnInit();
            // console.log('@@@@@@@@ _ Route change End');         
            //console.log("@@@@@@@@ _ ",event);
        }

        if (event instanceof NavigationError) {
             // Hide progress spinner or progress bar

            // Present error to user
            //console.log("@@@@@@@@ _ ", event.error);
        }
    });
  }
  featureCount=5;

  public onPageLoad : boolean = true;

  public subscriptions : Subscription[] = [];
  


  // public bundleSku : any;

  // public productFamilylist : any[] = [];




  public productFamilyVariant : any;

  

  public productFamily : any;

  public faq : any[]=[];

  public products : any[] = [];

  public features : any[] = [];

  public productVarients : any[] = [];

  public productFamilyVariants : any[] = []

  public productBundleVarientData : any;

  public allCompareProducts: any[];

  public allSimilerProducts: any[];
  public allBundleDetais: any[];
  public childProductFamilies:any[];
  public childProductFamilyVariant :any[];

  public childproducts:any[];
  public childproductVariants :any[];

  public bundleDetails:any[];
  public finalBundleDetails :any[];

  public selectedProductItem : any[] = [];
  productListToCompare  = [];

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';
 




  public ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.viewAllFeature=false;

    this.productListToCompare = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    this.getBrandDetails(productId);
  }

  public navigateToProductDetails(product:any){
    
    /*if(this.routePath === 'productBundles'){
      this.router.navigate(['/products/brand-detail', product._id]);
    }
    else{
      this.router.navigate(['/products', product._id]);
    }*/

    
    
    switch (product.type) {
      case 'product':
        this.router.navigate(['/products', product._id]);
        return;

      case 'productVariants':
        this.router.navigate(['/products/product-variant-detail', product._id]);
        return;
        
      case 'productBundles':
        this.router.navigate(['/products/product-bundle-detail', product._id]);
        return;
      
      case 'productBundleVariants':
        this.router.navigate(['/products/product-bundle-varaint-detail', product._id]);
        return;

      default:
        return null;
    }
    
  }
  public featureCountEvent(val): void {
   
    // console.log("****** View Before", val);
    val = val ? false : true;
    // console.log("****** View ", val);
    this.viewAllFeaturesDetails = val;
    // console.log("****** View ", this.viewAllFeaturesDetails);
    if(this.viewAllFeaturesDetails){
      // console.log("****** In If");
      // console.log("****** In If", this.completeFeatureList);
      this.features = this.completeFeatureList;
    }
    else{
      // console.log("****** In Else");
      // console.log("****** In Else", this.completeFeatureList);
      if(this.completeFeatureList.length>5){
        this.features = this.completeFeatureList.slice(0,5);
      }
      else{
        this.features = this.completeFeatureList;
      }
      
      
    }
    
  
      
      
      // console.log("product list to compare",this.productListToCompare);
    // }
  }


  

  public getBrandDetails(id){
    //id = '6412ac15bdb764f8d6a252a5';
    this.onPageLoad = false;
    this.subscriptions.push(
       this.metaDataSvc.fetchSingleProductBundleVariantDetails(id).subscribe( response => {
        this.productBundleVarientData = response;
        //this.productFamilyVariant = response.productFamilyVariant;
        //this.productFamilyVariant={...response.productFamilyVariant, quantity: 1 }
        this.productFamilyVariant=this.setProductBundleVariantsData(response.productFamilyVariant,response.productFamily)

        this.productFamilyVariants = response.productFamilyVariants;
        this.productFamily = response.productFamily;

        this.features = response.productFamilyVariantFeatures;
        if (response.productFamilyVariantFeatures?.length > 0) {
          
          this.completeFeatureList = response.productFamilyVariantFeatures;
         if(response.productFamilyVariantFeatures.length > 5){
            this.features = response.productFamilyVariantFeatures;
          }
          else{
            this.features = response.productFamilyVariantFeatures;
          }
         //this.features = response.productFamilyVariantFeatures.slice(0,5);
        //  this.featureList = response.featureList.slice(0,5);
          // this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
        }

        //Picking Child Product and Productvariants

        // console.log("fetching detailscchild product "+response.productFamilyVariantLicenseList.childProducts.length)

        this.childproducts=this.setProductsData(response.productFamilyVariantLicenseList.childProducts);
        // console.log("fetched child products for this bundle "+this.childproducts.length)

        // console.log("calling TS ---333")

        this.childproductVariants=this.setProductVariantsData(response.productFamilyVariantLicenseList.childProductVariants);
        // console.log("fetched child productVariants for this bundle "+this.childproductVariants.length)
        // console.log("calling TS ---444")

        this.childProductFamilies=this.setProductFamilyData(response.productFamilyVariantLicenseList.childProductFamily);
        // console.log("fetched child childproductFamily for this bundle "+this.childProductFamilies.length)

        this.childProductFamilyVariant=this.setChildProductBundleVariantsData(response.productFamilyVariantLicenseList.childProductFamilyVariant);
        // console.log("fetched child childproductFamilyVariants for this bundle "+this.childProductFamilyVariant.length)

        this.faq  = this.productFamilyVariant.productFAQ;

        this.onPageLoad = true;
        this.allCompareProducts = [...this.childproducts,...this.childproductVariants,...this.childProductFamilies,...this.childProductFamilyVariant];;
        this.allSimilerProducts =[...this.childproducts,...this.childproductVariants,...this.childProductFamilies,...this.childProductFamilyVariant];
        this.allBundleDetais=[...this.childproducts,...this.childproductVariants,...this.childProductFamilies,...this.childProductFamilyVariant];
        // this.allCompareProducts = this.products;
        // this.allSimilerProducts = [...this.products,...this.productVarients,...this.childProductFamilies,...this.childProductFamilyVariant];
       // this.allSimilerProducts = this.allSimilerProducts.slice(0,3);
       // this.bundleDetails=this.products.concat(this.productVarients,this.childProductFamilies,this.childProductFamilyVariant);

        
        if(this.productFamily && this.productFamily.productImages && this.productFamily.productImages.length>0) {
          this.productImages = this.productFamily.productImages;
        } else {
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        }
        this.productImages=this.productImages.slice(0,4);

        this.completeFeatureList = response.featureList;
        if(this.productbundlevariants && this.productbundlevariants.productVideoURL && this.productbundlevariants.productVideoURL.length>0){
          this.productVideoURL = this.productbundlevariants.productVideoURL[0].source ;
        } 
      else{
        this.productVideoURL = "https://www.youtube.com/embed/LWjxyc4FGGs?rel=0";
      }
        let tempProducts = this.setProductsData(this.products);
        let tempProductVariants = this.setProductVariantsData(this.productVarients);
      //  let tempProductBundleVariants = this.setProductBundleVariantsData(this.childProductFamilyVariant);
        let tempProductBundles = this.setProductFamilyData(this.childProductFamilies);
       // this.finalBundleDetails = [...tempProducts,...tempProductBundles, ...tempProductVariants,...tempProductBundleVariants] ;
     
      //  console.log("=====finalBundleDetails====="+this.finalBundleDetails.length)
        // this.finalBundleDetails={...this.finalBundleDetails,quantity: 1 }

        this.setCheckBoxState();
      })
    );
  }





    
    





  


  public setProductsData(data){
    // console.log("=====setProductsData==="+data.length)
    if(data && data.length>0){
      
      data.forEach(element => {
        element.name=element.name;
          element.type = 'product';
          element.bannerLogo = (element.bannerLogo && element.bannerLogo !== null) ? element.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.subCategories && element.subCategories.length > 0)? element.subCategories[0].name : ''
          element['navigationId'] = element._id;
          element.priceList=element.priceList
          element.quantity=1
      });
    }
    
    return data;
  }

  /**
   * Set Product Variants Data
   */

  public setProductVariantsData(data){
    
// console.log("======setProductVariantsData===="+data.length)
    if(data && data.length>0){
      data.forEach(element => {
        element.name=element.name;
          element.type = 'productVariants';
          element.bannerLogo = (element.products && element.products.length>0 && element.products[0].bannerLogo) ? element.products[0].bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.products  && element.products.subCategories && element.products.subCategories.length > 0) ? element.products.subCategories[0].name : "";
         console.log("fetching solution cat ==="+element['solutionCategory'])
          element['navigationId'] = element._id;
          element.priceList=element.priceList;
          element.quantity=1
      });
    }

    return data;
  }

  /**
   * Set Product Bundle Variants Data
   */

  public setProductBundleVariantsData(element,productFamily){

    //if(data && data.length>0){
     // console.log("===========setProductBundleVariantsData======="+data.length)
      //data.forEach(element => {
        element.name=element.name;
          element.type = 'productBundleVariants';
          element.bannerLogo = (productFamily.bannerLogo &&productFamily.bannerLogo !== null) ? productFamily.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
         // element.solutionCategory=(element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['solutionCategory'] = (element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['navigationId'] = element._id;
          element.priceList=element.priceList
          element.quantity=1
     // });
    //}

    return element;
  }

  public setChildProductBundleVariantsData(data){

    if(data && data.length>0){
      // console.log("===========setProductBundleVariantsData======="+data.length)
      data.forEach(element => {
        element.name=element.name;
          element.type = 'productBundleVariants';
          element.bannerLogo = (element.productFamily[0].bannerLogo &&element.productFamily[0].bannerLogo !== null) ? element.productFamily[0].bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element.solutionCategory=(element.subCategories && element.subCategories.length > 0)? element.subCategories[0].name : ''
          element['solutionCategory'] = (element.subCategories && element.subCategories.length > 0)? element.subCategories[0].name : ''
          element['navigationId'] = element._id;
          element.priceList=element.priceList
          element.quantity=1
      });
    }

    return data;
  }

  /**
   * Set Product Bundles Data
   */

  public setProductFamilyData(data){

    if(data && data.length>0){
      data.forEach(element => {
        element.name=element.name;
          element.type = 'productBundles';
          element.bannerLogo = (element.bannerLogo && element.bannerLogo !== null) ? element.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['navigationId'] = element._id;
          element.priceList=element.priceList
          element.quantity=1
      });
    }

    return data;
  }


  public getColor(val){
    if(val){
      return val.toLowerCase();
    }
    else{
      return 'black';
    }
    
  }
  
  position: string = 'left';
  quantityCount = 1;
  addQuantity(quantity:any,index:any):void {
    
    this.allBundleDetais[index].quantity = quantity+1;
  }
  decreaseQuantity(quantity:any,index:any): void {
    if(quantity>1){
      this.allBundleDetais[index].quantity = quantity-1;
    }
  }

  addBuyQuantity(quantity:any):void {
    this.productFamilyVariant.quantity = quantity+1;
  }
  decreaseBuyQuantity(quantity:any): void {
    if(quantity>1){
      this.productFamilyVariant.quantity = quantity-1;
    }
  }

public requestQuote (productFamilyVariant : any) : void {

  
  let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

  let queryParams;
    
      queryParams = {
        productName : productFamilyVariant.name,
        productId : productFamilyVariant._id,
        quantity : productFamilyVariant.quantity,
        price : productFamilyVariant.priceList[0].price,
      };
    
  /*if(loggedinData.length > 0 ){
    
    var existingItems = this.cartStore.getCartItems();
    console.log( productFamilyVariant);
    
    console.log(queryParams);
    this.router.navigate(['/cart'], {queryParams: queryParams});
  }

  else {
    this.viewModal(queryParams);
  }*/


  this.userAccountStore.userDetails$.subscribe(res=>{
    // console.log("()()()() ", res);
    if(res && res.email !== null){
      this.router.navigate(['/cart'], {queryParams: queryParams});
    }
    else{
      this.viewModal(queryParams);
    }
  })

  


  




}

  public onCheckBoxChange($event, item:any, type:any){
      
    if($event.checked){
      this.addToCompare(item, type);
    }
    else{
      this.removeSelectedItem(item._id);
    }
  }

async addToCompare(item:any, type:any):Promise<void> {
  // if(!item.checked)
  // item.checked = true;

  // if(item.checked)
  // item.checked = false;
  // else
  // item.checked = true;
  let count=0;
  /*await this.productListToCompare.forEach(val => {
    if(val._id===item._id) {
      count++;
    }
  });
  if (count===0) {
    if(type!='prodFam')
    item = { ...item, 'solutionCategory': item.subcategories[0]?.description };
    else
    item = { ...item, 'solutionCategory': item.subCategories[0]?.description };
    this.productListToCompare.push(item);
  }*/

  if(type === 'fromProd'){
    // console.log("()()() From Prom Prod");
    // console.log("()()()( From Prod", item);
    this.productListToCompare.push(item);
    
  }
  else{
    this.productListToCompare.push(item);
  }

  
  localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));

  //this.productListToCompare.push(item);

  
  
  this.compareProductsStore.setCompareProductsList2(this.productListToCompare);
  // console.log("getProdFromLocalStorage",this.productListToCompare);
  //localStorage.removeItem('product_list_to_compare');
  localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
  localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));
  //const prodGet = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
  //console.log("getProdFromLocalStorage",prodGet);
}

public removeSelectedItem(_id:any){
  this.productListToCompare = this.productListToCompare.filter(function(item) {
    return item._id != _id;
  });
  
  localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
  localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));
  this.compareProductsStore.setCompareProductsList2(this.productListToCompare);
  
}

  public setCheckBoxState(){

    //productFamily
    //allCompareProducts

    

    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let combinedData = [...cacheData, ...cacheData2];
    let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];

    /*var index = productsList.findIndex(el => el.productId === item._id);
      
    if(index >=0){
      productsList[index].quantity = Number(productsList[index].quantity) + 1;
    }*/

    var index = uniqueElements.findIndex(el => el._id === this.productFamilyVariant._id);
    if(index >=0){
      if(this.productFamilyVariant.checked){
        this.productFamilyVariant.checked = true;
      }
      else{
        this.productFamilyVariant['checked'] = true;
      }
    }
    else{
      if(this.productFamilyVariant.checked){
        this.productFamilyVariant.checked = false;
      }
      else{
        this.productFamilyVariant['checked'] = false;
      }
    }

    this.allCompareProducts.forEach(element => {
      var index = uniqueElements.findIndex(el => el._id === element._id);
      if(index >=0){
        if(element.checked){
          element.checked = true;
        }
        else{
          element['checked'] = true;
        }
      }
      else{
        if(element.checked){
          element.checked = false;
        }
        else{
          element['checked'] = false;
        }
      }
    });


  }

  public viewModal2(queryParams) {
    const modalRef = this.modalService.open(GetFreeCallModalComponent);
    modalRef.componentInstance.request = queryParams;
  }

public viewModal(queryParams) {
  const modalRef = this.modalService.open(LoginAlertModalComponent);
  modalRef.componentInstance.request = queryParams;
}

public showDialog(){
  const modalRef = this.modalService.open(GetFreeCallModalComponent);
}

showBasicDialog() {
  //this.displayBasic = true;
  this.viewModal2(null);
}
ngOnDestroy(){
    
}

}