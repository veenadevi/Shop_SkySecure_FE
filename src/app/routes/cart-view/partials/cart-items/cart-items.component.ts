import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, forkJoin, Subscription, switchMap, filter } from 'rxjs';
import { CompanyPromptModalComponent } from 'src/shared/components/modals/company-prompt-modal/company-prompt-modal.component';
import { GstPromptModalComponent } from 'src/shared/components/modals/gst-prompt-modal/gst-prompt-modal.component';
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

  quantity: "cartItems";

  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    if (key === '-') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '+') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '/') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '*') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '.') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === 'e') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === 'E') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
  }

  private subscriptions : Subscription[] = [];

  public cartItems : any;

  public params : any;

    public product : any = {};

  public itemTotal;

  public grandTotal = 0
  public monthlyItemsGrandTotal=0
  public   yearlyItemsGrandTotal=0
  public errortext:string



  private opts = [
    { key: 'Year', value: "Year" },
    { key: 'Month', value: "Month" },
  ];


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
    private modalService : NgbModal,
    private spinner: NgxSpinnerService
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
         // element.priceType="Yearly"
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
      createdBy : userAccountdetails._id,
      updatedBy : userAccountdetails._id,
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
 
  this.cartData[i].quantity = Number(this.cartData[i].quantity)
  this.cartData[i].itemTotal = this.cartData[i].quantity * price;
  this.calTotalPrice();
  this.saveCart();
  
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
    this.saveCart();
  }

  public calTotalPrice() {
    if(this.cartData && this.cartData.length>0){

      let sum: number = this.cartData
    
      .map(a => a.itemTotal)
      .reduce(function(a, b) {
        return a + b;
      }, 0); 
      this.grandTotal = sum;

      let yearlysum: number = this.cartData

      .filter(a => a.priceType == 'Year') // Add a filter condition here
      .map(a => a.itemTotal)
      .reduce(function(a, b) {
        return a + b;
      }, 0); // 0 is the initial value
    
    this.yearlyItemsGrandTotal = yearlysum;


    let montlySum: number = this.cartData
      .filter(a => a.priceType =='Month') // Add a filter condition here
      .map(a => a.itemTotal)
      .reduce(function(a, b) {
        return a + b;
      }, 0); // 0 is the initial value
    
    this.monthlyItemsGrandTotal = montlySum;


    }
    
  }

  public buyNow(){
  }

  public requestQuote(){

    
    
    if(this.cartData.length>0){

      let cartRefId = this.cartStore.getCartRefreneceId();
      
      let userAccountdetails = this.userAccountStore.getUserDetails();

      let req = {
        userId : userAccountdetails._id,
       
        createdBy : userAccountdetails.firstName,
        //createdBy : "userwithoutGST1001",
        
        products : this.cartData,
        companyName : '',
        cart_ref_id : cartRefId ? cartRefId : '0001111'
      };

      this.viewModal(req);

      
/*
      if(userAccountdetails.placeOfSupply && userAccountdetails.placeOfSupply !== null){
        this.createQuotationService(req, userAccountdetails);
      }
      else{
        this.viewModal(req);
      }*/

      //if(userAccountdetails.placeOfSupply && userAccountdetails.placeOfSupply !== null){

      /*if(userAccountdetails.placeOfSupply && userAccountdetails.placeOfSupply !== null){
          req.companyName = userAccountdetails.company;
          this.createQuotationService(req);
          
      }
      else{
          this.viewModal(req);
      }*/

      /*if(userAccountdetails.company){
        req.companyName = userAccountdetails.company;
        this.createQuotationService(req);
        
      }
      else{
        this.viewModal(req);
      }*/

    }
    
    

  

  }

  public viewModal(req) {
    //const modalRef = this.modalService.open(CompanyPromptModalComponent);
    const modalRef = this.modalService.open(GstPromptModalComponent, {size: 'lg', windowClass: 'assign-leads-modal-custom-class'});
    modalRef.componentInstance.request = req;
  }

  /*public createQuotationService2(req){


        req.billing_address = {
          "attention": "name",
          "address": formVal.addressLine1,
          "street2": formVal.addressLine2,
          "state_code": this.selectedState.isoCode,
          "city": this.selectedCity.name,
          "state": this.selectedState.name,
          "zip": formVal.postalCode,
          "country": this.selectedCountry.isoCode,
          "phone": formVal.phoneNo
      }

      req.currency_id = "1014673000000000064";

      req.contact_persons =  [
          {
              "first_name": "Veena",
              "email": "veena@skysecuretech.com",
              "phone": "+91-9972835477",
              "is_primary_contact": true,
              "enable_portal": false
          }
      ];

      
      


      if(formVal.gstNo === null || formVal.gstNo === ''){
        
        
        req.gst_treatment = "business_none";
      }
      else{
        req.gst_no =  formVal.gstNo;
        req.gst_treatment = "business_gst";
      }


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
  }*/

  public createQuotationService(req, userData){



    /*
        userId : userAccountdetails._id,
        createdBy : userAccountdetails.firstName,yearlyItemsGrandTotal
        products : this.cartData,
        companyName : '',
        cart_ref_id : cartRefId ? cartRefId : '0001111' */


        

        
        req.companyName = userData.company
        req.billing_address = {
            "attention": "name",
            "address": userData.addressOne ? userData.addressOne : '',
            "street2": userData.addressTwo ? userData.addressTwo : '',
            "state_code": userData.placeOfSupply,
            "city": userData.city ? userData.city : '',
            "state": userData.placeOfSupply ? userData.placeOfSupply : '',
            "zip": userData.pinCode ? userData.pinCode : '',
            "country": userData.country ? userData.country : '',
            "phone": userData.mobileNumber ? userData.mobileNumber : ''
        }

        req.currency_id = "1014673000000000064";

        req.contact_persons =  [
            {
                "first_name": userData.firstName,
                "email": userData.email,
                "phone": userData.mobileNumber ? userData.mobileNumber : '',
                "is_primary_contact": true,
                "enable_portal": false
            }
        ];



        if( userData.isRegistered){
      
          req.gst_no =  userData.gstinNumber ? userData.gstinNumber : '';
          //req.gst_no = "29ABDCS1510L1ZB";
          req.gst_treatment = "business_gst";
          
        }
        else{
          req.gst_treatment = "business_none";
        }
        




    this.spinner.show();

    this.subscriptions.push(
      this.cartService.createQuotation(req).subscribe( response => {
        if(response && response.Accounts && response.Accounts){
          if(response.Accounts.code === 'SUCCESS'){

            this.spinner.hide();
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

    console.log("callig save")
  
    let cartRefId = this.cartStore.getCartRefreneceId();
    //let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let userAccountdetails = this.userAccountStore.getUserDetails();
    let req = new UserCartRequestModel({
      userId : userAccountdetails._id,
      
      //userId : '2222',
      createdBy : userAccountdetails._id,
      updatedBy : userAccountdetails._id,
      products : this.cartData,
      cart_ref_id : cartRefId
    });


    
    this.addCartItemsService(req, 'save');
  }


  public removeCartItem(i) : void {
    

    this.cartData.splice(i, 1);


    if(this.cartData.length <=0){
      this.cartStore.setCartRefreneceId(null);
    }
    let cartRefId = this.cartStore.getCartRefreneceId();
    //let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let userAccountdetails = this.userAccountStore.getUserDetails();
    let req = new UserCartRequestModel({
      userId : userAccountdetails._id,
      //userId : '2222',
    
      createdBy : userAccountdetails._id,
      updatedBy : userAccountdetails._id,
      products : this.cartData,
      cart_ref_id : cartRefId,
      status : "New"
    });

    console.log("_)(*&^^%% Val here ", this.cartData.length);

    

    this.addCartItemsService(req, 'remove');
    this.params = null;
  }


  public addCartItemsService(req, state) {

    this.spinner.show();
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
          console.log("+_)(*&^^ ^", forkJoinResponse);
          this.spinner.hide();
          //forkJoinResponse will be an array of responses for each of the this.serviceTwo.getAllServiceTwoData CALL
          //Do whatever you want to do with this array
        
        });
  }


  public navigateToProductDetails(product:any){
    this.router.navigate(['/products', product.productId]); 
  }

  get firstSelectOptions() {
    return this.opts.map(({key}) => key);
  }

  public onSelectChange(event, i){
    console.log("_+_+_+_+_ event", event.target.value);
    if(event.target.value === 'Year'){
      this.cartData[i].itemTotal = this.cartData[i].quantity * this.cartData[i].priceList[0].price;
      this.cartData[i].price = this.cartData[i].priceList[0].price;
      this.cartData[i].priceType = 'Year';
      this.cartData[i].erpPrice = Number(this.cartData[i].priceList[0].ERPPrice);
    }
    else{
      this.cartData[i].itemTotal = this.cartData[i].quantity * this.cartData[i].priceList[1].price;
      this.cartData[i].price = this.cartData[i].priceList[1].price;
      this.cartData[i].priceType = 'Month';
      this.cartData[i].erpPrice = Number(this.cartData[i].priceList[1].ERPPrice);
    }

    console.log("+_+_+_ ()( )( ERP", this.cartData[i]);
  }


}
