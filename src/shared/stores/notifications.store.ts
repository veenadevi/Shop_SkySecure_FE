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
export class NotificationsStore {

   
    


    public notificationList : any ;

    private notificationListSubject = new BehaviorSubject<any>(null);
    public notificationList$ = this.notificationListSubject.asObservable();

  constructor() {
  }
  


  /**
   * ============================================================
   * Set Notifications Results
   */
  public setNotificationList(data : any) : void {

    this.notificationListSubject.next(data);

  }

  
  

  /**
   * Return Search Result Details
   */
  public getNotificationList(): any {
    return this.notificationList;
  }

  
  /**
   * Clear MetaData Collection
   * ============================================================
   */
  public clearNotificationList(): void {
    
  }



}