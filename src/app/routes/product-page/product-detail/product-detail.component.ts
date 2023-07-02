import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  productImages=[];
  productBundles=[];
  faq = [];
  productListToCompare  = [];
  products = [];
  links = ['#description', '#feature', '#specification','#reviews', '#compProd', '#bundles','#faq'];
  titles = ['Description', 'Features', 'Specification','Reviews','Compare Products','Bundles','FAQ'];
  activeLink = this.links[0];
  myColor = '';

  @ViewChild('descriptionRef') descriptionRef!: ElementRef;
  @ViewChild('featureRef') featureRef!: ElementRef;
  @ViewChild('specificationRef') specificationRef!: ElementRef;
  @ViewChild('reviewsRef') reviewsRef!: ElementRef;
  @ViewChild('compProdRef') compProdRef!: ElementRef;
  @ViewChild('bundlesRef') bundlesRef!: ElementRef;
  @ViewChild('faqRef') faqRef!: ElementRef;
  @ViewChild('section2Ref') section2Ref!: ElementRef;

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
    else if (sectionId === 'reviews') {
      section = this.reviewsRef.nativeElement
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
    console.log("url",url);
    window.open(url, '_blank');
  }


 featureList: any[] = [];
 productVariants: any[]  =[];
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
      this.metaDataSvc.fetchSingleProductDetails(productId).subscribe( (response) => {
         this.individualProductDetail$.subscribe();

        let fList = [];
        if (response.featureList?.length > 0) {
          //featureList = response.productFeatureList;
          this.featureList = response.featureList.slice(0,5);
          //this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
        }
        if(response.products.name!=null) {
        this.productName = response.products.name;
        }

        // this.featureList = fList;
        console.log("inside", this.featureList);
        
        this.similarProducts = response.productBundles;
//         response.productBundles=[{"name": "Microsoft Defender for Office 365 Plan 1","priceList": [
//           {
//               "Currency": "INR",
//               "price": "1525.20",
//               "priceType": "Yearly",
//               "ERPPrice": "1860.00",
//               "discountRate": "18"
//           }
//         ]
// }];
       response.products[0] = {...response.products[0], quantity: 1 }
        this.product = { products:[...response.products], featureList: response.featureList, productFeatureList: response.productFeatureList, productVariants: response.productVariants, featureListByProductVariants: response.featureListByProductVariants };
        console.log("&&&&& inside", this.product.productVariants.length);
        this.onProductLoad = true;
        this.bannerUrl = this.product.bannerURL;
        if(response.products[0].productImages.length>0) {
          this.productImages = response.productImages;
        } else {
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        this.productImages.push("../../assets/icons/DefaultImageIcon.svg");
        }
        for(let i=0;i<response.productBundles.length;i++)
        response.productBundles[i].productFamily = response.productBundles[i].productFamily.map(object => ({ ...object, checked: false, quantity: 1 }));
        this.productBundles  = response.productBundles;
        this.faq  = response.products[0].productFAQ;
        // this.product.productVariants.push(response.productBundles);
        //this.product.productVariants = [123];
        console.log("prVar:",this.product.productVariants)
        this.productVariants=response.productVariants;
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
      })


    );
  }

  public setDataValues(resp:any): void {
    // this.product.name=resp.product.name;
    // this.productName = resp.product.name;
console.log("response values: ", resp);
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

  constructor(
    private metaDataSvc : MetadataService,
    private route: ActivatedRoute,
    private cartStore : CartStore,
    private metadataStore : MetadataStore,
    private router : Router,
    private authService : MsalService,
    private modalService : NgbModal,
    private compareProductsStore : CompareProductsStore
  ){}
featureCount=5;

  public ngOnInit() : void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.viewAllFeature=false;
    
    this.getProductDetails(productId);
    console.log(this.featureList);
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
    console.log("featureList",this.dispFeatureList.length);
    //this.getProductDetails2(productId);
  }

  public featureCountEvent(): void {
    
    //  if(this.product.featureList.length>5 && !this.viewAllFeature){
    //   this.featureList = [...this.product.featureList.slice(0,5)];
    //   console.log("dispfeatureList",this.featureList);
    //   this.viewAllFeature = true;
    // } else {
      this.featureList = this.product.featureList;
      console.log("product list to compare",this.productListToCompare);
    // }
  }

  public removeSelectedItem(_id:any){
    this.productListToCompare = this.productListToCompare.filter(function(item) {
      return item._id != _id;
    });
    // this.compareProductsStore.setCompareProductsList(this.productList);
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
    // console.log('product_list_to_compare',);
  }

  public navigateToCompareProducts(){
    this.router.navigate(['/compare-products']);
  }
  async addToCompare(item:any):Promise<void> {
    // if(!item.checked)
    // item.checked = true;

    // if(item.checked)
    // item.checked = false;
    // else
    // item.checked = true;
    let count=0;
    await this.productListToCompare.forEach(val => {
      if(val._id===item._id) {
        count++;
      }
    });
    if (count===0) {
      item = { ...item, 'solutionCategory': this.product.products[0].subcategories[0].description };
      this.productListToCompare.push(item);
    }
    // this.productListToCompare.push(item);
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productListToCompare));
    this.compareProductsStore.setCompareProductsList(this.productListToCompare);
    const prodGet = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    console.log("getProdFromLocalStorage",prodGet);
  }

  images: any[] = [1,2,3,4];


    position: string = 'left';
    quantityCount = 1;
    addQuantity(quantity:any,index:any):void {
      this.productBundles[index].productFamily[0].quantity = quantity+1;
    }
    decreaseQuantity(quantity:any,index:any): void {
      if(quantity>1){
        this.productBundles[index].productFamily[0].quantity = quantity-1;
      }
    }

    addBuyQuantity(quantity:any):void {
      this.product.products[0].quantity = quantity+1;
    }
    decreaseBuyQuantity(quantity:any): void {
      if(quantity>1){
        this.product.products[0].quantity = quantity-1;
      }
    }

  public requestQuote (product : any) : void {

    
    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    if(loggedinData.length > 0 ){
      
      var existingItems = this.cartStore.getCartItems();
    
      let queryParams;
      // if(product.productVariants.length>0){
        queryParams = {
          productName : product.name,
          productId : product._id,
          quantity : product.quantity,
          price : product.priceList[0].price,
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

  public getColor(val){
    if(val){
      return val.toLowerCase();
    }
    else{
      return 'Black'
    }
    
  }

  ngOnDestroy(){
    
  }
}
