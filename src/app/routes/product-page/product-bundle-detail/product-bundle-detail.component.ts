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



@Component({
  selector: 'app-product-bundle-detail',
  templateUrl: './product-bundle-detail.component.html',
  styleUrls: ['./product-bundle-detail.component.css']
})
export class ProductBundleDetailComponent implements OnInit{
  public displayBasic: boolean; 
  productDescriptionWordLimit: number = 50;


  public currentRoute: string;
  links = ['#description', '#feature', '#specification', '#reviews', '#compProd', '#bundleDetailsRef', '#simProd'];
  titles = ['Description', 'Features', 'Specification', 'Reviews', 'Compare Products', 'Bundle Details', 'Similar Products'];
  activeLink = this.links[0];
  myColor = '';

  public productQuantity:  any = 1;

  public selectedProductItem : any[] = [];

  public bundleQuantity = 1;
  checked: boolean = false;

  @ViewChild('descriptionRef') descriptionRef!: ElementRef;
  @ViewChild('featureRef') featureRef!: ElementRef;
  @ViewChild('specificationRef') specificationRef!: ElementRef;
  @ViewChild('reviewsRef') reviewsRef!: ElementRef;
  @ViewChild('compProdRef') compProdRef!: ElementRef;
  @ViewChild('bundleDetailsRef') bundleDetailsRef!: ElementRef;
  @ViewChild('simProdRef') simProdRef!: ElementRef;
  @ViewChild('section2Ref') section2Ref!: ElementRef;

  // scroll section
  // @ViewChild('scrollContent', { static : true }) scrollContent! : ElementRef;
  // @ViewChild('rightArrow',    { static : true }) rightArrow!    : ElementRef;
  // @ViewChild('leftArrow',     { static : true }) leftArrow!     : ElementRef;


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
    section.scrollIntoView({ behavior: 'smooth' });
  }

  openLink(url: any): void {
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

  constructor(
    private route: ActivatedRoute,
    private metaDataSvc : MetadataService,
    private authService : MsalService,
    private cartStore : CartStore,
    private router : Router,
    private modalService : NgbModal,
    private userAccountStore : UserAccountStore,
    private compareProductsStore : CompareProductsStore,
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
            //console.log("@@@@@@@@ _ ",event);
        }

        if (event instanceof NavigationError) {
             // Hide progress spinner or progress bar

            // Present error to user
            //console.log("@@@@@@@@ _ ", event.error);
        }
    });
  }


  public onPageLoad : boolean = true;

  public subscriptions : Subscription[] = [];

  // public bundleSku : any;

  // public productFamilylist : any[] = [];

  public productFamily : any;

  public products : any[] = [];

  public childproducts : any[] = [];
  public childproductVariants : any[] = [];
  public childproductFamily : any[] = [];
  public childproductFamilyVariants : any[] = [];

  public features : any[] = [];

  public productVarients : any[] = [];

  public productFamilyVariants : any[] = []

  public productVarientData : any;

  public allCompareProducts: any[];

  public allSimilerProducts: any[];
  public bundleItemsList:any[];

  public productImages : any=[];
  productListToCompare  = [];

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';

  public ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productListToCompare = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    this.getBrandDetails(productId);
    
  }

  public featureCountEvent(): void {
    this.features = this.features
  }

  public getBrandDetails(id){
    //id = '6412ac15bdb764f8d6a252a5';
    this.onPageLoad = false;
    this.subscriptions.push(
       this.metaDataSvc.fetchSingleBrandDetails(id).subscribe( response => {

       // this.productVarientData = response;
        this.productFamily = response.productFamily;

        
       
        //This is not needed cos bundles which is listed not going to have Variant 

        //this.productFamilyVariants = response.productFamilyVariants;


        this.productVarients = response.productFamilyChildLicenseList.productVarients;

       
        this.products = response.productFamilyChildLicenseList.products;



        this.childproducts=this.setProductsData(response.productFamilyChildLicenseList.childproducts);
        
  

        this.childproductVariants=this.setProductVariantsData(response.productFamilyChildLicenseList.childproductVariants);
        

        this.childproductFamily=this.setProductFamilyData(response.productFamilyChildLicenseList.childProductFamily);
        
        this.childproductFamilyVariants=this.setChildProductFamilyVariant(response.productFamilyChildLicenseList.childProductFamilyVariant);
        
        this.allCompareProducts = [...this.childproducts, ...this.childproductVariants, ...this.childproductFamily,...this.childproductFamilyVariants]
        
        this.allCompareProducts.forEach(element => {
          element.name = String(element.name);
          
        });
        this.features = response.productFamilyFeatures;
        this.onPageLoad = true;


        //let tempProducts = this.setProductsData(this.products);
        //let tempProductVariants = this.setProductVariantsData(this.productVarients);
       // let tempChildProductFamilyVariants = this.setChildProductFamilyVariant(response.childProductFamilyVarient);
        //let tempProductBundles = this.setProductFamilyData(this.childProductFamilies);
        //let tempProductBundles = this.setBundlesData(this.childProductFamilies);

        this.bundleItemsList = [...this.childproducts, ...this.childproductVariants, ...this.childproductFamily,...this.childproductFamilyVariants]

       
     
       


        if( this.productFamily && this.productFamily.productImages && this.productFamily.productImages.length>0) {
          this.productImages = this.productFamily.productImages;
        } 
        else {
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        }
        this.productImages=this.productImages.slice(0,4);


      
        //this.allSimilerProducts = this.products.concat(response.productVarients,response.productFamilyVariants);
        //this.allSimilerProducts = this.allSimilerProducts.slice(0,3);
        this.setCheckBoxState();
      })
    );  
    
  }

  public setProductsData(data){
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
    

    if(data && data.length>0){
      data.forEach(element => {
        element.name=element.name;
          element.type = 'productVariants';
          element.bannerLogo = (element.products  && element.products.bannerLogo) ? element.products.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.products && element.products.subCategories && element.products.subCategories.length > 0) ? element.products.subCategories[0].name : "";
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

  public setChildProductFamilyVariant(data){

    if(data && data.length>0){
      data.forEach(element => {
          element.name=element.name;
          element.type = 'productBundleVariants';
          element.bannerLogo = (element.productFamily[0].bannerLogo &&element.productFamily[0].bannerLogo !== null) ? element.productFamily[0].bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          //element.solutionCategory=(element.subCategories && element.subCategories.length > 0)? element.subCategories[0].name : ''
          element['solutionCategory'] = (element.subCategories && element.subCategories.length > 0)? element.subCategories[0].name : 'Cybersecutiy and Compliance'
          element['navigationId'] = element._id;
          element.priceList=element.priceList
          element.quantity=1
      });
    }

    return data;
  }

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
  


  
  

  public changeQuantity(type){

    
    if(type === 'add'){
      this.productQuantity = Number(this.productQuantity) + 1;
    }
    else if(type === 'minus'){
      if(this.productQuantity === 0){
        this.productQuantity = 0;
      }
      else{
        this.productQuantity =  Number(this.productQuantity) - 1;
      }
      
    }
  }

  public buyNow(item, quantity){
    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    let queryParams;
      // if(product.productVariants.length>0){
        queryParams = {
          productName : item.name,
          productId : item._id,
          quantity : quantity,
          price : item.priceList[0].price,
        };
    /*if(loggedinData.length > 0 ){
      
      var existingItems = this.cartStore.getCartItems();
    
      
      
      console.log(queryParams);
      this.router.navigate(['/cart'], {queryParams: queryParams});
    }

    else {
      this.viewModal(queryParams);
    }*/

    this.userAccountStore.userDetails$.subscribe(res=>{
      if(res && res.email !== null){
        this.router.navigate(['/cart'], {queryParams: queryParams});
      }
      else{
        this.viewModal(queryParams);
      }
    })






  }
  public viewModal2(queryParams) {
    const modalRef = this.modalService.open(GetFreeCallModalComponent);
    modalRef.componentInstance.request = queryParams;
  }
  public showDialog(){
    const modalRef = this.modalService.open(GetFreeCallModalComponent);
  }
  
  showBasicDialog() {
    //this.displayBasic = true;
    this.viewModal2(null);
  }

  public viewModal(queryParams) {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
    modalRef.componentInstance.request = queryParams;
  }

  public compareEvent($event, item){

    if($event.checked){
      this.selectedProductItem = [item];
    }
    else{

    }


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
      this.productListToCompare.push(item);
      
    }
    else{
      this.productListToCompare.push(item);
    }

    
    localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));

    //this.productListToCompare.push(item);

    
    
    this.compareProductsStore.setCompareProductsList2(this.productListToCompare);
    //localStorage.removeItem('product_list_to_compare');
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
    localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));
    //const prodGet = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    
  }

  public removeSelectedItem(_id:any){
    // console.log("()()()()( Items before ", this.productListToCompare);
    this.productListToCompare = this.productListToCompare.filter(function(item) {
      
      return item._id != _id;
    });
    // console.log("()()()()( Items After ", this.productListToCompare);
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
    localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));
    this.compareProductsStore.setCompareProductsList2(this.productListToCompare);
    //this.setCheckBoxState();

    /*console.log("()()()()( Items before ", this.selectedProductItem);
    this.selectedProductItem = this.selectedProductItem.filter(function(item) {
      
      return item._id != _id;
    });
    console.log("()()()()( Items After ", this.selectedProductItem);
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.selectedProductItem));
    localStorage.setItem('product_list_to_compare2', JSON.stringify(this.selectedProductItem));
    this.compareProductsStore.setCompareProductsList2(this.selectedProductItem);*/



  }

  public navigateToCompareProducts(){
    this.router.navigate(['/compare-products/results']);
  }

  addQuantity(item):void {

    //this.allSimilerProducts[0].quantity = 1+1;
    
    item.quantity=Number(item.quantity) + 1
    
    
    //this.bundleQuantity = Number(this.bundleQuantity) + 1
    //this.finalBundleDetails[index].quantity = quantity+1;
  }
  decreaseQuantity(item): void {
    if(item.quantity>1){
      item.quantity=Number(item.quantity) -1
    }
    
  }


  public requestQuote (product : any) : void {

    
    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    let queryParams;
      // if(product.productVariants.length>0){
        queryParams = {
          productName : product.name,
          productId : product._id,
          quantity : product.quantity,
          price : product.priceList[0].price,
        };
      // }
    /*if(loggedinData.length > 0 ){
      
      var existingItems = this.cartStore.getCartItems();
    
      
      
      this.router.navigate(['/cart'], {queryParams: queryParams});
    }

    else {
      this.viewModal(queryParams);
    }*/

    this.userAccountStore.userDetails$.subscribe(res=>{
      
      if(res && res.email !== null){
        this.router.navigate(['/cart'], {queryParams: queryParams});
      }
      else{
        this.viewModal(queryParams);
      }
    })
  }

  public requestQuoteold(item, quant){
    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    let queryParams;
      queryParams = {
        productName : item.name,
        productId : item._id,
        quantity : quant,
        price : item.priceList[0].price,
      };
    if(loggedinData.length > 0 ){
      
      var existingItems = this.cartStore.getCartItems();
    

      // }
      this.router.navigate(['/cart'], {queryParams: queryParams});
    }

    else {
      this.viewModal(queryParams);
    }
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

    var index = uniqueElements.findIndex(el => el._id === this.productFamily._id);
    if(index >=0){
      if(this.productFamily.checked){
        this.productFamily.checked = true;
      }
      else{
        this.productFamily['checked'] = true;
      }
    }
    else{
      if(this.productFamily.checked){
        this.productFamily.checked = false;
      }
      else{
        this.productFamily['checked'] = false;
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
  
}