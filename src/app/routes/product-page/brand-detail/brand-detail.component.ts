import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';

@Component({
  selector: 'brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit{


  constructor(
    private route: ActivatedRoute,
    private metaDataSvc : MetadataService,
    private authService : MsalService,
    private cartStore : CartStore,
    private router : Router,
    private modalService : NgbModal
  ){}


  public onPageLoad : boolean = true;

  public subscriptions : Subscription[] = [];

  // public bundleSku : any;

  // public productFamilylist : any[] = [];

  public productFamily : any;

  public products : any[] = [];

  public features : any[] = [];

  public productVarients : any[] = [];

  public productFamilyVariants : any[] = []

  public productVarientData : any;

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';





  public ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('brandId');
    this.getBrandDetails(productId);
  }


  public getBrandDetails(id){
    //id = '6412ac15bdb764f8d6a252a5';
    this.onPageLoad = false;
    this.subscriptions.push(
       this.metaDataSvc.fetchSingleBrandDetails(id).subscribe( response => {

        this.productVarientData = response;
        this.productFamily = response.productFamily;
        this.productFamilyVariants = response.productFamilyVariants;
        this.productVarients = response.productVarients;
        this.products = response.products;
        
        this.features = response.features.slice(0,5);





        //this.bundleSku = response.bundleSku;
        //this.productFamilylist = response.productFamilylist;

        /*let featureList = [];
        if(response.productFeatureList?.length > 0) {
          featureList = response.productFeatureList;
          this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
        }
        else if(response.productVariants.length> 0 ){
          featureList = response.productVariants[response.productVariants.length -1].featureList.slice(0,5);
          this.productSubCategoryId = response.productVariants[0].featureList[0].subCategoryId;
        }
        this.similarProducts = response.productBundles;
        this.product = { ...response.products , featureList : featureList, productFeatureList: response.productFeatureList, productVariants: response.productVariants } ; */
        this.onPageLoad = true;
      })
    );
  }

  public getColor(val){
    if(val){
      return val.toLowerCase();
    }
    else{
      return 'black';
    }
    
  }
  
  public requestQuote(product){

    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com"));

    if(loggedinData.length > 0 ){
      
      var existingItems = this.cartStore.getCartItems();
    console.log("******* Inside div", product);
      /* let queryParams;
      if(product.productVariants.length>0){
        queryParams = {
          productName : product.productVariants[0].name,
          productId : product.productVariants[0]._id,
          quantity : 1,
          price : product.productVariants[0].priceList[0].price,
        };
      }
      this.router.navigate(['/cart'], {queryParams: queryParams}); */
    }

    else {
      this.viewModal();
    }
  }

  public viewModal() {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
  }
  
  
}
