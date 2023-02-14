/* Angular Import */
import { Injectable }             from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryDetailsModel } from '../models/concrete/category-details.model';
import { CategoryDetails } from '../models/interface/partials/category-details';
import { ProductsDetails } from '../models/interface/partials/products-details';
/* Feature Imports */



/**
 * Creates our Metadata State injectable
 * Feature specific stores are Angular Injectables extending the abstract OuxStore (i.e., class):
 */
@Injectable({ providedIn: 'root' })
export class MetadataStore {

    public categoryDetails : CategoryDetails ;
    public productsDetails : ProductsDetails ;
  
    private categoryDetailsSubject = new BehaviorSubject<CategoryDetails[]>(null);
    public categoryDetails$ = this.categoryDetailsSubject.asObservable();

    private productsDetailsSubject = new BehaviorSubject<ProductsDetails[]>(null);
    public productsDetails$ = this.productsDetailsSubject.asObservable();

  constructor() {
  }
  

  /**
   * ============================================================
   * Set Product Category
   */
   public setCategoryDetails(data : CategoryDetails[]) : void {

    this.categoryDetailsSubject.next(data);
  }

  /**
   * ============================================================
   * Set Products
   */
  public setProductsDetails(data : ProductsDetails[]) : void {

    this.productsDetailsSubject.next(data);
  }

  
  /**
   * Return User Details
   */
   public getCategoryDetails(): CategoryDetails {
    return this.categoryDetails;
  }

  /**
   * Return User Details
   */
  public getProductsDetails(): ProductsDetails {
    return this.productsDetails;
  }

  
  /**
   * Clear MetaData Collection
   * ============================================================
   */
  public clearCategoryDetails(): void {
    
  }



}