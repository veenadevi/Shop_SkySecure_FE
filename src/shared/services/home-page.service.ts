import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import AppService  from '../../config/service.json';

// import { QuotaDetailsModel } from '../models/concrete/partials/get-e2e-quota-acv.model';
// import { QuotaDetails } from '../models/interface/partials/quota-details';
// import { QuotaDetailsResponse } from '../models/interface/response/quota-details-response';
// import { QuotaDetailsStore } from '../stores/quota-details.store';
// import { UserDetailsStore } from '../stores/user-details.store';

@Injectable({ providedIn: 'root' })
export class HomePageService {
  private baseUri: string;


  constructor(
    private http: HttpClient,
  ) {
    this.baseUri = AppService.localhost.appUri;
    //this.quotaDetailsUri = this.ouxConfigSvc.getAppConfigValue('apiUri').e2eQuotaACV;
  }

  public fetchData(){
    console.log("****** this.base", this.baseUri);
  }

  /*public fetchData(): Observable<QuotaDetails> {
    const URL = `${this.baseUri}${this.quotaDetailsUri}`;
    const OPTIONS = this.getOptions();

    const REQUEST$ = this.http.get<QuotaDetailsResponse>(URL, OPTIONS)
      .pipe(
        switchMap(response => {
          if (!response || !response.success) {
            return throwError(response);
          }

          return of(response);
        }),
        map( (response : QuotaDetailsResponse) => {          
          let typed = response.data ? new QuotaDetailsModel(response.data) : null;

          return typed;
        }),
        tap( (typed : QuotaDetails) => {
          // pass data to corresponding payment details store for further processing
          this.quotaDetailsStore.setQuotaDetailsData(typed);
          this.ouxLoggerSvc.logDebug('QuotaDetailsService: fetchData()', typed);
        }),
        catchError(error => {
          // create operation mapping for http exception handling
          return this.ouxHandleError('fetchData', error)(error);
        })
      );

    return REQUEST$;
  }*/

  /**
   * Stages our Http Request Headers
   */
   
  /*private getOptions() : { headers: HttpHeaders, params : HttpParams } {

    const OPTIONS : { headers : HttpHeaders, params : HttpParams } = {
      headers : new HttpHeaders()
        .set('Authorization', this.ouxAuthSvc.getAuthToken())
        .append('Content-Type', 'application/json'),
      params : new HttpParams()
        .set('loggedmail', this.userDetailsStore.getUserId())
        .append('loginId', this.userDetailsStore.getUserId())
        .append('empmail', this.userDetailsStore.getImpersonationUserId())
        .append('userName', this.userDetailsStore.getImpersonationUserId())
    }

    return OPTIONS;
  }*/

}