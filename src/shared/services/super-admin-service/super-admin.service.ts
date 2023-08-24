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

  private getAllCRMUsersUrl : string






  constructor(
    private http: HttpClient,
    private authService : MsalService,
    private userAccountStore : UserAccountStore
  ) {
   
    this.baseUrlForSuperAdmin = environment.gatewayUrlForOrders;
    this.getAllCRMUsersUrl = AppService.appUrl.getAllCRMUsers;
    
  }


  /**
   * Service for Getting All Accounts Details
   */

  public getAllCRMUsers() : Observable<any> {

    let url = this.baseUrlForSuperAdmin + this.getAllCRMUsersUrl;

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

  


}


   