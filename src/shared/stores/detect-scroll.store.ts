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
export class DetectScrollStore {

    public productFiltersScroll : any;
    private productFiltersScrollSubject = new BehaviorSubject<any>(null);
    public productFiltersScroll$ = this.productFiltersScrollSubject.asObservable();


  constructor() {
  }
  

  /**
   * ============================================================
   * Set CRM Users
   */
   public setProductFiltersScroll() : void {
    

    this.productFiltersScrollSubject.next("Scrolled");

    

  }

 

  
  
  
  
  /**
   * Return Crm Users
   */
   public getProductFiltersScroll(): any {
    return this.productFiltersScroll;
  }


  
  /**
   * Clear Cart 
   * ============================================================
   */
  public clearProductFiltersScroll(): void {
    
  }



}