/* Angular Import */
import { Injectable }             from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryDetailsModel } from '../models/concrete/category-details.model';
import { CategoryDetails } from '../models/interface/partials/category-details';
/* Feature Imports */



/**
 * Creates our Metadata State injectable
 * Feature specific stores are Angular Injectables extending the abstract OuxStore (i.e., class):
 */
@Injectable({ providedIn: 'root' })
export class MetadataStore {

    public categoryDetails : CategoryDetails ;
  
    private categoryDetailsSubject = new BehaviorSubject<CategoryDetails[]>(null);
    public categoryDetails$ = this.categoryDetailsSubject.asObservable();

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
   * Return User Details
   */
   public getCategoryDetails(): CategoryDetails {
    return this.categoryDetails;
  }

  
  /**
   * Clear MetaData Collection
   * ============================================================
   */
  public clearCategoryDetails(): void {
    
  }



}