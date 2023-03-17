import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, forkJoin, Subscription, switchMap } from 'rxjs';
import { UserCartRequestModel } from 'src/shared/models/concrete/user-cart.model';
import { CartService } from 'src/shared/services/cart.service';
import { GlobalSearchService } from 'src/shared/services/global-search.service';
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
    private router : Router
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
        console.log("******* %%%%%%% ", data);
        return this.cartData;
      }
      else{
        return data;
      }
    }
    )
  )


  public ngOnInit() : void {

    this.params = this.route.snapshot.queryParamMap;

    if(this.params.has('productId')){
      this.getCartItems();
    }

    

    this.fetchCategoryMock();

  }

  public fetchCategoryMock() : void{
    
    this.subscriptions.push(
      this.globalSearch.fetchCartMock().subscribe( response => {
        this.cartItems = response.category;
      })
      
    );
  
  }

  public getCartItems2() {
    let cartRefId = this.cartStore.getCartRefreneceId();
    let productsList = this.cartStore.getProductListItems();
    console.log("((((((( ------> Inside Cart Get ", productsList); 
    let re = new UserCartRequestModel({
      userId : "1001",
      createdBy : "ADMIN",
      products : [{
          "productId":"6408c67ebc262d784813b71f",
          "quantity" :10
      }
      ]
    });
    if(cartRefId !== '' || cartRefId !== null){
      re.cart_ref_id = cartRefId;
    }
    else {
      re.products.push(productsList);
    }


  }

  public getCartItems() : void {

    let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    console.log("((((((( ------> Details ", userAccountdetails); 
    let cartRefId = this.cartStore.getCartRefreneceId();
    let productsList = this.cartStore.getProductListItems() ? this.cartStore.getProductListItems() : [];
    /*let req = new UserCartRequestModel({
      //userId : userAccountdetails._id,
      userId : '2222',
      createdBy : userAccountdetails.firstName,
      products : [{
          "productId": this.params.get('productId'),
          "productName" : this.params.get('productName'),
          "quantity" : this.params.get('quantity')
      }
      ]
    });*/
    let req = new UserCartRequestModel({
      //userId : userAccountdetails._id,
      userId : '2222',
      createdBy : userAccountdetails.firstName,
      products : productsList
    });

    
    productsList.push({
      "productId": this.params.get('productId'),
      "productName" : this.params.get('productName'),
      "quantity" : this.params.get('quantity')
  });
    console.log("***** Pushed Items Old", productsList);

    //console.log("***** Pushed Items ", req.products);
    if(cartRefId !== '' || cartRefId !== null){
      req.cart_ref_id = cartRefId;
      //req.products.push(productsList);
    }
    else {
      //req.products.push(productsList);
    }


    this.addCartItemsService(req, 'add');

    /*this.cartService.addCartItems(req)
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
        
        });*/

  }

  public quantityEdit(i, opr) : void {


    if(opr === 'plus'){
      this.cartData[i].quantity = this.cartData[i].quantity + 1;
    }
    else if(opr === 'minus'){
      this.cartData[i].quantity = this.cartData[i].quantity - 1;
    }
  }

  public requestQuote(){
    this.router.navigate(['/cart/cart-submit']);
  }

  public saveCart() {

    console.log("***** Saved Cart ", this.cartData);
    let cartRefId = this.cartStore.getCartRefreneceId();
    let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let req = new UserCartRequestModel({
      //userId : userAccountdetails._id,
      userId : '2222',
      createdBy : userAccountdetails.firstName,
      products : this.cartData,
      cart_ref_id : cartRefId
    });

    this.addCartItemsService(req, 'save');
  }


  public removeCartItem(i) : void {
    

    this.cartData.splice(i, 1);
    console.log("***** Saved Cart ", this.cartData);
    let cartRefId = this.cartStore.getCartRefreneceId();
    let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let req = new UserCartRequestModel({
      //userId : userAccountdetails._id,
      userId : '2222',
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
