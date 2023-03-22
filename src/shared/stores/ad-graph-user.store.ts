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
export class AdGraphUserStore {

   
    
    public adUserDetails : any ;
    
    private adUserDetailsSubject = new BehaviorSubject<any>(null);
    public adUserDetails$ = this.adUserDetailsSubject.asObservable();

  constructor() {
  }
  


  /**
   * ============================================================
   * Set Search Results
   */
  public setAdUserDetails(data : any) : void {

    this.adUserDetails = data;
    this.adUserDetailsSubject.next(data);
  }

  
  

  /**
   * Return Search Result Details
   */
  public getAdUserDetails(): any {
    return this.adUserDetails;
  }

  
  /**
   * Clear MetaData Collection
   * ============================================================
   */
  public clearAdUserDetails(): void {
    
  }



}