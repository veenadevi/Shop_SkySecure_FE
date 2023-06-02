import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, forkJoin, Subscription, switchMap, filter } from 'rxjs';
import { CompanyPromptModalComponent } from 'src/shared/components/modals/company-prompt-modal/company-prompt-modal.component';
import { UserCartRequestModel } from 'src/shared/models/concrete/user-cart.model';
import { CartService } from 'src/shared/services/cart.service';
import { GlobalSearchService } from 'src/shared/services/global-search.service';
import { LoginService } from 'src/shared/services/login.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent {
  private subscriptions : Subscription[] = [];

  public cartItems : any;

  public params : any;

 

  constructor(
    private globalSearch : GlobalSearchService,
    private cartStore : CartStore,
    private cartService : CartService,
    private route : ActivatedRoute,
    private userAccountStore : UserAccountStore,
    private router : Router,
    private msalBroadcastService: MsalBroadcastService,
    private authService : MsalService,
    private loginService : LoginService,
    private modalService : NgbModal
  ) {}

public cartData : any[] = [];
  public qcartItems$ = this.cartStore.cartItems$
  .pipe(
    map(data => {
      if(data){
        this.cartData = data.usercart[0].userCartDetails;
        
        return this.cartData;
      }
      else{
        return data;
      }
    }
    )
  )

  public cartItems$ = this.cartStore.productList$
  .pipe(
    map(data => {
      if(data){
        //this.cartData = data.usercart[0].userCartDetails;
        this.cartData = data;
        console.log("**** Data here ", data);
        return this.cartData;
      }
      else{
        return data;
      }
    }
    )
  )


  public ngOnInit() : void {

 
    // let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com"))
    // if(loggedinData.length > 0 ){
    //   //this.userLoggedIn = true;
    // }

    // else{
    //   this.loginService.login();
    // }
    

    this.params = this.route.snapshot.queryParamMap;

    console.log("+++++ ((( ))) ******", this.params);



    if(this.params.has('productId')){
      this.getCartItems(false);
    }
    else if(this.params.has('productVariant')){
      //var list = JSON.parse(this.params.get('productList'));
      this.getCartItems(true);
    }

    

    // this.fetchCategoryMock();

  }





  public checkForAuthentication(){
    
      this.msalBroadcastService.msalSubject$
      .pipe(
          filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"))
        if(loggedinData.length > 0 ){
          //this.userLoggedIn = true;
        }
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
  }
  public fetchCategoryMock() : void{
    
    this.subscriptions.push(
      this.globalSearch.fetchCartMock().subscribe( response => {
        this.cartItems = response.category;
      })
      
    );
  
  }



  public getCartItems(multipleProduct) : void {

    let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let cartRefId = this.cartStore.getCartRefreneceId();
    let productsList = this.cartStore.getProductListItems() ? this.cartStore.getProductListItems() : [];
    
    let req = new UserCartRequestModel({
      userId : userAccountdetails._id,
      //userId : '2222',
      createdBy : userAccountdetails.firstName,
      products : productsList
    });


    if(multipleProduct){

      let productVariant = JSON.parse(this.params.get('productVariant'));
      
      let productListArray = productVariant.requiredAddOns;
      console.log("**** +++++ Multiple products ", productVariant);

      productsList.push({
        "productId": productVariant._id,
        "productName" : productVariant.name,
        "quantity" : 1,
        "price" : productVariant.price ? productVariant.price : 20
      })


      if(productListArray.requiredBundles.length > 0){
        productListArray.requiredBundles.forEach(item => {
          var index = productsList.findIndex(el => el.productId === item._id);
  
          if(index >=0){
            productsList[index].quantity = Number(productsList[index].quantity) + 1;
          }
          else {
            productsList.push({
              "productId": item._id,
              "productName" : item.name,
              "quantity" : 1,
              "price" : item.price ? item.price : 20
          });
          }
        });
      }

      if(productListArray.requiredProductVariants.length){
        productListArray.requiredProductVariants.forEach(item => {
          var index = productsList.findIndex(el => el.productId === item._id);
  
          if(index >=0){
            productsList[index].quantity = Number(productsList[index].quantity) + 1;
          }
          else {
            productsList.push({
              "productId": item._id,
              "productName" : item.name,
              "quantity" : 1,
              "price" : item.price ? item.price : 20
          });
          }
        });
      }
      

    }

    else {
      var index = productsList.findIndex(el => el.productId === this.params.get('productId'));
    

      if(index >=0){
        productsList[index].quantity = Number(productsList[index].quantity) + 1;
      }
      else {
        productsList.push({
          "productId": this.params.get('productId'),
          "productName" : this.params.get('productName'),
          "quantity" : this.params.get('quantity'),
          "price" : this.params.has('price') ? this.params.get('price') : 20
      });
      }

    }



    

    
    if(cartRefId !== '' || cartRefId !== null){
      req.cart_ref_id = cartRefId;
      //req.products.push(productsList);
      req.products = productsList;
    }
    else {
      req.products.push(productsList);
    }

    console.log("+++++++ Final Req ", req);
    this.addCartItemsService(req, 'add');



  }

  public quantityEdit(i, opr) : void {


    if(opr === 'plus'){
      this.cartData[i].quantity = Number(this.cartData[i].quantity) + 1;
    }
    else if(opr === 'minus'){
      this.cartData[i].quantity = Number(this.cartData[i].quantity) - 1;
    }
  }

  public requestQuote(){
    //this.router.navigate(['/cart/cart-submit']);
    let cartRefId = this.cartStore.getCartRefreneceId();
    let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let req = {
      userId : userAccountdetails._id,
      createdBy : userAccountdetails.firstName,
      products : this.cartData,
      companyName : '',
      cart_ref_id : cartRefId ? cartRefId : '0001111'
    };

    // this.cartService.createQuotation(req);

    if(userAccountdetails.company){
      req.companyName = userAccountdetails.company;
      this.createQuotationService(req);
      
    }
    else{
      this.viewModal(req);
    }

    

    //console.log("****** Final Products", this.cartData);

  }

  public viewModal(req) {
    const modalRef = this.modalService.open(CompanyPromptModalComponent);
    modalRef.componentInstance.request = req;
  }

  public createQuotationService(req){
    this.subscriptions.push(
      this.cartService.createQuotation(req).subscribe( response => {
        console.log("**** ++++++++  response is ", response);
        if(response && response.Accounts && response.Accounts){
          if(response.Accounts.code === 'SUCCESS'){
            this.cartService.getCartItems(null).subscribe();
            this.router.navigate(['/cart/cart-submit']);
          } 
          else {
            console.log("/**** Some error occurred ****/ ");
          }
        }
        else{
          console.log("/**** Some error occurred ****/ ");
        }
        
      })
    )
  }
  public saveCart() {

  
    let cartRefId = this.cartStore.getCartRefreneceId();
    let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let req = new UserCartRequestModel({
      userId : userAccountdetails._id,
      //userId : '2222',
      createdBy : userAccountdetails.firstName,
      products : this.cartData,
      cart_ref_id : cartRefId
    });


    console.log("******* +++++++ ", this.cartData);
    this.addCartItemsService(req, 'save');
  }


  public removeCartItem(i) : void {
    

    this.cartData.splice(i, 1);
    let cartRefId = this.cartStore.getCartRefreneceId();
    let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let req = new UserCartRequestModel({
      userId : userAccountdetails._id,
      //userId : '2222',
      createdBy : userAccountdetails.firstName,
      products : this.cartData,
      cart_ref_id : cartRefId
    });

    this.addCartItemsService(req, 'remove');
  }


  public addCartItemsService(req, state) {

    this.cartService.addCartItems(req)
        .pipe(
          //Use switchMap to call another API(s)
          switchMap((dataFromServiceOne) => {
            //Lets map so to an observable of API call
            const allObs$ = this.cartService.getCartItems(null);

            //forkJoin will wait for the response to come for all of the observables
            return forkJoin(allObs$);
          })
        ).subscribe((forkJoinResponse) => {
          //forkJoinResponse will be an array of responses for each of the this.serviceTwo.getAllServiceTwoData CALL
          //Do whatever you want to do with this array
        
        });
  }

}
