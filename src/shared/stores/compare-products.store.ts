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

    public compareProductsList2 : any;

    private compareProductsList2Subject = new BehaviorSubject<any>(null);
    public compareProductsList2$ = this.compareProductsList2Subject.asObservable();


    public productsCheckedList : any;

    private productsCheckedListSubject = new BehaviorSubject<any>(null);
    public productsCheckedList$ = this.productsCheckedListSubject.asObservable();

  constructor() {
  }
  


  /**
   * ============================================================
   * Set Compare Products List
   */
  public setCompareProductsList(data : any) : void {

    this.compareProductsList = data;
    // console.log("()()()()() In Store Get 1", data);
    this.compareProductsListSubject.next(data);
  }

    /**
   * ============================================================
   * Set Compare Products List 2
   */
    public setCompareProductsList2(data : any) : void {

      this.compareProductsList2 = data;
      // console.log("()()()()() In Store Get", data);
      this.compareProductsList2Subject.next(data);
    }


    /**
   * ============================================================
   * Set Products Checked List
   */
    public setProductsCheckedList(data : any) : void {

      this.productsCheckedList = data;
      this.productsCheckedListSubject.next(data);
    }

  
  

  /**
   * Return Compare Products List
   */
  public getCompareProductsList(): any {
    return this.compareProductsList;
  }

  /**
   * Return Compare Products List 2
   */
  public getCompareProductsList2(): any {
    return this.compareProductsList2;
  }

  /**
   * Get Products Checked List
   */
  public getProductsCheckedList(): any {
    return this.productsCheckedList;
  }

  
  /**
   * Clear Compare Products List
   * ============================================================
   */
  public clearCompareProductsList(): void {
    this.setCompareProductsList([]);
  }



}