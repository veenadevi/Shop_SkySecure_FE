/* Angular Import */
import { Injectable }             from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/* Feature Imports */



/**
 * Creates our Metadata State injectable
 * Feature specific stores are Angular Injectables extending the abstract OuxStore (i.e., class):
 */
@Injectable({ providedIn: 'root' })
export class CompareProductsStore {

   
    
    // public adUserDetails : any ;
    
    // private adUserDetailsSubject = new BehaviorSubject<any>(null);
    // public adUserDetails$ = this.adUserDetailsSubject.asObservable();

    public compareProductsList : any;

    private compareProductsListSubject = new BehaviorSubject<any>(null);
    public compareProductsList$ = this.compareProductsListSubject.asObservable();

  constructor() {
  }
  


  /**
   * ============================================================
   * Set Compare Products List
   */
  public setCompareProductsList(data : any) : void {

    this.compareProductsList = data;
    this.compareProductsListSubject.next(data);
  }

  
  

  /**
   * Return Compare Products List
   */
  public getCompareProductsList(): any {
    return this.compareProductsList;
  }

  
  /**
   * Clear Compare Products List
   * ============================================================
   */
  public clearCompareProductsList(): void {
    this.setCompareProductsList([]);
  }



}