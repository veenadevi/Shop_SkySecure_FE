import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import  AppService  from '../../../config/service.json';


import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

import { b2cPolicies, silentRequest } from 'src/app/auth-config';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Injectable({ providedIn: 'root' })
export class SuperAdminService {

  private baseUrlForSuperAdmin : string;


  private baseUrlForOrders : string;
  private baseURLForusers:string;

  private getAllCRMUsersUrl : string;

  private getAllChannelPartner: string;

  private assignAccountOwnerUrl : string;

  public getAccountDetailsByIdUrl : string

  private assignChannelPartnerURL: string;






  constructor(
    private http: HttpClient,
    private authService : MsalService,
    private userAccountStore : UserAccountStore
  ) {
   
    this.baseUrlForSuperAdmin = environment.gatewayUrlForOrders;

    //this.baseUrlForSuperAdmin = "http://localhost:8080/";
    this.baseUrlForOrders = environment.gatewayUrlForOrders;

    this.baseURLForusers=environment.gatewayUrlForUserProfile;



    this.getAllCRMUsersUrl = AppService.appUrl.getAllCRMUsers;
    this.getAllChannelPartner=AppService.appUrl.getAllChannelPartner;
    this.assignAccountOwnerUrl = AppService.appUrl.assignAccountOwner;
    this.getAccountDetailsByIdUrl = AppService.appUrl.getMarketplaceAccountDetailsById;
    this.assignChannelPartnerURL=AppService.appUrl.assignChannelPartnerURL
    
  }


  /**
   * Service for Getting All Accounts Details
   */

  public getAllCRMUsers() : Observable<any> {

    let url = this.baseUrlForSuperAdmin + this.getAllCRMUsersUrl;

    

    let request$ = this.http.get<Observable<any>>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          return response;
        }),
      );

    return request$;
  }


  public getAllChannelPartners() : Observable<any> {

    let url = this.baseURLForusers + this.getAllChannelPartner;

    

    let request$ = this.http.get<Observable<any>>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          return response;
        }),
      );

    return request$;
  }


  public assignChannelPartner( request : any): Observable<any> {


    const URL =  this.baseUrlForOrders + this.assignChannelPartnerURL;

  

  console.log("+++++++ ____ _ InsideCreate Quotation ", request);
    
    const REQUEST$ = this.http.post<any>(URL, request)
      .pipe(
        switchMap(response => {
          if (!response) {
            return throwError(response);
          }
          //this.userAccountStore.setUserProfileDetails(response);
          return of(response);
        }),
        map((response: any) => {
          //this.userAccountStore.setUserProfileDetails(response);
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling
          return error
        })
      );

    return REQUEST$;
  }

   /**
   * Service for Assigning Account Manager
   */

   public setAssignAccountOwner(req): Observable<any> {

    const URL = this.baseUrlForSuperAdmin + this.assignAccountOwnerUrl;

    //let URL = "http://localhost:8080/" + this.assignAccountOwnerUrl
    const OPTIONS = this.getOptions();

    //let request = null;
    
    const REQUEST$ = this.http.post<any>(URL, req, OPTIONS)
      .pipe(
        switchMap(response => {
          if (!response) {
            return throwError(response);
          }
          // this.userAccountStore.setUserProfileDetails(response);
          // //this.userAccountStore.setUserProfileDetails(response);
          return of(response);
        }),
        map((response: any) => {
          // this.userAccountStore.setUserProfileDetails(response);
          // return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling
          return error
        })
      );

    return REQUEST$;
    
  }

  /**
   * Service for Getting Lead Summary Details By ID
   */

  public getLeadSummaryDetails(id) : Observable<any> {

    //let url = this.baseUrlForSuperAdmin + this.getAccountDetailsByIdUrl + '/64f00d90eeb59d0054d5cb46';


    let url = this.baseUrlForSuperAdmin + this.getAccountDetailsByIdUrl + '/' + id;

    

    let request$ = this.http.get<Observable<any>>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          return response;
        }),
      );

    return request$;
  }


  /**
   *  Get Request for GST Details by Id
   * 
   */

  public getGSTDetailsById(id) : Observable<any> {

    //let url = this.baseUrlForSuperAdmin + this.getAccountDetailsByIdUrl + '/64f00d90eeb59d0054d5cb46';


    //let url = "https://www.knowyourgst.com/developers/gstincall";


    let url = this.baseUrlForSuperAdmin + "api/admin/fetchGSTDetails/" + id; //29ABDCS1510L1ZB"
    //let url = "http://localhost:8080/" + "api/admin/fetchGSTDetails/" + id; //29ABDCS1510L1ZB"
    //let url = "http://localhost:8080/api/admin/fetchGSTDetails/29ABDCS1510L1ZB"
    //let url = this.baseUrlForSuperAdmin + this.getAccountDetailsByIdUrl + '/' + id;



    let request$ = this.http.get<Observable<any>>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          return response;
        }),
      );

    return request$;
  }

  

    /**
   * Stages our Http Request Headers
   */

    private getOptions() : { headers: HttpHeaders } { 
 
      let token = this.userAccountStore.getAccessIdToken();
      const OPTIONS : { headers : HttpHeaders } = { 
        headers : new HttpHeaders() 
          .set('Content-Type', 'application/json') 
      }; 
   
      return OPTIONS; 
    }

  


}


   