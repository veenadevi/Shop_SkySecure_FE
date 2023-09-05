import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderService } from 'src/shared/services/loader.service';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CategoryDetails } from 'src/shared/models/interface/partials/category-details';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { OEMDetails } from 'src/shared/models/interface/partials/oem-details';
import { OEMResponse } from 'src/shared/models/interface/response/oem-response';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { ProductListService } from 'src/shared/services/product-list-page.service';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/shared/services/login.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { map, filter, Subscription, switchMap, forkJoin } from 'rxjs';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { b2cPolicies, silentRequest } from 'src/app/auth-config';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { CartService } from 'src/shared/services/cart.service';
import { MicrosoftGraphService } from 'src/shared/services/microsoft-graph.service';
import { HttpResponseBase } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})

export class HeaderComponent implements OnInit{
 

  @Output() loginEvent = new EventEmitter();
  
  public menuClicked = false;

  public userLoggedIn = false;

  public subscriptions : Subscription[] = [];

  public numberOfCartItems = 0;

  public searchBarVisibility : boolean = false;

  cartItemCounts:number;

//from toolbarcomponent
  public categories : CategoryDetails[] = [];

  public softwareCategories : CategoryDetails[] = [];

  public hardwareCategories : CategoryDetails[] = [];

  public oemList : OEMDetails[]=[];

  public compareProducts : any[] = [];

  public offers : any[] = [];

  public userFullName = '';

  hoverOpen = true;

  @Input() set userName(value : any){
    this.userFullName =  value;
  }

  @ViewChild('matMenuTrigger') matMenuTrigger: MatMenuTrigger;
  
  @ViewChild('categoriesMenu') categoriesMenu : MatMenuTrigger;

  constructor(
    private appComponent : AppComponent,
    private loginService: LoginService,
    private authService: MsalService,
    private userAccountStore : UserAccountStore,
    private msalBroadcastService: MsalBroadcastService,
    private userProfileService : UserProfileService,
    private cartService : CartService,
    private router : Router,
    private microsoftGraphService : MicrosoftGraphService,
    private spinnerService : NgxSpinnerService,
    private cartStore : CartStore,


    //from toolbar component
    private metaDataSvc : MetadataService,
    private loaderService : LoaderService,
    private metadataStore : MetadataStore,
    private productListService: ProductListService

  ){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          if(this.router.url !== '/'){
            this.searchBarVisibility = true
          }
      }

      if (event instanceof NavigationError) {
      }

      if (event instanceof NavigationEnd) {
        if(this.router.url !== '/'){
          this.searchBarVisibility = true
        }
      }
  });
  }

  /**
   * Click Functions
   */

  
  openDropdown() {

    this.hoverOpen = true;

  }

  // Cart Click

  public userDetails$ = this.userAccountStore.userDetails$
  .pipe(
    map(data => {
      if(data){
                // this.userDetails = data.userDetails;
        // console.log("++++++++++ Came inside User", this.userDetails);
        return data;
      }
      else{
        
        return data;
      }
    }
    )
  )

  /**
   * Service for Cart Number
   */

  public cartItems$ = this.cartStore.productList$
  .pipe(
    map(data => {
      if(data){
        
        
        this.numberOfCartItems = data.length;
        return data;
      }
      else{
        // return data;
      }
    }
    )
  )

    // Check Fot Search BAR

    public globalSearchBarVisibility$ = this.metadataStore.globalSearchBarVisibility$
    .pipe(
      map(data => {
        if(data){
          if(String(data) === 'T'){
            this.searchBarVisibility = false;
          }
          else{
            this.searchBarVisibility = true;
          }
          
          return data;
        }
        else{
          return null;
        }
      }
      )
    )

    public   ngAfterViewInit(): void{
      
      
      
        setTimeout(() => {
          this.globalSearchBarVisibility$.subscribe(res=>{
          });
        }, 1000); // 5 seconds
      

    }
  

  public ngOnInit(): void {

    
    this.spinnerService.show();
    this.subscriptions.push(this.userDetails$.subscribe(res => {
      if(res && res.email){
        this.userLoggedIn = true;
      }
      else{
        this.userLoggedIn = false;
      }
      if(this.userLoggedIn){
        //this.getAccessIdToken();
        this.retrieveCarttItems(res);
        this.spinnerService.hide();
        //this.sample();
      }
    }));


    
    this.msalBroadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
            )
            .subscribe((result: EventMessage) => {
                const payload = result.payload as AuthenticationResult;
                this.authService.instance.setActiveAccount(payload.account);
                this.userAccountStore.setuserAccountDetails(this.authService.instance.getAllAccounts());
                this.loginService.retrieveAccessIdToken();
            });

        this.msalBroadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None)
            )
            .subscribe(() => {
                
            })

    // setTimeout(() => {
    //   
    // }, 5000);




    // if(this.userLoggedIn){
    //   this.userAccountStore.setuserAccountDetails(this.authService.instance.getAllAccounts());
    // }
    // else{
    //   this.userAccountStore.setuserAccountDetails(null);
    // }



    this.getCategories();
    this.getProducts();
    this.getOEMs();
    this.getTrendingProducts();
    //this.getCartId();

    
  }

  public cartFynction(){
    this.router.navigate(['/cart']);
  }

  public goToHomePage(){
    this.router.navigate(['/']);
  }

  public login(){
    //this.loginService.login();
    this.loginEvent.emit('Log In');
  }

  public logout() {
    //this.loginService.logout();
    //this.menuToogled = false;
    localStorage.removeItem('XXXXaccess__tokenXXXX');
    this.userAccountStore.setUserDetails(null);
    //this.router.navigate(['']);
    window.location.reload();
  }

  public getAccessIdToken1(userData) {
    

    let currentAccount = userData.filter(event => (event.environment !== "login.windows.net"))
    let silentRequest1 = {
      scopes: [],
      loginHint: currentAccount[0].username
    };
    this.authService.acquireTokenSilent(silentRequest1).subscribe( res => {
      this.userAccountStore.setAccessIdToken(res.idToken);
      this.userProfileService.fetchUserProfile().subscribe(response => {
        this.retrieveCarttItems(response);
        
      });
      
    });




    
  }

  public getAccessIdToken() {
    this.authService.acquireTokenSilent(silentRequest)
    .subscribe(
      res => {
        this.userAccountStore.setAccessIdToken(res.idToken);
        this.userProfileService.fetchUserProfile().subscribe(response => {
        this.retrieveCarttItems(response);
        
      });
      },
      error => {
        //this.login();
        this.logout();
        // this.userAccountStore.setAccessIdToken(null);
        // this.userAccountStore.setuserAccountDetails(null);
        //  console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }


  public retrieveCarttItems(data) {


    
      this.cartService.getCartItems(data).subscribe();
      console.log("()()( ) Being called here");
    

  }

  private getCategories(): CategoryDetails[]{
    this.spinnerService.show();
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchCategory().subscribe( response => {
        this.metadataStore.setCategoryDetails(response.categorys);
        this.categories = response.categorys;
        this.softwareCategories = response.categorys;
        this.hardwareCategories = null;
        // this.categories = response.categorys.splice(0,10);
        // this.softwareCategories = response.categorys.splice(0,10);
        // this.hardwareCategories = response.categorys.splice(0, 10, 15);
      })
      
    );
    this.spinnerService.hide();
    return categoryResponse;
  }

  private getOEMs(): OEMDetails[]{
    this.spinnerService.show();
    let OEMResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchOEM().subscribe( response => {
        this.metadataStore.setOEMDetails(response.oems);
        this.oemList = response.oems;
        this.spinnerService.hide();
      })
      
    );
    return OEMResponse;
  }
  private getProducts(): ProductsDetails[]{
    this.spinnerService.show();
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchProducts().subscribe( response => {
        this.metadataStore.setProductsDetails(response.products);
      })
      
    );
    this.spinnerService.hide();
    return categoryResponse;
  }

  private getTrendingProducts() : void {
    this.spinnerService.show();
    this.subscriptions.push(
      this.metaDataSvc.fetchTrendingProducts().subscribe( response => {
        this.metadataStore.setTrendingProducts(response.products);
        this.spinnerService.hide();
        //this.metadataStore.setProductsDetails(response.products);
      })
      
    );
  }
  

  selected: boolean = false

  openSearch(selected : boolean) {
    this.selected = !this.selected;
    
  }

  searchClose(selected : boolean) : void {
    this.selected = !this.selected;
    
  }


  // public ngOnInit() : void {

  //   this.getCategories();
  //   this.getProducts();
  //   this.getOEMs();
  //   this.getTrendingProducts();
  //   //this.getCartId();
  // }


  public goToProductsPage() {
    this.router.navigate(['/products']);
  }

  public goToProductsPageWithCategorySelection(category) {
    this.matMenuTrigger.closeMenu();
    this.categoriesMenu.closeMenu();
    this.productListService.setCategoryIdSelection(category._id);
    this.router.navigate([`/products/category/${category._id}`]);
  }

  public goToProductsPageWithSubCategorySelection(category,subCategory) {
    this.productListService.setSubCategoryIdSelection(category._id, subCategory._id);
    this.router.navigate([`/products/sub-category/${category._id}-${subCategory._id}`], { state: { category , subCategory} });
  }

  goToProductsPageByBrand(oem) {
    this.productListService.setBrandIdSelection(oem._id);
    this.router.navigate([`/products/brand/${oem._id}`]);
  }

  public openMenu(menuTrigger: MatMenuTrigger){
    menuTrigger.openMenu();
  }

  public closeMenu(menuTrigger: MatMenuTrigger){
    menuTrigger.closeMenu();
  }
  
  public navigateToLogin(){
    this.router.navigate(['/login']);
  }

}
