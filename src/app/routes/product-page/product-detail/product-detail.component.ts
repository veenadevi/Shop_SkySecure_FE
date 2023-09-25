import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute,Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Co2Sharp } from '@mui/icons-material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { GetFreeCallModalComponent } from 'src/shared/components/modals/get-free-call-modal/get-free-call-modal.component';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { CompareProductsModalComponent } from 'src/shared/components/modals/compare-products-modal/compare-products-modal.component';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';
import { AddItemsToCartService } from 'src/shared/services/global-function-service/add-items-to-cart.service';
import { TermsConditionModalComponent } from 'src/shared/components/modals/terms-condition-modal/terms-condition-modal.component';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  selectedOption: string = 'default'; 
  discountRate: number =120; 
  monthlyPrice: number = this.discountRate / 12;
  isMonthly: boolean = true;
  



  displayPrice:number;
  displayERPPrice:number;
  displayPriceType:number;
  displayDiscount:number;


  showMonthlyPrice() {
    this.isMonthly = true;
    this.product.priceList[0].ERPPrice  =this.product.priceList[0].ERPPrice /12;
  }

  showDiscountRate() {
    this.isMonthly = false;
    this.product.priceList[0].ERPPrice  =this.product.priceList[0].ERPPrice *12;
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
    if (key === '/') {
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

  productImages=[];
  productVideoURL: string;
  // productVideoURL=[];
  productBundles=[];
  productBundlesData:any=[];
  productBundleVariantsData:any=[];

  productDescriptionWordLimit: number = 50;

  public allCompareProducts: any[];
  public allsimilarProducts:any[];
  public allBundleDetails:any[];

  public completeFeatureList : any[] = [];
  
  public viewAllFeaturesDetails = false;

  public prdType : any;

  public keyFeatureList : any;
  public additionalFeatureList : any;

  public appList : any[] = [];
  
  faq = [];
  productListToCompare  = [];
  products = [];
  public currentRoute: string;
  //public links = ['#description', '#feature', '#specification','#reviews','#bundles','#faq'];
  //public titles = ['Description', 'Features', 'Specification','Reviews','Bundles','FAQ'];
  public links = ['#description', '#feature', '#specification','#reviews'];
  public titles = ['Description', 'Features', 'Specification','Reviews'];
  activeLink = this.links[0];
  myColor = '';
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

  

  public selectedProductItem : any[] = [];

  @ViewChild('descriptionRef') descriptionRef!: ElementRef;
  @ViewChild('featureRef') featureRef!: ElementRef;
  @ViewChild('specificationRef') specificationRef!: ElementRef;
  @ViewChild('reviewsRef') reviewsRef!: ElementRef;
  @ViewChild('compProdRef') compProdRef!: ElementRef;
  @ViewChild('bundlesRef') bundlesRef!: ElementRef;
  @ViewChild('faqRef') faqRef!: ElementRef;
  @ViewChild('section2Ref') section2Ref!: ElementRef;


  
  
  @ViewChild('scrollElementForDescriptionRef') scrollElementForDescriptionRef!: ElementRef;
  @ViewChild('scrollElementForFeatureRef') scrollElementForFeatureRef!: ElementRef;
  @ViewChild('scrollElementForSpecification') scrollElementForSpecification!: ElementRef;
  @ViewChild('scrollElementForReviewsRef') scrollElementForReviewsRef!: ElementRef;
  @ViewChild('scrollElementForCompProdRef') scrollElementForCompProdRef!: ElementRef;
  @ViewChild('scrollElementForBundlesRef') scrollElementForBundlesRef!: ElementRef;
  @ViewChild('scrollElementForFaqRef') scrollElementForFaqRef!: ElementRef;
  @ViewChild('scrollElementForSection2Ref') scrollElementForSection2Ref!: ElementRef;




    // ----- >>>> compare products Scroll function ----- >>>>

    scrollFunctionRight(){
      let left = document.querySelector(".scroll-content")
      left.scrollBy(200, 0);
    };
  
    scrollFunctionLeft(){
      let right = document.querySelector(".scroll-content")
      right.scrollBy(-200, 0);
    };



        // ---->>> offers section function

        public arrowSection: boolean = true    
        public offerVisible:boolean = true
    
        onclickOffer(){
          {
            // this.ReadMore = !this.ReadMore; //not equal to condition
            this.offerVisible = !this.offerVisible
          }
        }



  scrollToSection(sectionId: any): void {
    this.activeLink=sectionId;
    sectionId  = sectionId.slice(1);
    let section;
    if(sectionId === 'description') {
      //section = this.descriptionRef.nativeElement;
      section = this.scrollElementForDescriptionRef.nativeElement;
    } else if (sectionId === 'feature') {
      //section = this.featureRef.nativeElement
      section = this.scrollElementForFeatureRef.nativeElement;
    } else if (sectionId === 'specification') {
      //section = this.specificationRef.nativeElement
      section = this.scrollElementForSpecification.nativeElement;
    }
    else if (sectionId === 'reviews') {
      //section = this.reviewsRef.nativeElement;
      section = this.scrollElementForReviewsRef.nativeElement;
    }
    else if (sectionId === 'compProd') {
      //section = this.compProdRef.nativeElement;
      section = this.scrollElementForCompProdRef.nativeElement;
    }
    else if (sectionId === 'bundles') {
      //section = this.bundlesRef.nativeElement;
      section = this.scrollElementForBundlesRef.nativeElement;
    }
    else if (sectionId === 'faq') {
      //section = this.faqRef.nativeElement;
      section = this.scrollElementForFaqRef.nativeElement;
    }
    

    section.scrollIntoView({ behavior: 'smooth' });
  }

  openLink(url:any): void {
    if(url.length>0)
    window.open(url, '_blank');
    else{
      
    }
  }

  
  featureList = [];
  productparent ;

//  featureList: any[] = [];
//  productVariants: any[]  =[];
 dispFeatureList: any[] = [];
 productName:string;
  public bannerUrl : any;

  private subscriptions: Subscription[] = [];
  public product : any = {};
  public onProductLoad = true;
  public productSubCategoryId : String;
  public similarProducts : Array<any> = [];
  public bannerText: '#FFFFFF';

  

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';

  readMore: boolean= false;
  
  public openDescription01(): void {
    this.readMore= !this.readMore;
  }
  seeMore: boolean = false;
  
  public openDescription(): void {
    this.seeMore= !this.seeMore;
  }
 

  public individualProductDetail$ = this.metadataStore.individualProductDetail$
  .pipe(
    map(data => {
      if(data){
        this.setData(data);
        return data;
      }
      else{

        
        return data;
      }
    }
    )
  )

  // private getProductDetails2(productId: string) : void{
  //   this.onProductLoad = false;
  //   this.subscriptions.push(this.metaDataSvc.fetchSingleProductDetails(productId).subscribe(response => {
  //     this.individualProductDetail$.subscribe(data => {
  //     });
  //   }))
  // }

  private setData(response){
    /*let featureList = [];
    // if(response.productFeatureList?.length > 0) {
    //   //featureList = response.productFeatureList;
    //   featureList = response.featureList;
    //   this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
    // }

    //response.featureList = response.newfeatureLists;
    if(response.featureList?.length > 0) {
      //featureList = response.productFeatureList;
      featureList = response.featureList.splice(0,3);
      //this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
    }
    else if(response.productVariants.length> 0 ){
      featureList = response.productVariants[response.productVariants.length -1].featureList.slice(0,5);
      //this.productSubCategoryId = response.productVariants[0].featureList[0].subCategoryId;
    }
    this.similarProducts = response.productBundles;
    this.product = { ...response.products , featureList : response.featureList, productFeatureList: response.productFeatureList, productVariants: response.productVariants, featureListByProductVariants : response.featureListByProductVariants } ;
    this.onProductLoad = true;*/
  }

  private  getProductDetails(productId: string): void {
    console.log("+_+_+_+)_+)+)_)____+_+ ");
    this.onProductLoad = false;
    this.subscriptions.push(
    //  this.metaDataSvc.fetchSingleProductDetails(productId).subscribe( (response) => {
      this.metaDataSvc.fetchSingleProductDetails(productId).subscribe( (response) => {
     //this.individualProductDetail$.subscribe();
        this.product={...response.product, quantity: 1 }
        this.prdType = response.type;
       this.product.bannerLogo=(this.product.bannerLogo &&this.product.bannerLogo !== null) ? this.product.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
        // console.log("price after set quantity===="+this.product.priceList[0].discountRate)
        let fList = [];
        if (response.featureList?.length > 0) {
          
          this.completeFeatureList = response.featureList;
          if(response.featureList.length > 5){
            //this.featureList = response.featureList.slice(0,5);
            this.featureList = response.featureList;
          }
          else{
            this.featureList = response.featureList;
          }
       //   this.featureList = response.featureList.slice(0,5);
       //   this.featureList = response.featureList.slice(0,5);
          //this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
        }
        
        if(this.featureList.length>4){
          this.keyFeatureList = this.featureList.slice(0,4);
          this.additionalFeatureList = this.featureList.slice(4);
        }
        else{
          this.keyFeatureList = this.featureList;
          this.additionalFeatureList = [];
        }
     

        // this.productBundlesData=this.setProductBundleData(response.productBundles);
        // if(this.productBundlesData.length>0)
        // // console.log("after data setup ===="+this.productBundlesData[0].priceList[0].price)
        // this.productBundleVariantsData=this.setProductBundleVariantsData(response.productBundleVariants);

        // this.productBundles=[...this.productBundlesData,...this.productBundleVariantsData];

        
        // this.similarProducts =[...this.productBundlesData,...this.productBundleVariantsData];
        // this.allCompareProducts =[...this.productBundlesData,...this.productBundleVariantsData];
        // console.log("allCompareProducts  length "+this.allCompareProducts.length)

     //  response.products[0] = {...response.products[0], quantity: 1 }
     //setting quantity
       
       

       // this.product = { products:[...response.products], featureList: response.featureList, productFeatureList: response.productFeatureList, productVariants: response.productVariants, featureListByProductVariants: response.featureListByProductVariants };
      //  console.log("&&&&& inside", this.product.productVariants.length);
        this.onProductLoad = true;
        this.bannerUrl = this.product.bannerURL;


        if(this.products && this.product.productImages && this.product.productImages.length>0) {
          this.productImages = this.product.productImages;
        } else {
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        }
        this.productImages=this.productImages.slice(0,4);

        this.completeFeatureList = response.featureList;

        if(this.productparent && this.productparent.productVideoURL && this.productparent.productVideoURL.length>0){
          this.productVideoURL = this.productparent.productVideoURL[0].source ;
        } 
        else{
          this.productVideoURL = "https://www.youtube.com/embed/LWjxyc4FGGs?rel=0";
        }

        this.faq  = response.product.productFAQ;

        console.log("+_+_+_+_+_+_+ ", response.appList[0]);

        this.appList = response.appList;


        if(this.productBundles && this.productBundles.length>0){
          this.links.push('#bundles');
          this.titles.push('Bundles');
        }
        if(this.faq && this.faq.length>0){
          this.links.push('#faq');
          this.titles.push('FAQ');
        }

        this.links = this.links.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        })
        this.titles = this.titles.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        })

        //public links = ['#description', '#feature', '#specification','#reviews','#bundles','#faq'];
  //public titles = ['Description', 'Features', 'Specification','Reviews','Bundles','FAQ'];
  

        this.setCheckBoxState();
   // set what to display for price 


   this.displayPrice= this.product.priceList[1].price
   this.displayERPPrice= this.product.priceList[1].ERPPrice
   this.displayPriceType= this.product.priceList[1].priceType
   this.displayDiscount= this.product.priceList[1].discountRate

   this.selectedProductItem=response.compareProductList;
   this.selectedProductItem.unshift(response.product);
   console.log("selectedProductItem  setting",this.selectedProductItem.length)

      })


    );
  }

  public setDataValues(resp:any): void {
    // this.product.name=resp.product.name;
    // this.productName = resp.product.name;
// console.log("response values: ", resp);
  }
  private getSimilerProducts(subCategoryId: String) {
    this.subscriptions.push(
      this.metaDataSvc.fetchAllProductsBySubCategoryIds([subCategoryId]).subscribe(response => {
        this.products = response.products.map((data: any) => {
          return {
            name: data.name,
            solutionLink: data.name,
            imageUrl: 'https://csg1003200209655332.blob.core.windows.net/images/1681727933-Microsofticon.png',
            description: data.description
          }
        })
      })
    );
  }

  viewAllFeature = false;
  checked: boolean = false;
  @Output() listForCompare = new EventEmitter();

  constructor(
    private metaDataSvc : MetadataService,
    private route: ActivatedRoute,
    private cartStore : CartStore,
    private metadataStore : MetadataStore,
    private router : Router,
    private authService : MsalService,
    private modalService : NgbModal,
    private compareProductsStore : CompareProductsStore,
    private userAccountStore : UserAccountStore,
    private toaster : ToasterNotificationService,
    private addItemsToCartService : AddItemsToCartService
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
featureCount=5;

  public ngOnInit() : void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.viewAllFeature=false;
    
    this.getProductDetails(productId);
    

    //this.productListToCompare = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    this.productListToCompare = JSON.parse(localStorage.getItem('compare_products_list') || '[]');
    // this.productListToCompare =uniqueElements;

  
   
    this.compareProductsLength$.subscribe();
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
      this.featureList = this.completeFeatureList;
    }
    else{
      // console.log("****** In Else");
      // console.log("****** In Else", this.completeFeatureList);
      if(this.completeFeatureList.length>5){
        this.featureList = this.completeFeatureList.slice(0,5);
      }
      else{
        this.featureList = this.completeFeatureList;
      }
      
      
    }
    
    //  if(this.product.featureList.length>5 && !this.viewAllFeature){
    //   this.featureList = [...this.product.featureList.slice(0,5)];
    //   console.log("dispfeatureList",this.featureList);
    //   this.viewAllFeature = true;
    // } else {
      //this.featureList = this.product.featureList;
      
      
      // console.log("product list to compare",this.productListToCompare);
    // }
  }


  public  prdLength = 0;
  public compareProductsListLength = 0;
  public compareProductsLength$ = this.compareProductsStore.compareProductsList$
    .pipe(
      map(data => {

        let cachedData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
        let cachedData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
        let combinedData = [...cachedData, ...cachedData2];
        //this.productList = [...this.productList, ...data];
        let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];
        this.prdLength = uniqueElements.length;

        let cachedProductsToCompare = JSON.parse(localStorage.getItem('compare_products_list') || '[]');
        this.compareProductsListLength = cachedProductsToCompare.length;

       
        
        if(data){
          return data;
        }
        else{
          return data;
        }
        
      }
      )
    )


  public removeSelectedItem(_id:any){
    this.productListToCompare = this.productListToCompare.filter(function(item) {
      return item._id != _id;
    });
    this.productListToCompare = this.productListToCompare.filter(element => element._id != _id);
   
    
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
    //localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));
    this.compareProductsStore.setCompareProductsList2(this.productListToCompare);
    
  }

  public navigateToCompareProducts(){
    this.router.navigate(['/compare-products/results']);
    
  }

  public onCheckBoxChange($event, item:any, type:any){

    //let tempLen = this.getCompareProductsCount(); 
    let returnedData = this.getCompareProductsCount();

    

    var a = 3;
    if(returnedData.len<4) {


      var index = returnedData.items.findIndex(el => el._id === item._id);
      
      if(index >=0){
        this.toaster.showWarning("Product already added for Compare",'')
      }
      else{
        if($event.checked){
          this.addToCompare(item, type);
        }
        else{
          this.removeSelectedItem(item._id);
        }
      }


    }
    else {
      //alert("Only 4 products are allowed to compare");
      this.toaster.showWarning("You can add only 4 products to compare",'')
    }
    

  }

  async addToCompare(item:any, type:any):Promise<void> {
    //let returnedData = this.getCompareProductsCount(); 
    //let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');

    let compareProductsListLen = this.getProductsCount().length;

    let cachedProductsToCompare = JSON.parse(localStorage.getItem('compare_products_list') || '[]');
    
    if(compareProductsListLen<4) {
   

      var index = cachedProductsToCompare.findIndex(el => el._id === item._id);
      
      if(index >=0){
        this.toaster.showWarning("Product already added for Compare",'')
      }

      else{

    
        if('checked' in item){
          item.checked = true;
        }
        else{
          item['checked'] = true;
        }

        if(type === 'fromProd'){
          
          
          this.productListToCompare.push(item);
          
        }
        else{
              
              this.productListToCompare.push(item);
        }
        
       
        localStorage.setItem('compare_products_list', JSON.stringify(this.productListToCompare));
        
        this.compareProductsStore.setCompareProductsList(this.productListToCompare);

        this.toaster.showSuccess("The product has been included for comparison.",'')
      }
    

    
  }
  else {
  //  alert("Only 4 products are allowed to compare");
  this.toaster.showWarning("You can add only 4 products to compare",'')
  }

  
  }


  /*async addToCompare(item:any, type:any):Promise<void> {
    let returnedData = this.getCompareProductsCount(); 
    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    
    if(returnedData.len<4) {
   

      var index = returnedData.items.findIndex(el => el._id === item._id);
      
      if(index >=0){
        this.toaster.showWarning("Product already added for Compare",'')
      }

      else{

    

    if(type === 'fromProd'){
      console.log("()()() From Prom Prod");
       // console.log("()()()( From Prod", item);
       this.productListToCompare.push(item);
       
     }
     else{
       console.log("()()() adding From else");
       this.productListToCompare.push(item);
     }
     this.compareProductsStore.setCompareProductsList2(this.productListToCompare);
 
     localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
     
 
     if(item.checked){
       item.checked = true;
     }
     else{
       item['checked'] = true;
     }
     
     this.compareProductsStore.setCompareProductsList2(this.productListToCompare);
     //localStorage.removeItem('product_list_to_compare');
     localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
     localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));
     //const prodGet = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
     this.toaster.showSuccess("The product has been included for comparison.",'')
      }
    

    
  }
  else {
  //  alert("Only 4 products are allowed to compare");
  this.toaster.showWarning("You can add only 4 products to compare",'')
  }

  
  } */

 

  images: any[] = [1,2,3,4];


    position: string = 'left';
    quantityCount = 1;
    addQuantity(quantity:any,index:any):void {
    
      this.productBundles[index].productFamily.quantity =  Number(quantity)+1;
    }
    decreaseQuantity(quantity:any,index:any): void {
      if(quantity>1){
        this.productBundles[index].productFamily.quantity = Number(quantity)-1;
      }
    }

    addBuyQuantity(quantity:any):void {
      //this.product.quantity = quantity+1;
      this.product.quantity = Number(this.product.quantity) +1;
    }
    decreaseBuyQuantity(quantity:any): void {
      if(quantity>1){
        this.product.quantity = Number(this.product.quantity) - 1;
       // this.product.quantity = quantity-1;
      }
    }

  public requestQuote (product : any) : void {
    if(product.quantity>0){
      let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

      let queryParams;
        // if(product.productVariants.length>0){
          
          queryParams = {
            productName : product.name,
            productId : product._id,
            quantity : product.quantity,
           
          };

        if(this.selectedOption === 'default'){
        //  queryParams.price = (queryParams.price/12).toFixed(2);

        queryParams.price = product.priceList[1].price,
        queryParams.erpPrice=product.priceList[1].erpPrice,
        queryParams.discountRate=product.priceList[1].discountRate,
        queryParams.priceType= product.priceList[1].priceType
        queryParams.distributorPrice=product.priceList[1].distributorPrice
       
        }
        else{
          queryParams.price = (Number(queryParams.price)).toFixed(2);

          queryParams.price = product.priceList[0].price.toFixed(2),
          queryParams.erpPrice=product.priceList[0].ERPPrice.toFixed(2),
          queryParams.discountRate=product.priceList[0].discountRate,
          queryParams.priceType= product.priceList[0].priceType,
          queryParams.distributorPrice=product.priceList[0].distributorPrice.toFixed(2)
        }

      this.userAccountStore.userDetails$.subscribe(res=>{
       
        if(res && res.email !== null){

          //console.log("_)(*&& Cart Item ", queryParams);
          this.addItemsToCartService.addItemsToCart(queryParams);
          //this.router.navigate(['/cart'], {queryParams: queryParams});


          
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
  public viewModal4(queryParams) {
    const modalRef = this.modalService.open(TermsConditionModalComponent);
    modalRef.componentInstance.request = queryParams;
  }

  

  public viewModal(queryParams) {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
    modalRef.componentInstance.request = queryParams;
  }

  public getColor(val){
    if(val){
      return val.toLowerCase();
    }
    else{
      return 'Black'
    }
    
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
          element['solutionCategory'] = (element.products && element.products.length>0 && element.products[0] && element.products[0].subCategories && element.products[0].subCategories.length > 0) ? element.products[0].subCategories[0].name : "";
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

  public setProductBundleData(data){

    if(data && data.length>0){
    //  console.log("===========setProductBundleVariantsData======="+data.length)
      data.forEach(element => {
        element.name=element.name;
          element.type = 'productBundles';
          element.bannerLogo = (element.bannerLogo &&element.bannerLogo !== null) ? element.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
         // element.solutionCategory=(element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['solutionCategory'] = (element.subCategories && element.subCategories.length > 0)? element.subCategories[0].name : ''
          element['navigationId'] = element._id;
          element.priceList=element.priceList
          element.quantity=1
     });
    }

    return data;
  }

  public setProductBundleVariantsData(data){

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


  public setCheckBoxState(){

    //productFamily
    //allCompareProducts

    

    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    //let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let cacheData2 = [];
    let combinedData = [...cacheData, ...cacheData2];
    let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];

    /*var index = productsList.findIndex(el => el.productId === item._id);
       
    if(index >=0){
      productsList[index].quantity = Number(productsList[index].quantity) + 1;
    }*/

    var index = uniqueElements.findIndex(el => el._id === this.product._id);
    if(index >=0){
      if(this.product.checked){
        this.product.checked = true;
      }
      else{
        this.product['checked'] = true;
      }
    }
    else{
      if(this.product.checked){
        this.product.checked = false;
      }
      else{
        this.product['checked'] = false;
      }
    }
//     if(this.allCompareProducts.length>0)
// {
//     this.allCompareProducts.forEach(element => {
//       var index = uniqueElements.findIndex(el => el._id === element._id);
//       if(index >=0){
//         if(element.checked){
//           element.checked = true;
//         }
//         else{
//           element['checked'] = true;
//         }
//       }
//       else{
//         if(element.checked){
//           element.checked = false;
//         }
//         else{
//           element['checked'] = false;
//         }
//       }
//     });
//   }


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
    return {
      "len":uniqueElements.length,
      "items" : uniqueElements
    }
    
    
  }

  public getProductsCount(){
    let cachedProductsToCompare = JSON.parse(localStorage.getItem('compare_products_list') || '[]');
    
    return cachedProductsToCompare;
  }


  public showDialog(){
    const modalRef = this.modalService.open(GetFreeCallModalComponent);
  }

  showBasicDialog() {
    //this.displayBasic = true;
    this.viewModal2(null);
  }

  // TERMS AND CONDITION
  public displayBasic01: boolean; 
  public showDialog01(){
    const modalRef = this.modalService.open(TermsConditionModalComponent);
  }

  showBasicDialog01() {
    //this.displayBasic = true;
    this.viewModal4(null);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(element => {
        element.unsubscribe();
    });
  }
}
