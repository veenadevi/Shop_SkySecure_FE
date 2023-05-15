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
  private addFeatureUrl : string;





  constructor(
    private http: HttpClient,
    private authService : MsalService,
    private userAccountStore : UserAccountStore
  ) {
    this.baseUrl = environment.gatewayUrl;
    this.addFeatureUrl = AppService.appUrl.addFeature;

    
  }


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