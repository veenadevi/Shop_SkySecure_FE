/* Angular Import */
import { Injectable }             from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserCartDetailsModel } from '../models/concrete/user-cart-details.model';
import { CategoryDetails } from '../models/interface/partials/category-details';
import { ProductsDetails } from '../models/interface/partials/products-details';
/* Feature Imports */



/**
 * Creates our Metadata State injectable
 * Feature specific stores are Angular Injectables extending the abstract OuxStore (i.e., class):
 */
@Injectable({ providedIn: 'root' })
export class CartStore {

    

    public cartItems : any ;

    public productList : any[];

    public cartRefreneceId : string;


    
    

    private cartItemsSubject = new BehaviorSubject<any>(null);
    public cartItems$ = this.cartItemsSubject.asObservable();

    private cartRefreneceIdSubject = new BehaviorSubject<any>(null);
    public cartRefreneceId$ = this.cartRefreneceIdSubject.asObservable();

    


  constructor() {
  }
  

  /**
   * ============================================================
   * Set Cart Items
   */
   public setCartItems(data : any) : void {
    
    this.cartItems = data.usercart[0].userCartDetails;
    console.log("******-------> Set Items here ", this.cartItems);

    // data.usercart[0].userCartDetails.forEach( element=> {
    //   this.productList.push({
    //       "productId": element.productId,
    //       "quantity" : element.quantity
    //   })

    // })

    // console.log("******-------> Set Products here ", this.productList);
    this.cartItemsSubject.next(data);

    

    
        // let re = new UserCartRequestModel({
    //     userId : "12345",
    //     createdBy : "ADMIN",
    //     products : [{
    //         "productId":"6408c67ebc262d784813b71f",
    //         "quantity" :4
    //     }
    //     ]
    //   })
  }

  public setProductList(data : any) : void {
    
    let tempList = data.usercart[0].userCartDetails;
    console.log("******-------> Set Items here ", this.cartItems);

    tempList.forEach( element=> {
      this.productList.push({
          "productId": element.productId,
          "quantity" : element.quantity
      })

    })

    console.log("******-------> Set Products here ", this.productList);
    //this.cartItemsSubject.next(data);

    

    
        
  }

  /**
   * ============================================================
   * Set Cart Ref
   */
  public setCartRefreneceId(data : any) : void {
    this.cartItems = data;
    this.cartItemsSubject.next(data);
    this.cartRefreneceId = data.usercart[0].cart_ref_id;
    this.cartRefreneceIdSubject.next(data);
  }

  
  
  
  
  /**
   * Return Cart Items
   */
   public getCartItems(): any {
    return this.cartItems;
  }

  /**
   * Return Cart Refrenece Id
   */
  public getCartRefreneceId(): any {
    return this.cartRefreneceId;
  }




  

  

  
  /**
   * Clear Cart 
   * ============================================================
   */
  public clearCart(): void {
    
  }



}