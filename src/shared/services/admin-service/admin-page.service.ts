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
export class AdminPageService {
  private baseUrl: string;
  private baseUrlForQuote : string;
  private addFeatureUrl : string;
  private getAllDashBoardDataUrl :  string;
  private getAllAccountsUrl : string;
  private getAccountsByIdUrl : string





  constructor(
    private http: HttpClient,
    private authService : MsalService,
    private userAccountStore : UserAccountStore
  ) {
    this.baseUrl = environment.gatewayUrl;
    this.baseUrlForQuote = environment.gatewayUrlForOrders;
    this.addFeatureUrl = AppService.appUrl.addFeature;
    this.getAllDashBoardDataUrl = AppService.appUrl.getAllDashBoardData;
    this.getAllAccountsUrl = AppService.appUrl.getAllAccounts;
    this.getAccountsByIdUrl = AppService.appUrl.getAccountsById;

    
  }

  /**
   * Service for Getting Admin Dashboard
   */

  public getDashboardData() : Observable<any> {

    let url = this.baseUrlForQuote + this.getAllDashBoardDataUrl;

    //let url = 'https://realize.wiremockapi.cloud/api/user/allDashBoardData'

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
   * Service for Getting All Accounts Details
   */

  public getAllAccounts() : Observable<any> {

    let url = this.baseUrlForQuote + this.getAllAccountsUrl;

    //let url = "https://realize.wiremockapi.cloud/api/user/allAccounts";

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
   * Service for Getting Accounts Details By ID
   */

  public getAccountsById(accountsId : string) : Observable<any> {

    let url = this.baseUrlForQuote + this.getAccountsByIdUrl + '/' + accountsId;

   // let url = "https://realize.wiremockapi.cloud/api/user/getAccountDetails/467371000000450104"

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
   * 
   * Service for Editing Product/Features
   * 
   */


  public addFeature( request : any): Observable<any> {

    const URL = this.baseUrl + this.addFeatureUrl;
  
    
    const REQUEST$ = this.http.post<any>(URL, request)
      .pipe(
        switchMap(response => {
          if (!response) {
            return throwError(response);
          }
          
          return of(response);
        }),
        map((response: any) => {
          
          return response;
        }),
        catchError(error => {
          
          return error
        })
      );

    return REQUEST$;
  }

  
  

  /**
   * Service to get Deals By Id
   */

  public getDealsById(accountsId : string) : Observable<any> {

    let url = this.baseUrlForQuote + this.getAccountsByIdUrl + '/' + accountsId;

    
   // let url = "https://realize.wiremockapi.cloud/api/admin/GetDealsByAccountId/467371000000378155"

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
   * Create Estimate Service
   */

  public createEstimate( request : any): Observable<any> {

    //const URL = this.baseUrl + this.addFeatureUrl;

    let temp = "api/admin/createZohoBooksCustomer"
  
    let URL = this.baseUrlForQuote + temp;
    
    const REQUEST$ = this.http.post<any>(URL, request)
      .pipe(
        switchMap(response => {
          if (!response) {
            return throwError(response);
          }
          
          return of(response);
        }),
        map((response: any) => {
          
          return response;
        }),
        catchError(error => {
          
          return error
        })
      );

    return REQUEST$;
  }


  /**
   * Service to Get Estimate Details https://realize.wiremockapi.cloud/api/admin/getEstimates
   */
    
  public getEstimateDetails() : Observable<any> {

    //let url = this.baseUrlForQuote + this.getAccountsByIdUrl + '/' + accountsId;

    
    let url = "https://realize.wiremockapi.cloud/api/admin/getEstimates"

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
        .set('authorization', token) 
        .append('Content-Type', 'application/json') 
    }; 
 
    return OPTIONS; 
  }

 

  uploadFile(event: any) {
    console.log("Upload File", event);
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);
    let url="https://dev-productapi.realize.skysecuretech.com/api/bulk/update-pricing"

    const uploadedFileResponse = this.http.post<any>(url, formData)
    .pipe(
      switchMap(response => {
        if (!response) {
          return (response);
        }
        
        return of(response);
      }),
      map((response: any) => {
        
        return response;
      }),
      catchError(error => {
        
        return error
      })
    );

  return uploadedFileResponse;
}


}


   