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



@Component({
  selector: 'app-product-bundle-detail',
  templateUrl: './product-bundle-detail.component.html',
  styleUrls: ['./product-bundle-detail.component.css']
})
export class ProductBundleDetailComponent implements OnInit{


  public currentRoute: string;
  links = ['#description', '#feature', '#specification', '#reviews', '#compProd', '#bundleDetailsRef', '#simProd'];
  titles = ['Description', 'Features', 'Specification', 'Reviews', 'compare produscts', 'Bundle Details', 'Similar Products'];
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
    console.log("url", url);
    window.open(url, '_blank');
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
            console.log('@@@@@@@@ _ Route change End');         
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

        console.log("calling TS ---22")

        this.childproducts=this.setProductsData(response.productFamilyChildLicenseList.childproducts);
        console.log("fetched child products for this bundle "+this.childproducts.length)

        console.log("calling TS ---333")

        this.childproductVariants=this.setProductVariantsData(response.productFamilyChildLicenseList.childproductVariants);
        console.log("fetched child productVariants for this bundle "+this.childproductVariants.length)
        console.log("calling TS ---444")

        this.childproductFamily=this.setProductFamilyData(response.productFamilyChildLicenseList.childProductFamily);
        console.log("fetched child childproductFamily for this bundle "+this.childproductFamily.length)

        this.childproductFamilyVariants=this.setChildProductFamilyVariant(response.productFamilyChildLicenseList.childProductFamilyVariant);
        console.log("fetched child childproductFamilyVariants for this bundle "+this.childproductFamilyVariants.length)

        this.allCompareProducts = [...this.childproducts, ...this.childproductVariants, ...this.childproductFamily,...this.childproductFamilyVariants]
        
        this.allCompareProducts.forEach(element => {
          element.name = String(element.name);
          console.log("(compare )()()", element.name);
        });
        this.features = response.productFamilyFeatures;
        this.onPageLoad = true;


        //let tempProducts = this.setProductsData(this.products);
        //let tempProductVariants = this.setProductVariantsData(this.productVarients);
       // let tempChildProductFamilyVariants = this.setChildProductFamilyVariant(response.childProductFamilyVarient);
        //let tempProductBundles = this.setProductFamilyData(this.childProductFamilies);
        //let tempProductBundles = this.setBundlesData(this.childProductFamilies);

        this.allSimilerProducts = [...this.childproducts, ...this.childproductVariants, ...this.childproductFamily,...this.childproductFamilyVariants]

       
        console.log("++++++++++++++ _this.",this.allSimilerProducts);
       


        if( this.productFamily && this.productFamily.productImages && this.productFamily.productImages.length>0) {
          this.productImages = this.productFamily.productImages;
        } 
        else {
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        }
        console.log("()()()()() ", this.productImages);
        this.productImages=this.productImages.slice(0,4);


      
        //this.allSimilerProducts = this.products.concat(response.productVarients,response.productFamilyVariants);
        //this.allSimilerProducts = this.allSimilerProducts.slice(0,3);
        
      })
    );  
  }

  public setProductsData(data){
  console.log("()()()()()()( ", data);
    if(data && data.length>0){
      data.forEach(element => {
        element.name=element.name;
          element.productType = 'products';
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
    
console.log("======setProductVariantsData===="+data.length)
    if(data && data.length>0){
      data.forEach(element => {
        element.name=element.name;
          element.productType = 'productVariants';
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
      console.log("===========setProductBundleVariantsData======="+data.length)
      data.forEach(element => {
        console.log("fetched PFV name"+element.name)
          element.name=element.name;
          console.log("===========setProductBundleVariantsData======="+element.name)
          element.productType = 'productBundleVariants';
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
          element.productType = 'productBundles';
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

    console.log("(((( Called,", type);
    if(type === 'add'){
      this.productQuantity = Number(this.productQuantity) + 1;
    }
    else if(type === 'minus'){
      this.productQuantity =  Number(this.productQuantity) - 1;
    }
    console.log("(((( Called,", this.productQuantity);
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
      console.log("()()()() ", res);
      if(res && res.email !== null){
        this.router.navigate(['/cart'], {queryParams: queryParams});
      }
      else{
        this.viewModal(queryParams);
      }
    })






  }

  public viewModal(queryParams) {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
    modalRef.componentInstance.request = queryParams;
  }

  public compareEvent($event, item){
    console.log("&*&*&*&*& ", $event);
    console.log("&*&*&*&*& ", item);

    if($event.checked){
      this.selectedProductItem = [item];
    }
    else{

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
      console.log("()()() From Prom Prod");
      console.log("()()()( From Prod", item);
      this.productListToCompare.push(item);
      
    }
    else{
      this.productListToCompare.push(item);
    }

    
    localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productListToCompare));

    //this.productListToCompare.push(item);

    
    
    this.compareProductsStore.setCompareProductsList2(this.productListToCompare);
    console.log("getProdFromLocalStorage",this.productListToCompare);
    //localStorage.removeItem('product_list_to_compare');
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
    //const prodGet = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    //console.log("getProdFromLocalStorage",prodGet);
  }

  public removeSelectedItem(_id:any){
    this.productListToCompare = this.productListToCompare.filter(function(item) {
      
      return item._id != _id;
    });
    // this.compareProductsStore.setCompareProductsList(this.productList);
    //localStorage.removeItem('product_list_to_compare');
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
    // console.log('product_list_to_compare',);
  }

  public navigateToCompareProducts(){
    this.router.navigate(['/compare-products']);
  }

  addQuantity(item):void {
    
    this.bundleQuantity = Number(this.bundleQuantity) + 1
    //this.finalBundleDetails[index].quantity = quantity+1;
  }
  decreaseQuantity(item): void {
    // if(quantity>1){
    //   this.finalBundleDetails[index].quantity = quantity-1;
    // }
    this.bundleQuantity = Number(this.bundleQuantity) - 1
  }

  public requestQuote(item, quant){
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
      console.log(queryParams);
      this.router.navigate(['/cart'], {queryParams: queryParams});
    }

    else {
      this.viewModal(queryParams);
    }
  }
  
}