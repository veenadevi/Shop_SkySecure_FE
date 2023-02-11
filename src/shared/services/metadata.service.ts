import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import AppService  from '../../config/service.json';

import { CatrgoryResponse } from '../models/interface/response/category-response';

@Injectable({ providedIn: 'root' })
export class MetadataService {
  private baseUri: string;


  constructor(
    private http: HttpClient,
  ) {
    this.baseUri = AppService.localhost.appUri + 'api/category';
    //this.quotaDetailsUri = this.ouxConfigSvc.getAppConfigValue('apiUri').e2eQuotaACV;
  }

  //fetchRefreshDate
  public fetchCategory(): Observable<any> {

    let url = this.baseUri;
    //let options = this.getOptions();

    let request$ = this.http.get<CatrgoryResponse>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          //this.orderStore.setOrderRefreshDate(response);
          console.log("&&&& Response ", response);
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }


}