import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import AppService  from '../../config/service.json';
import { environment } from 'src/environments/environment';

import { CatrgoryResponse } from '../models/interface/response/category-response';
import { ProductsResponse } from '../models/interface/response/products-response';
import { OEMResponse } from '../models/interface/response/oem-response';
import { MsalService } from '@azure/msal-angular';

import { b2cPolicies, silentRequest } from 'src/app/auth-config';
import { UserAccountStore } from '../stores/user-account.store';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private baseUrl: string;
  private baseUrlForQuote : string;
  private userSignInUrl : string;
  private profileUpdateUrl : string;
  private getQuotationUrl : string;
  



  constructor(
    private http: HttpClient,
    private authService : MsalService,
    private userAccountStore : UserAccountStore
  ) {
    
    this.baseUrl = environment.gatewayUrlForUserProfile;
    this.userSignInUrl = AppService.appUrl.userSignin;
    this.profileUpdateUrl = AppService.appUrl.profileUpdate;
    this.getQuotationUrl = AppService.appUrl.getQuoteHistory;
    this.baseUrlForQuote = environment.gatewayUrlForOrders;
    
    
  }


  public accessIdToken$ = this.userAccountStore.accessIdToken$
  .pipe(
    map(data => {
      if(data){
        return data;
      }
      else{
        return data;
      }
    }
    )
  )




  public fetchUserProfile(): Observable<any> {

    const URL = this.baseUrl + this.userSignInUrl;
    const OPTIONS = this.getOptions();

    let request = null;
    
    const REQUEST$ = this.http.post<any>(URL, request, OPTIONS)
      .pipe(
        switchMap(response => {
          if (!response) {
            return throwError(response);
          }
          this.userAccountStore.setUserProfileDetails(response);
          //this.userAccountStore.setUserProfileDetails(response);
          return of(response);
        }),
        map((response: any) => {
          this.userAccountStore.setUserProfileDetails(response);
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
   * Service to update User Profile
   */

  public updateUserProfile(req): Observable<any> {

    const URL = this.baseUrl + this.profileUpdateUrl;
    const OPTIONS = this.getOptions();

    let request = req;
    
    const REQUEST$ = this.http.patch<any>(URL, request, OPTIONS)
      .pipe(
        switchMap(response => {
          if (!response) {
            return throwError(response);
          }
          this.userAccountStore.setUserProfileDetails(response);
          //this.userAccountStore.setUserProfileDetails(response);
          return of(response);
        }),
        map((response: any) => {
          this.userAccountStore.setUserProfileDetails(response);
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling
          return error;
        })
      );

    return REQUEST$;
  }

  /**
   * Fetch QUotation History
   */

  public getQuotationHistory(): Observable<any> {

  
    
    
    
    let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    

    
    let url = this.baseUrlForQuote + this.getQuotationUrl + '/' + userAccountdetails._id;
    //let url = this.baseUrlForQuote + this.getQuotationUrl + '/640f59c83d2d10005c34023e';
    

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
   * Service to Trigger Email
   */
  public sendEmailRequest(): Observable<any> {

    
    let url = "https://graph.microsoft.com/v2.0/me/sendMail"
    //let url = this.baseUrlForQuote + this.getQuotationUrl + '/640f59c83d2d10005c34023e';
    const OPTIONS = this.getOptions();

    let request = {
      "message": {
        "subject": "Testing",
        "body": {
          "contentType": "Text",
          "content": "The email is Triggerred"
        },
        "toRecipients": [
          {
            "emailAddress": {
              "address": "vigneshblog4@gmail.com"
            }
          }
        ],
        "ccRecipients": [
          {
            "emailAddress": {
              "address": "vignesh@skysecuretech.com"
            }
          }
        ]
      },
      "saveToSentItems": "false"
    }

    const REQUEST$ = this.http.post<any>(url, request, OPTIONS)
      .pipe(
        switchMap(response => {
          if (!response) {
            return throwError(response);
          }
          this.userAccountStore.setUserProfileDetails(response);
          //this.userAccountStore.setUserProfileDetails(response);
          return of(response);
        }),
        map((response: any) => {
          this.userAccountStore.setUserProfileDetails(response);
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


  


}