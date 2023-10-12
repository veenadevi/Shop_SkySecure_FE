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
export class SuperAdminStore {

    public crmUsers : any;


    private crmUsersSubject = new BehaviorSubject<any>(null);

    private channelPartnerSubject=new BehaviorSubject<any>(null);
    private myChannelAMListSubject=new BehaviorSubject<any>(null);

    public channelPartnerList : any;
    public myChannelAMList:any;
    
    public channelPartnerList$=this.channelPartnerSubject.asObservable();
    public myChannelAMList$=this.myChannelAMListSubject.asObservable();

    

    public crmUsers$ = this.crmUsersSubject.asObservable();


  constructor() {
  }
  

  /**
   * ============================================================
   * Set CRM Users
   */
   public setCrmUsers(data : any) : void {
    

    this.crmUsersSubject.next(data);

    

  }

  public setChannelPartnerList(data : any) : void {
    

    this.channelPartnerSubject.next(data);

    

  }


  public setMyChannelPartnerAMList(data : any) : void {
    

    this.myChannelAMListSubject.next(data);

    

  }
  
  
  
  /**
   * Return Crm Users
   */
   public getCrmUsers(): any {
    return this.crmUsers;
  }
  public getChannelPartnerList(): any {
    return this.channelPartnerList;
  }

  public getMyChannelPartnerAMList(): any {
    return this.myChannelAMList;
  }
  
  /**
   * Clear Cart 
   * ============================================================
   */
  public clearCrmUsers(): void {
    
  }



}