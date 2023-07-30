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

    private productListSubject = new BehaviorSubject<any>(null);
    public productList$ = this.productListSubject.asObservable();

    


  constructor() {
  }
  

  /**
   * ============================================================
   * Set Cart Items
   */
   public setCartItems(data : any) : void {
    
    // console.log("**** Cart ITEMS Service Page");
    

    if(data && data.usercart.length>0 && data.usercart[0].userCartDetails){
      this.cartItems = data.usercart[0].userCartDetails;
    }
    else{
      this.cartItems = [];
    }

    
    this.cartItemsSubject.next(data);

    

  }

  public setProductListItems(data : any[]) : void {

    this.productList = data;
    this.productListSubject.next(data);
        
  }

  /**
   * ============================================================
   * Set Cart Ref
   */
  public setCartRefreneceId(data : any) : void {
    this.cartItems = data;
    this.cartItemsSubject.next(data);
    if(data && data.usercart.length>0){
      this.cartRefreneceId = data.usercart[0].cart_ref_id;
    }
    
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


  public getProductListItems() : any {
    return this.productList;
  }



  

  

  
  /**
   * Clear Cart 
   * ============================================================
   */
  public clearCart(): void {
    
  }



}