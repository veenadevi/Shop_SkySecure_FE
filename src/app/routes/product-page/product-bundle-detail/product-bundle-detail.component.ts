import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { GetFreeCallModalComponent } from 'src/shared/components/modals/get-free-call-modal/get-free-call-modal.component';
import { CompareProductsModalComponent } from 'src/shared/components/modals/compare-products-modal/compare-products-modal.component';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';

@Component({
  selector: 'app-product-bundle-detail',
  templateUrl: './product-bundle-detail.component.html',
  styleUrls: ['./product-bundle-detail.component.css']
})
export class ProductBundleDetailComponent implements OnInit{
  selectedOption: string = 'default'; 
  discountRate: number =120; 
  monthlyPrice: number = this.discountRate / 12;
  isMonthly: boolean = true;
  public product : any = {};

  showMonthlyPrice() {
    this.isMonthly = true;
    this.productFamily.priceList[0].ERPPrice  =this.productFamily.priceList[0].ERPPrice /12;
  }

  showDiscountRate() {
    this.isMonthly = false;
    this.productFamily.priceList[0].ERPPrice  =this.productFamily.priceList[0].ERPPrice *12;
  }
 

  quantity: number = 1;

  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    if (key === '-') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '+') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '*') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '.') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
  
    if (key === 'e') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === 'E') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
  }
  public displayBasic: boolean; 
  productDescriptionWordLimit: number = 50;

  productVideoURL: string;


  public currentRoute: string;
  links = ['#description', '#feature', '#specification', '#reviews', '#compProd', '#bundleDetailsRef', '#faq'];
  titles = ['Description', 'Features', 'Specification', 'Reviews', 'Compare Products' ,'Bundle Features', 'FAQ'];
  activeLink = this.links[0];
  myColor = '';

  public productQuantity:  any = 1;
  public completeFeatureList : any[] = [];
  public selectedProductItem : any[] = [];

  public bundleQuantity = 1;
  checked: boolean = false;
  faq = [];

  public prdType : any;

  @ViewChild('descriptionRef') descriptionRef!: ElementRef;
  @ViewChild('featureRef') featureRef!: ElementRef;
  @ViewChild('specificationRef') specificationRef!: ElementRef;
  @ViewChild('reviewsRef') reviewsRef!: ElementRef;
  @ViewChild('compProdRef') compProdRef!: ElementRef;
  @ViewChild('bundleDetailsRef') bundleDetailsRef!: ElementRef;
  @ViewChild('simProdRef') simProdRef!: ElementRef;
  @ViewChild('section2Ref') section2Ref!: ElementRef;
  @ViewChild('faqRef') faqRef!: ElementRef;

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


  public selectedType : any = 'Month';


  public setSelfData(){}

  public onToogleChange(val){
    
    this.selectedType = val;

    if(val === 'Month'){
      this.setSelfData();
    }

  }

  public handleChange(val){
    

    this.selectedType = val;
  
    if(val === 'Month'){
      this.setSelfData();
    }

  }




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
    if(url.length>0)
    window.open(url, '_blank');
    else{

    }
  } 

  readMore: boolean= false;
  public openDescription01(): void {
    this.readMore= !this.readMore;
  }

  seeMore: boolean = false;

  public openDescription(): void {
    this.seeMore= !this.seeMore;
  }

  featureList = [];
  productbundles ;
  constructor(
    private route: ActivatedRoute,
    private metaDataSvc : MetadataService,
    private authService : MsalService,
    private cartStore : CartStore,
    private router : Router,
    private modalService : NgbModal,
    private userAccountStore : UserAccountStore,
    private compareProductsStore : CompareProductsStore,
    private toaster : ToasterNotificationService
  ){
   //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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

  public  prdLength = 0;

  public compareProductsLength$ = this.compareProductsStore.compareProductsList2$
    .pipe(
      map(data => {

        let cachedData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
        //let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
        let cachedData2 = [];
        let combinedData = [...cachedData, ...cachedData2];
        //this.productList = [...this.productList, ...data];
        let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];
        this.prdLength = uniqueElements.length;

        console.log("++++++++++++++++++++++ ", this.prdLength);
        
        if(data){
          return data;
        }
        else{
          return data;
        }
        
      }
      )
    )


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
    this.compareProductsLength$.subscribe();
    
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
        this.prdType = response.type ? response.type : '';

        this.faq=response.productFamily.productFAQ;
       
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

        this.completeFeatureList = response.featureList;
        if(this.productbundles && this.productbundles.productVideoURL && this.productbundles.productVideoURL.length>0){
          this.productVideoURL = this.productbundles.productVideoURL[0].source ;
        } 
      else{
        this.productVideoURL = "https://www.youtube.com/embed/LWjxyc4FGGs?rel=0";
      }
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
    if(quantity>0){
      let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

      let queryParams;
        // if(product.productVariants.length>0){
          queryParams = {
            productName : item.name,
            productId : item._id,
            quantity : quantity,
            price : item.priceList[0].price,
            erpPrice:item.priceList[0].ERPPrice,
            discountRate:item.priceList[0].discountRate,
            priceType:item.priceList[0].priceType,
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
   



  }

  public viewModal3(queryParams) {
    const modalRef = this.modalService.open(CompareProductsModalComponent, {windowClass: 'compare-products-modal-custom-class' });
    modalRef.componentInstance.request = queryParams;
    // this.modalService.open(modal_id, { windowClass: 'custom-class' });
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

    let tempLen = this.getCompareProductsCount(); 
    var a = 3;

    if(tempLen<4) {
      if($event.checked){
        this.addToCompare(item, type);
      }
      else{
        this.removeSelectedItem(item._id);
      }
    }
    else {
    //  alert("Only 4 products are allowed to compare");
    this.toaster.showWarning("You can add only 4 products to compare",'')
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
    let tempLen = this.getCompareProductsCount(); 

    
    if(tempLen<4) {


 
    if(type === 'fromProd'){
      this.productListToCompare.push(item);
      
    }
    else{
      this.productListToCompare.push(item);
    }

    
    //localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));

    //this.productListToCompare.push(item);

    if(item.checked){
      item.checked = true;
    }
    else{
      item['checked'] = true;
    }
    
   
    
    this.compareProductsStore.setCompareProductsList2(this.productListToCompare);
    //localStorage.removeItem('product_list_to_compare');
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
    //localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));
    //const prodGet = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    this.toaster.showSuccess("The product has been included for comparison.",'')
  }
  else {
    //alert("Only 4 products are allowed to compare");
    this.toaster.showWarning("You can add only 4 products to compare",'')
  }
  }

  public removeSelectedItem(_id:any){
    // console.log("()()()()( Items before ", this.productListToCompare);
    this.productListToCompare = this.productListToCompare.filter(function(item) {
      
      return item._id != _id;
    });
    // console.log("()()()()( Items After ", this.productListToCompare);
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
    //localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));
    this.compareProductsStore.setCompareProductsList2(this.productListToCompare);
    



  }

  public navigateToCompareProducts(){
    this.router.navigate(['/compare-products/results']);
  }

  addQuantity(quantity:any,index:any):void {

    //this.allSimilerProducts[0].quantity = 1+1;
    
    this.bundleItemsList[index].quantity = quantity+1;
    
    //this.bundleQuantity = Number(this.bundleQuantity) + 1
    //this.finalBundleDetails[index].quantity = quantity+1;
  }
  decreaseQuantity(quantity:any,index:any): void {
    if(quantity>1){
      this.bundleItemsList[index].quantity = quantity-1;
    }
    
  }


  public requestQuote (product : any) : void {

    console.log("===========quantity passed =====")
    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    let queryParams;
      // if(product.productVariants.length>0){
        queryParams = {
          productName : product.name,
          productId : product._id,
          quantity : product.quantity?product.quantity:1,
          price : product.priceList[0].price,
          erpPrice:product.priceList[0].ERPPrice,
          discountRate:product.priceList[0].discountRate,
          priceType:product.priceList[0].priceType,
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

  public getCompareProductsCount(){
    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    //let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let cacheData2 = [];
    let combinedData = [...cacheData, ...cacheData2];
    let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];

    //console.log("++++++++++++++++++++++()()()()( ", uniqueElements.length);
    return uniqueElements.length;
    
  }

  ngOnDestroy(){
    this.subscriptions.forEach(element => {
        element.unsubscribe();
    });
  }
  
}