/* Angular Import */
import { Injectable }             from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsDetails } from '../models/interface/partials/products-details';
/* Feature Imports */



/**
 * Creates our Metadata State injectable
 * Feature specific stores are Angular Injectables extending the abstract OuxStore (i.e., class):
 */
@Injectable({ providedIn: 'root' })
export class SearchResultStore {

   
    public searchResults : ProductsDetails ;
  
  

    private searchResultsSubject = new BehaviorSubject<ProductsDetails[]>(null);
    public searchResults$ = this.searchResultsSubject.asObservable();

  constructor() {
  }
  


  /**
   * ============================================================
   * Set Search Results
   */
  public setSearchResults(data : ProductsDetails[]) : void {

    this.searchResultsSubject.next(data);
  }

  
  

  /**
   * Return Search Result Details
   */
  public getSearchResults(): ProductsDetails {
    return this.searchResults;
  }

  
  /**
   * Clear MetaData Collection
   * ============================================================
   */
  public clearCategoryDetails(): void {
    
  }



}