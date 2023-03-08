/* Angular Import */
import { Injectable }             from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryDetails } from '../models/interface/partials/category-details';
import { ProductsDetails } from '../models/interface/partials/products-details';
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

    private userAccountDetailsSubject = new BehaviorSubject<any>(null);
    public userAccountDetails$ = this.userAccountDetailsSubject.asObservable();


  constructor() {
  }
  

  /**
   * ============================================================
   * Set Product Category
   */
   public setuserAccountDetails(data : any) : void {

    console.log("---------> Called set");
    this.userAccountDetailsSubject.next(data);
  }

  
  
  /**
   * Return User Details
   */
   public getuserAccountDetails(): CategoryDetails {
    console.log("---------> Called get");
    return this.userAccountDetails;
  }

  

  
  /**
   * Clear MetaData Collection
   * ============================================================
   */
  public clearCategoryDetails(): void {
    
  }



}