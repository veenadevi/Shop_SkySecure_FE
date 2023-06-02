import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  products = [];


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

  private getProductDetails(productId: string): void {
    this.onProductLoad = false;
    this.subscriptions.push(
       this.metaDataSvc.fetchSingleProductDetails(productId).subscribe( response => {
        this.individualProductDetail$.subscribe();

        let fList = [];
        if(response.featureList?.length > 0) {
          //featureList = response.productFeatureList;
          fList = response.featureList;
          //this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
        }

        this.similarProducts = response.productBundles;
        this.product = { ...response.products , featureList : response.featureList, productFeatureList: response.productFeatureList, productVariants: response.productVariants, featureListByProductVariants : response.featureListByProductVariants } ;
        this.onProductLoad = true;
        this.bannerUrl = this.product.bannerURL;
       
        
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

  constructor(
    private metaDataSvc : MetadataService,
    private route: ActivatedRoute,
    private cartStore : CartStore,
    private metadataStore : MetadataStore,
    private router : Router,
    private authService : MsalService,
    private modalService : NgbModal
  ){}

  public ngOnInit() : void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProductDetails(productId);
    //this.getProductDetails2(productId);
  }

  public requestQuote (product : ProductsDetails) : void {

    
    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    if(loggedinData.length > 0 ){
      
      var existingItems = this.cartStore.getCartItems();
    
      let queryParams;
      if(product.productVariants.length>0){
        queryParams = {
          productName : product.productVariants[0].name,
          productId : product.productVariants[0]._id,
          quantity : 1,
          price : product.productVariants[0].priceList[0].price,
        };
      }
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
