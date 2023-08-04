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

    public product : any = {};

  public itemTotal;

  public grandTotal = 0
  public errortext:string


  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';

 

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
        this.cartData.forEach(element => {
          element['itemTotal'] = element.quantity * element.price;
          element.quantity = String(element.quantity);
        });
        this.calTotalPrice();
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

console.log("what is in param..."+ JSON.stringify(this.params))


    

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

    //let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let userAccountdetails = this.userAccountStore.getUserDetails();
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
      

  
      productsList.push({
        "productId": productVariant._id,
        "productName" : productVariant.name,
        "quantity" : productVariant.quantity,
        "price" : (productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].price : '',
        "erpPrice":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].ERPPrice : '',
        "discountRate":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].discountRate : '',
        "priceType":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].priceType : ''

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
              "quantity" : item.quantity,
              "price" : item.priceList.length>0 ? item.priceList[0].price  : '',
              "erpPrice":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].ERPPrice : '',
              "discountRate":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].discountRate : '',
              "priceType":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].priceType : ''
          });
          }
        });
      }

      if(productListArray.requiredProductVariants.length>0){
        productListArray.requiredProductVariants.forEach(item => {
          var index = productsList.findIndex(el => el.productId === item._id);
          
          if(index >=0){
            productsList[index].quantity = Number(productsList[index].quantity) + 1;
          }
          else {
            productsList.push({
              "productId": item._id,
              "productName" : item.name,
              "quantity" : item.quantity,
              "price" : item.priceList.length>0 ? item.priceList[0].price : '',
              "erpPrice":item.item.priceList[0].erpPrice,
              "discountRate":item.item.priceList[0].discountRate,
              "priceType":item.item.priceList[0].discountRate
          });
          }
        });
      }
      

    }

    else {
      var index = productsList.findIndex(el => el.productId === this.params.get('productId'));
      

      if(index >=0){
        productsList[index].quantity = Number(productsList[index].quantity) + Number(this.params.get('quantity'));
      }
      else {
        productsList.push({
          "productId": this.params.get('productId'),
          "productName" : this.params.get('productName'),
          "quantity" : this.params.get('quantity'),
          "price" : this.params.has('price') ? this.params.get('price') : '',
          "erpPrice" : this.params.get('erpPrice'),
          "discountRate" : this.params.get('discountRate'),
          "priceType" : this.params.get('priceType')

       
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

    this.addCartItemsService(req, 'add');



  }
public onChangeQuantity(i, price) : void {
  //console.log("changed quantity "+this.cartData[i].quantity)
  this.cartData[i].quantity = Number(this.cartData[i].quantity)
  this.cartData[i].itemTotal = this.cartData[i].quantity * price;
  this.calTotalPrice();
}


  public quantityEdit(i, opr, price) : void {


    if(opr === 'plus'){
      this.cartData[i].errortext=""
      this.cartData[i].quantity = Number(this.cartData[i].quantity) + 1;
      this.cartData[i].itemTotal = this.cartData[i].quantity * price;
    }
    else if(opr === 'minus'){

      if(this.cartData[i].quantity <= 1){
         this.cartData[i].quantity =1;
         this.cartData[i].errortext="Quantity cannot be 0"
        // this.cartData[i].itemTotal = this.cartData[i].quantity * price;
      }
      else{
        this.cartData[i].errortext=""
        this.cartData[i].quantity = Number(this.cartData[i].quantity) - 1;
        this.cartData[i].itemTotal = this.cartData[i].quantity * price;
      }
        
    }
    this.calTotalPrice();
  }

  public calTotalPrice() {
    if(this.cartData && this.cartData.length>0){
      let sum: number = this.cartData.map(a => a.itemTotal).reduce(function(a, b)
      {
        return a + b;
      });
      this.grandTotal = sum;
    }
    
  }

  public requestQuote(){
    //this.router.navigate(['/cart/cart-submit']);
    let cartRefId = this.cartStore.getCartRefreneceId();
    //let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let userAccountdetails = this.userAccountStore.getUserDetails();

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

    

  

  }

  public viewModal(req) {
    const modalRef = this.modalService.open(CompanyPromptModalComponent);
    modalRef.componentInstance.request = req;
  }

  public createQuotationService(req){
    this.subscriptions.push(
      this.cartService.createQuotation(req).subscribe( response => {
        if(response && response.Accounts && response.Accounts){
          if(response.Accounts.code === 'SUCCESS'){
            this.cartService.getCartItems(null).subscribe();
            this.router.navigate(['/cart/cart-submit']);
          } 
          else {
          }
        }
        else{
        }
        
      })
    )
  }
  public saveCart() {

  
    let cartRefId = this.cartStore.getCartRefreneceId();
    //let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let userAccountdetails = this.userAccountStore.getUserDetails();
    let req = new UserCartRequestModel({
      userId : userAccountdetails._id,
      //userId : '2222',
      createdBy : userAccountdetails.firstName,
      products : this.cartData,
      cart_ref_id : cartRefId
    });


    this.addCartItemsService(req, 'save');
  }


  public removeCartItem(i) : void {
    

    this.cartData.splice(i, 1);
    let cartRefId = this.cartStore.getCartRefreneceId();
    //let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let userAccountdetails = this.userAccountStore.getUserDetails();
    let req = new UserCartRequestModel({
      userId : userAccountdetails._id,
      //userId : '2222',
      createdBy : userAccountdetails.firstName,
      products : this.cartData,
      cart_ref_id : cartRefId,
      status : "New"
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
