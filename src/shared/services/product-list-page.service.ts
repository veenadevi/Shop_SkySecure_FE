/* Angular Import */
import { Injectable }             from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CategoryDetails } from '../models/interface/partials/category-details';
import { OEMDetails } from '../models/interface/partials/oem-details';
import { ProductsDetails } from '../models/interface/partials/products-details';
/* Feature Imports */



/**
 * Creates our Metadata State injectable
 * Feature specific stores are Angular Injectables extending the abstract OuxStore (i.e., class):
 */
@Injectable({ providedIn: 'root' })
export class ProductListService {
    public categoryId : String ;
    private categoryIdSelectionSubject = new Subject<String>();
    public categoryIdSelectionSubject$ = this.categoryIdSelectionSubject.asObservable();
    private subCategoryIdSelectionSubject = new Subject<Object>();
    public subCategoryIdSelectionSubject$ = this.subCategoryIdSelectionSubject.asObservable();
    private brandIdSelectionSubject = new Subject<String>();
    public brandIdSelectionSubject$ = this.brandIdSelectionSubject.asObservable();
  constructor() {}
  

  /**
   * ============================================================
   * Set Product Category
   */
   public setCategoryIdSelection(categoryId : String) : void {

    this.categoryIdSelectionSubject.next(categoryId);
  }

  public setSubCategoryIdSelection(categoryId : String,subcategoryId : String) : void {
    this.subCategoryIdSelectionSubject.next({categoryId,subcategoryId});
  }

  public setBrandIdSelection(brandId : String) : void {
    this.brandIdSelectionSubject.next(brandId);
  }

}