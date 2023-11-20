/* Angular Import */
import { Injectable }             from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsDetails } from '../models/interface/partials/products-details';
import { RequestQuoteDetailsModel } from '../models/concrete/request-quote-details.model';
/* Feature Imports */



/**
 * Creates our Metadata State injectable
 * Feature specific stores are Angular Injectables extending the abstract OuxStore (i.e., class):
 */
@Injectable({ providedIn: 'root' })
export class RequestQuoteDetailsStore {

   
    public reqQuoteDetails : RequestQuoteDetailsModel = new RequestQuoteDetailsModel(null);
  
  

    private reqQuoteDetailsSubject = new BehaviorSubject<any>(null);
    public reqQuoteDetails$ = this.reqQuoteDetailsSubject.asObservable();

    constructor() {
    }
  


  /**
   * ============================================================
   * Set RequestQuote Details
   */
  public setReqQuoteDetails(data : any) : void {

    
    this.reqQuoteDetailsSubject.next(data);
    this.reqQuoteDetails = data;
    
  }

  
  

  /**
   * Return RequestQuote Details
   */
  public getReqQuoteDetails(): any {

    return this.reqQuoteDetails;
  }

  
  /**
   * Clear RequestQuote Details
   * ============================================================
   */
  public clearReqQuoteDetails(): void {
    
  }



}