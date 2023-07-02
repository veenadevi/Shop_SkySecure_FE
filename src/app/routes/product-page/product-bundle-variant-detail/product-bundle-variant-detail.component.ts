import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';


@Component({
  selector: 'app-product-bundle-variant-detail',
  templateUrl: './product-bundle-variant-detail.component.html',
  styleUrls: ['./product-bundle-variant-detail.component.css']
})
export class ProductBundleVariantDetailComponent {

  public currentRoute: string;
  links = ['#description', '#feature', '#specification', '#reviews', '#compProd', '#bundleDetailsRef', '#simProd','#faq'];
  titles = ['Description', 'Features', 'Specification', 'Reviews', 'Compare Products', 'Bundle Details', 'Similar Products','FAQ'];
  activeLink = this.links[0];
  myColor = '';
  productImages=[];

  @ViewChild('descriptionRef') descriptionRef!: ElementRef;
  @ViewChild('featureRef') featureRef!: ElementRef;
  @ViewChild('specificationRef') specificationRef!: ElementRef;
  @ViewChild('reviewsRef') reviewsRef!: ElementRef;
  @ViewChild('compProdRef') compProdRef!: ElementRef;
  @ViewChild('bundleDetailsRef') bundleDetailsRef!: ElementRef;
  @ViewChild('simProdRef') simProdRef!: ElementRef;
  @ViewChild('section2Ref') section2Ref!: ElementRef;
  @ViewChild('faqRef') faqRef!: ElementRef;

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
    console.log("url", url);
    window.open(url, '_blank');
  }


  constructor(
    private route: ActivatedRoute,
    private metaDataSvc : MetadataService,
    private authService : MsalService,
    private cartStore : CartStore,
    private router : Router,
    private modalService : NgbModal
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

  public productFamilyVariant : any;

  public productFamily : any;

  public faq = [];

  public products : any[] = [];

  public features : any[] = [];

  public productVarients : any[] = [];

  public productFamilyVariants : any[] = []

  public productBundleVarientData : any;

  public allCompareProducts: any[];

  public allSimilerProducts: any[];
  public childProductFamilies:any[];
  public childProductFamilyVariant :any[];
  public bundleDetails:any[];
  public finalBundleDetails :any[];

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';

  public ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getBrandDetails(productId);
  }

  public featureCountEvent(): void {
    this.features = this.features
  }


  

  public getBrandDetails(id){
    //id = '6412ac15bdb764f8d6a252a5';
    this.onPageLoad = false;
    this.subscriptions.push(
       this.metaDataSvc.fetchSingleProductBundleVariantDetails(id).subscribe( response => {
        this.productBundleVarientData = response;
        //this.productFamilyVariant = response.productFamilyVariant;
        this.productFamilyVariant={...response.productFamilyVariant, quantity: 1 }
        this.productFamilyVariants = response.productFamilyVariants;
        this.productFamily = response.productFamily;

        this.productVarients = response.productFamilyVariantLicenseList.productVariants;        ;
        this.products = response.productFamilyVariantLicenseList.products;
        this.features = response.productFamilyVariantLicenseList.productFamilyVariantFeatures;
        this.childProductFamilies=response.productFamilyVariantLicenseList.childProductFamily;
        this.childProductFamilyVariant=response.productFamilyVariantLicenseList.childProductFamilyVariant;

        this.faq  = this.productFamilyVariant.productFAQ;

        this.onPageLoad = true;
        this.allCompareProducts = this.products;
        this.allSimilerProducts = this.products;

        this.allCompareProducts = this.products;
        this.allSimilerProducts = this.products.concat(this.productVarients,this.childProductFamilies,this.childProductFamilyVariant);
        this.allSimilerProducts = this.allSimilerProducts.slice(0,3);
        this.bundleDetails=this.products.concat(this.productVarients,this.childProductFamilies,this.childProductFamilyVariant);

        if(this.productFamily.productImages.length>0) {
          this.productImages = this.productFamily.productImages;
        } else {
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        }

        let tempProducts = this.setProductsData(this.products);
        let tempProductVariants = this.setProductVariantsData(this.productVarients);
        let tempProductBundleVariants = this.setProductBundleVariantsData(this.childProductFamilyVariant);
        let tempProductBundles = this.setBundlesData(this.childProductFamilies);
        this.finalBundleDetails = [...tempProducts,...tempProductBundles, ...tempProductVariants,...tempProductBundleVariants ];
      })
    );
  }

  public setProductsData(data){

    if(data && data.length>0){
      data.forEach(element => {
        element.name=element.name;
          element.productType = 'products';
          element.bannerLogo = (element.bannerLogo && element.bannerLogo !== null) ? element.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['navigationId'] = element._id;
          element.priceList=element.price
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
          element.bannerLogo = (element.products && element.products[0].bannerLogo) ? element.products[0].bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.products[0] && element.products[0].subCategories && element.products[0].subCategories.length > 0) ? element.products[0].subCategories[0].name : "";
          element['navigationId'] = element._id;
          element.priceList=element.priceList;
      });
    }

    return data;
  }

  /**
   * Set Product Bundle Variants Data
   */

  public setProductBundleVariantsData(data){

    if(data && data.length>0){
      console.log("===========setProductBundleVariantsData======="+data.length)
      data.forEach(element => {
        element.name=element.name;
          element.productType = 'productBundleVariants';
          element.bannerLogo = (element.productFamily[0].bannerLogo &&element.productFamily[0].bannerLogo !== null) ? element.productFamily[0].bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['navigationId'] = element._id;
          element.priceList=element.priceList
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
          element.productType = 'productBundles';
          element.bannerLogo = (element.bannerLogo && element.bannerLogo !== null) ? element.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['navigationId'] = element._id;
          element.priceList=element.priceList
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
    this.productFamilyVariant[index].quantity = quantity+1;
  }
  decreaseQuantity(quantity:any,index:any): void {
    if(quantity>1){
      this.productFamilyVariant[index].quantity = quantity-1;
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

  if(loggedinData.length > 0 ){
    
    var existingItems = this.cartStore.getCartItems();
  
    let queryParams;
    // if(product.productVariants.length>0){
      queryParams = {
        productName : productFamilyVariant.name,
        productId : productFamilyVariant._id,
        quantity : productFamilyVariant.quantity,
        price : productFamilyVariant.priceList[0].price,
      };
    // }
    console.log(queryParams);
    this.router.navigate(['/cart'], {queryParams: queryParams});
  }

  else {
    this.viewModal();
  }

  


  




}

public viewModal() {
  const modalRef = this.modalService.open(LoginAlertModalComponent);
}

ngOnDestroy(){
    
}

}