import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit{

  public currentRoute: string;

  constructor(
    private route: ActivatedRoute,
    private metaDataSvc : MetadataService,
    private authService : MsalService,
    private cartStore : CartStore,
    private router : Router,
    private modalService : NgbModal,
    private userAccountStore : UserAccountStore
  ){
    this.router.events.subscribe((event: Event) => {
        let currentUrl = this.route.snapshot.paramMap.get('brandId');
        
        if (event instanceof NavigationStart) {
            // Show progress spinner or progress bar
            //this.ngOnInit();
            //console.log('@@@@@@@@ ___ Route change detected');
            currentUrl = this.route.snapshot.paramMap.get('brandId');
            //console.log('@@@@@@@@ ___ Route change Start', currentUrl);
        }

        if (event instanceof NavigationEnd) {
            // Hide progress spinner or progress bar
            this.currentRoute = event.url; 
            currentUrl = this.route.snapshot.paramMap.get('brandId');
            this.ngOnInit();
            console.log('@@@@@@@@ ___ Route change End');         
            //console.log("@@@@@@@@ ___ ",event);
        }

        if (event instanceof NavigationError) {
             // Hide progress spinner or progress bar

            // Present error to user
            //console.log("@@@@@@@@ ___ ", event.error);
        }
    });
  }


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
        
        //this.features = response.features.slice(0,5);
        this.features = response.features;




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

    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    let queryParams;
    if(product.productVariants.length>0){
      queryParams = {
        productName : product.productVariants[0].name,
        productId : product.productVariants[0]._id,
        quantity : 1,
        price : product.productVariants[0].priceList[0].price,
      };
    }
    /*if(loggedinData.length > 0 ){
      
      var existingItems = this.cartStore.getCartItems();

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
  
  
}
