/* Angular Import */
import { Injectable }             from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryDetails } from '../models/interface/partials/category-details';
import { ProductsDetails } from '../models/interface/partials/products-details';
import { UserDetails } from '../models/interface/partials/user-details';
/* Feature Imports */



/**
 * Creates our Metadata State injectable
 * Feature specific stores are Angular Injectables extending the abstract OuxStore (i.e., class):
 */
@Injectable({ providedIn: 'root' })
export class UserAccountStore {

    /*public categoryDetails : CategoryDetails ;
    public productsDetails : ProductsDetails ;
  
    private categoryDetailsSubject = new BehaviorSubject<CategoryDetails[]>(null);
    public categoryDetails$ = this.categoryDetailsSubject.asObservable();

    private productsDetailsSubject = new BehaviorSubject<ProductsDetails[]>(null);
    public productsDetails$ = this.productsDetailsSubject.asObservable(); */

    public userAccountDetails : any;
    public accessIdToken : any;
    public userProfileDetails : any;

    private userAccountDetailsSubject = new BehaviorSubject<any>(null);
    public userAccountDetails$ = this.userAccountDetailsSubject.asObservable();

    private accessIdTokenSubject = new BehaviorSubject<any>(null);
    public accessIdToken$ = this.accessIdTokenSubject.asObservable();

    private userProfileDetailsSubject = new BehaviorSubject<any>(null);
    public userProfileDetails$ = this.userProfileDetailsSubject.asObservable();


  constructor() {
  }
  

  /**
   * ============================================================
   * Set Product Category
   */
   public setuserAccountDetails(data : any) : void {
    //this.userAccountDetails = data;
    this.userAccountDetailsSubject.next(data);
  }

  /**
   * ============================================================
   * Set User Profile
   */
  public setUserProfileDetails(data : any) : void {
    this.userProfileDetails = data;
    this.userProfileDetailsSubject.next(data);
  }

  /**
   * ============================================================
   * Set Product AccessIdToken
   */
  public setAccessIdToken(data : any) : void {
    this.accessIdToken = data;
    this.accessIdTokenSubject.next(data);
  }

  
  
  /**
   * Return User Details
   */
   public getuserAccountDetails(): CategoryDetails {
    return this.userAccountDetails;
  }

  /**
   * Return User Profile
   */
  public getUserProfileDetails(): UserDetails {
    
    return this.userProfileDetails.userDetails;
  }


  /**
   * Return AccessIdToken
   */
  public getAccessIdToken(): string {
    return this.accessIdToken;
  }

  

  
  /**
   * Clear MetaData Collection
   * ============================================================
   */
  public clearCategoryDetails(): void {
    
  }



}