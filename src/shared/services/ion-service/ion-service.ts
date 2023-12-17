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
export class IonService {


  private baseUrlForProducts : string;


  private createIonOrderUrl : string;


 
private options:{headers:HttpHeaders}

  constructor(
    private http: HttpClient,
  ) {
   
    this.baseUrlForProducts = environment.gatewayUrl;
    this.createIonOrderUrl = AppService.appUrl.createIonOrder;

    this.options = this.getOptions();
  }


  /**
   * Service for Getting All Accounts Details
   */

  public createIonOrder(req) : Observable<any> {

    //let url = this.baseUrlForSuperAdmin + this.getAllCRMUsersUrl;

    //let url = this.baseUrlForProducts + this.createIonOrderUrl;

    let url = "http://localhost:8002/" + this.createIonOrderUrl;
    
    let options = this.getOptions();
    let request$ = this.http.post<Observable<any>>(url, req, options)
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
 
      let token = localStorage.getItem("XXXXaccess__tokenXXXX");;
      const OPTIONS : { headers : HttpHeaders } = { 
        headers : new HttpHeaders() 
          .set('authorization', token) 
          .append('Content-Type', 'application/json') 
      }; 
   
      return OPTIONS; 
    }

   

}


   