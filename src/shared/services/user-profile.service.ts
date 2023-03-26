import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import AppService  from '../../config/service.json';

import { CatrgoryResponse } from '../models/interface/response/category-response';
import { ProductsResponse } from '../models/interface/response/products-response';
import { OEMResponse } from '../models/interface/response/oem-response';
import { MsalService } from '@azure/msal-angular';

import { b2cPolicies, silentRequest } from 'src/app/auth-config';
import { UserAccountStore } from '../stores/user-account.store';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private baseUrl: string;
  private userSignInUrl : string;
  



  constructor(
    private http: HttpClient,
    private authService : MsalService,
    private userAccountStore : UserAccountStore
  ) {
    this.baseUrl = AppService.gatewayUrlForUserProfile.localhost;
    this.userSignInUrl = AppService.appUrl.userSignin;
    
    
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