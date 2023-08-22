import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { GetFreeCallModalComponent } from 'src/shared/components/modals/get-free-call-modal/get-free-call-modal.component';
import { CompareProductsModalComponent } from 'src/shared/components/modals/compare-products-modal/compare-products-modal.component';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';
@Component({
  selector: 'app-product-details-variant-by-id',
  templateUrl: './product-details-variant-by-id.component.html',
  styleUrls: ['./product-details-variant-by-id.component.css']
})
export class ProductDetailsVariantByIdComponent implements OnInit{

  quantity: number = 1;

  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    if (key === '-') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '+') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
  }
  public displayBasic: boolean; 

  productImages=[];
  productVideoURL: string;
  public parentProduct:any;
  featuresVideoTitle: string = "Features Video";
  element: string;
  productVideoURLTitle : string;
  productBundles=[];
  public productVideoText: string;
  compareProductList:any=[];
  productBundleList:any=[];
  public faq : any[]=[];
  productListToCompare  = [];
  productBundleData:any[]
  productBundleVariantData:any[]
  products = [];
  links = ['#description', '#feature', '#specification','#simProd', '#compProd', '#bundles','#faq'];
  titles = ['Description', 'Features', 'Specification','Similar Products','Compare Products','Bundles','FAQ'];
  activeLink = this.links[0];
  myColor = '';
 
  productDescriptionWordLimit: number = 50;
  
  public allsimilarProducts:any[];


  public selectedProductItem : any[] = [];

  public completeFeatureList : any[] = [];
  public viewAllFeaturesDetails = false;


  public prdType : any;

  public headingTags = [
    { title_size: "h1" },
    { title_size: "h2" },
    { title_size: "h3" },
    { title_size: "h4" },
    { title_size: "h5" },
    { title_size: "h6" }
  ];

  @ViewChild('descriptionRef') descriptionRef!: ElementRef;
  @ViewChild('featureRef') featureRef!: ElementRef;
  @ViewChild('specificationRef') specificationRef!: ElementRef;
  @ViewChild('simProdRef') simProdRef!: ElementRef;
  @ViewChild('compProdRef') compProdRef!: ElementRef;
  @ViewChild('bundlesRef') bundlesRef!: ElementRef;
  @ViewChild('faqRef') faqRef!: ElementRef;
  @ViewChild('section2Ref') section2Ref!: ElementRef;

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
      section = this.descriptionRef.nativeElement
    } else if (sectionId === 'feature') {
      section = this.featureRef.nativeElement
    } else if (sectionId === 'specification') {
      section = this.specificationRef.nativeElement
    }
    else if (sectionId === 'simProd') {
      section = this.simProdRef.nativeElement
    }
    else if (sectionId === 'compProd') {
      section = this.compProdRef.nativeElement
    }
    else if (sectionId === 'bundles') {
      section = this.bundlesRef.nativeElement
    }
    else if (sectionId === 'faq') {
      section = this.faqRef.nativeElement
    }
    

    section.scrollIntoView({ behavior: 'smooth' });
  }

  openLink(url:any): void {
    // console.log("url",url);
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
  productVariants ;
  dispFeatureList: any[] = [];
  productName:string;
  public bannerUrl : any;
  public productVariantData:any
  public otherProductVariantData:any[0]

  private subscriptions: Subscription[] = [];
  public product : any = {};
  public onProductLoad = true;
  public productSubCategoryId : String;
  public similarProducts :any[] = [];
  public bannerText: '#FFFFFF';


  public alternateFeaturesImage = '../../../../assets/productDetails/FeaturesIllustration.svg';

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';



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

  private getProductDetails2(productId: string) : void{
    this.onProductLoad = false;
    this.subscriptions.push(this.metaDataSvc.fetchSingleProductDetails(productId).subscribe(response => {
      this.individualProductDetail$.subscribe(data => {
      });
    }))
  }

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
    this.onProductLoad = false;
    this.subscriptions.push(
      this.metaDataSvc.fetchProductByProductVariantId(productId).subscribe( (response) => {

        // console.log("response product Variant for ",productId);    
        //  this.individualProductDetail$.subscribe();
  // console.log("response product Variant feature list",response.featureList);
  response.productVariants = {...response.productVariants, quantity: 1 }

this.productVariants=response.productVariants;
this.prdType = response.type;


// console.log("response product Variant Quantituy",response.productVariants.quantity);
// console.log("response product videoURL",response.productVariants.productVideoURL[0]);
this.productVariantData = this.setProductVariantsData(this.productVariants,response.products);
this.otherProductVariantData=this.setProductVariantsData(this.similarProducts,response.products);
this.productBundleData=this.setBundlesData(response.productBundles);
this.productBundleVariantData=this.setProductBundleVariantsData(response.productBundleVariants)
this.productBundleList=[...this.productBundleData,...this.productBundleVariantData ]


this.compareProductList = [...this.otherProductVariantData,...this.productBundleData,...this.productBundleVariantData ]


        for(let i=0;i<response.productBundles.length;i++)
        response.productBundles[i] = {...response.productBundles[i], checked: false, quantity: 1 };

       


        this.productBundles  = response.productBundles;
        // console.log("bundles",this.productBundles);

        this.faq  = response.products.productFAQ;
        // console.log("faq:",this.faq);

        let fList = [];
        if(response.featureList.length > 5){
          // this.featureList = response.featureList.slice(0,5);
          this.featureList = response.featureList;
        }
        else{
          this.featureList = response.featureList;
        }

        // this.featureList = fList;
        // console.log("inside", this.featureList);
        for(let i=0;i<response.similerProductVariants.length;i++)
        response.similerProductVariants[i] = {...response.similerProductVariants[i], quantity: 1 }
        this.similarProducts = response.similerProductVariants;

        this.parentProduct=response.products;
        // console.log("logo comes from parent product  ==="+this.parentProduct.bannerLogo)

       response.products = {...response.products, quantity: 1 }
       // this.product = { products:[...response.products], featureList: response.featureList, productFeatureList: response.productFeatureList, productVariants: response.productVariants, featureListByProductVariants: response.featureListByProductVariants };
      //  console.log("&&&&& inside", this.product.productVariants.length);
        this.onProductLoad = true;
        // this.bannerUrl = this.product.bannerURL;
        if( response.products &&response.products.hasOwnProperty('productImages')&& response.products.productImages && response.products.productImages.length>0) {
          this.productImages = response.products.productImages;

        } 
        else {
          // console.log("======no product images====")
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        // console.log("======no product images====",this.productImages.length)
        }
        this.productImages=this.productImages.slice(0,4);

        this.completeFeatureList = response.featureList;

        if(this.productVariants && this.productVariants.productVideoURL && this.productVariants.productVideoURL.length>0){
          this.productVideoURL = this.productVariants.productVideoURL[0].source ;
        } 
        else{
          this.productVideoURL = "https://www.youtube.com/embed/LWjxyc4FGGs?rel=0";
        }
        //iframe functionality------->

        /*if(this.productVariants && this.productVariants.productVideoURL){
          console.log("======have videoURL====",this.productVariants.productVideoURL.length) 
          this.setIframe(this.productVariants.productVideoURL);
          this.productVideoURL = this.productVariants.productVideoURL[0].source 
          // this.productVideoText = `<${this.headingTags[4].title_size}>${this.productVariants.name}</${this.headingTags[4].title_size}>`
          this.element = `<${this.headingTags[4].title_size}>${this.featuresVideoTitle}</${this.headingTags[4].title_size}>`
          
          
        }
        else{
          this.productVideoURL= this.alternateFeaturesImage;
          console.log("======no product video====",this.productVideoURL.length)
        }*/

        /*if(this.productVariants.productVideoURL &&this.productVariants.hasOwnProperty('productVideoURL')&& this.productVariants.productVideoURL && this.productVariants.productVideoURL.length>0) {
          //this.productVideoURL =  "`"+this.productVariants.productVideoURL+"`";
          this.productVideoURL = "https://www.youtube.com/embed/aGtMBo1Ko8w";
          this.productVideoURLTitle = "Sample";

          console.log("================================Available",this.productVideoURL);
          
        } 
        else {
        this.productVideoURL= this.alternateFeaturesImage;
        console.log("======no product video====",this.productVideoURL.length)
        }*/
        
        





        // this.product.productVariants.push(response.productBundles);
        //this.product.productVariants = [123];
        
        
        // this.featureCountEvent();
        this.setDataValues( {...response.products});

        /*let featureList = [];
        // if(response.productFeatureList?.length > 0) {
        //   //featureList = response.productFeatureList;
        //   featureList = response.featureList;
        //   this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
        // }
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

        this.setCheckBoxState();
      })


    );
  }


  
  public setIframe(data){
    // console.log("setting video url data "+data[0].source)

    var iframeDivHolder = document.getElementById("iframe-div");

		// create iframe
		var substack = document.createElement("iframe");
		// Add attributes
		//substack.src = "https://www.youtube.com/embed/aGtMBo1Ko8w";
    substack.src = data[0].source;
		// Set size and hide iframe border
		substack.width = "608";
		substack.height = "342";
		substack.frameBorder ="0";
		substack.scrolling = "0";
		substack.style.border= "none";
		substack.style.background = "white";
		iframeDivHolder.appendChild(substack);
		// event to trigger iframe loading
		/*document.getElementById("subscribe").addEventListener("click", function(){
			// Add Iframe to webpage
			loadSubscribe.appendChild(substack);
			// Hide button
			this.style.display = "none";
		})*/
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
    private toaster : ToasterNotificationService
  ){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
featureCount=5;

  public ngOnInit() : void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.viewAllFeature=false;
    
    this.getProductDetails(productId);
    // console.log(this.featureList);
    this.productListToCompare = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    // if(this.featureList.length>5 && !this.viewAllFeature){
    //   this.dispFeatureList = [...this.featureList.slice(0,5)];
    //   console.log("dispfeatureList",this.featureList);
    // } else {
    //   this.dispFeatureList = [...this.featureList];
    // }
    // console.log("featureList",this.product);
    // if(this.product.featureList.length>5) {
    //   for(let i=0;i<5;i++) {
    //     this.featureList.push(this.product.featureList[i]);
    //   }
    // }  else {
    //     this.featureList = this.product.featureList;
    // }
    this.featureList = this.product.featureList;
    // console.log("featureList",this.dispFeatureList.length);
    //this.getProductDetails2(productId);
    this.compareProductsLength$.subscribe();
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

  
  // public featureCountEvent(): void {
    
  //   //  if(this.product.featureList.length>5 && !this.viewAllFeature){
  //   //   this.featureList = [...this.product.featureList.slice(0,5)];
  //   //   console.log("dispfeatureList",this.featureList);
  //   //   this.viewAllFeature = true;
  //   // } else {
  //     this.featureList = this.product.featureList;
  //     console.log("product list to compare",this.productListToCompare);
  //   // }
  // }

  public featureCountEvent(val): void {


    // console.log("****** View Before", val);
    val = val ? false : true;
    // console.log("****** View ", val);
    this.viewAllFeaturesDetails = val;
    // console.log("****** View ", this.viewAllFeaturesDetails);
    if(this.viewAllFeaturesDetails){
      // console.log("****** In Else");
      // console.log("****** In Else", this.completeFeatureList);
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

  public compareProductsLength$ = this.compareProductsStore.compareProductsList2$
    .pipe(
      map(data => {

        let cachedData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
        let cachedData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
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

  public removeSelectedItem(_id:any){

    this.productListToCompare = this.productListToCompare.filter(function(item) {
      return item._id != _id;
    });
    
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
    localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));
    this.compareProductsStore.setCompareProductsList2(this.productListToCompare);
  }

  public navigateToCompareProducts(){
    this.router.navigate(['/compare-products/results']);
  }
  // async addToCompare(item:any, type:any):Promise<void> {
  //   // if(!item.checked)
  //   // item.checked = true;

  //   // if(item.checked)
  //   // item.checked = false;
  //   // else
  //   // item.checked = true;
  //   let count=0;
  //   await this.productListToCompare.forEach(val => {
  //     if(val._id===item._id) {
  //       count++;
  //     }
  //   });
  //   if (count===0) {
     
  //     item = { ...item, 'solutionCategory': item.solutionCategory };
    
  //     this.productListToCompare.push(item);
  //   }
  //   // this.productListToCompare.push(item);
  //   //localStorage.removeItem('product_list_to_compare');
  //   localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
  //   this.compareProductsStore.setCompareProductsList(this.productListToCompare);
  //   const prodGet = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
  //   console.log("getProdFromLocalStorage",prodGet);
  // }

  public onCheckBoxChange($event, item:any, type:any){

    let tempLen = this.getCompareProductsCount(); 


    if(tempLen <4) {
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

    let tempLen = this.getCompareProductsCount(); 
    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    

    if(tempLen <4) {
   
    let count=0;
   

    if(type === 'fromProd'){
      // console.log("()()() From Prom Prod");
      // console.log("()()()( From Prod", item);
      cacheData.push(item);
      
    }
    else{
      cacheData.push(item);
    }

    
    localStorage.setItem('product_list_to_compare', JSON.stringify(cacheData));
    localStorage.setItem('product_list_to_compare2', JSON.stringify(cacheData));

    //this.productListToCompare.push(item);

    
    
    this.compareProductsStore.setCompareProductsList2(cacheData);
    // console.log("getProdFromLocalStorage",this.productListToCompare);
    //localStorage.removeItem('product_list_to_compare');
   // localStorage.setItem('product_list_to_compare', JSON.stringify(cacheData));
    this.listForCompare.emit(cacheData);
    //const prodGet = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    //console.log("getProdFromLocalStorage",prodGet);
    this.toaster.showSuccess("The product has been included for comparison",'')
  }
  else{
    this.toaster.showWarning("You can add only 4 products to compare",'')
  }
  }

  images: any[] = [1,2,3,4];


    position: string = 'left';
    quantityCount = 1;
    addQuantity(quantity:any,index:any):void {
      this.productBundleList[index].quantity = Number(quantity)+1;
    }
    decreaseQuantity(quantity:any,index:any): void {
      if(quantity>1){
        this.productBundleList[index].quantity = Number(quantity)-1;
      }
    }

    addSPQuantity(quantity:any,index:any):void {
      this.similarProducts[index].quantity = Number(quantity)+1;
    }
    decreaseSPQuantity(quantity:any,index:any): void {
      if(quantity>1){
        this.similarProducts[index].quantity = Number(quantity)-1;
      }
    }

    addBuyQuantity(quantity:any):void {
      this.productVariants.quantity = Number(quantity)+1;
    }
    decreaseBuyQuantity(quantity:any): void {
      if(quantity>1){
        this.productVariants.quantity = Number(quantity)-1;
      }
    }

  public requestQuote (product : any) : void {

    
    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    let queryParams;
      
        queryParams = {
          productName : product.name,
          productId : product._id,
          quantity : product.quantity,
          price : product.priceList[0].price,
          erpPrice:product.priceList[0].ERPPrice,
          discountRate:product.priceList[0].discountRate,
          priceType:product.priceList[0].priceType,
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
      // console.log("()()()() ", res);
      if(res && res.email !== null){
        this.router.navigate(['/cart'], {queryParams: queryParams});
      }
      else{
        this.viewModal(queryParams);
      }
    })
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

    var index = uniqueElements.findIndex(el => el._id === this.productVariantData._id);
    if(index >=0){
      if(this.productVariantData.checked){
        this.productVariantData.checked = true;
      }
      else{
        this.productVariantData['checked'] = true;
      }
    }
    else{
      if(this.productVariantData.checked){
        this.productVariantData.checked = false;
      }
      else{
        this.productVariantData['checked'] = false;
      }
    }

    this.compareProductList.forEach(element => {
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

  public setProductVariantsData(data,parentProduct){
    
    
    // console.log("======setProductVariantsData===="+data._id)
    // console.log("getting parentproductData==="+parentProduct.name)
        if(data ){
          
          data.name=data.name;
          data.type = 'productVariants';
          data.bannerLogo = (parentProduct  && parentProduct.bannerLogo) ? parentProduct.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          data.description = data.description;
          data['solutionCategory'] = (parentProduct &&parentProduct.subcategories && parentProduct.subcategories.length > 0) ? parentProduct.subcategories[0].name : "";
          data['navigationId'] = data._id;
          data.priceList=data.priceList;
          data.quantity=1;
          data._id=data._id;
         
        }
    
        return data;
      }

      public setSimilarProductVariantsData(data,parentProduct){
    
    
        // console.log("======setSimilarProductVariantsData===="+data.length)
        // console.log("getting parentproductData==="+parentProduct.name)
        if(data && data.length>0){
          // console.log("===========setProductBundleVariantsData======="+data.length)
          data.forEach(element => {
              
            element.name=data.name;
            element.type = 'productVariants';
            element.bannerLogo = (parentProduct  && parentProduct.bannerLogo) ? parentProduct.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
            element.description = data.description;
            element['solutionCategory'] = (parentProduct &&parentProduct.subcategories && parentProduct.subcategories.length > 0) ? parentProduct.subcategories[0].name : "";
            element['navigationId'] = data._id;
            element.priceList=data.priceList;
            element.quantity=1;
            element._id=data._id;
             
            });
          }
        
            return data;
          }

         /**
   * Set Product Bundle Variants Data
   */

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

  /**
   * Set Product Bundles Data
   */

  public setBundlesData(data){

    if(data && data.length>0){
      data.forEach(element => {
        element.name=element.name;
          element.type = 'productBundles';
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

  public getCompareProductsCount(){
    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let combinedData = [...cacheData, ...cacheData2];
    let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];

    //console.log("++++++++++++++++++++++()()()()( ", uniqueElements.length);
    return uniqueElements.length;
    
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
  ngOnDestroy(){
    
  }



}

