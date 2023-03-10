import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import AppService  from '../../config/service.json';

import { CatrgoryResponse } from '../models/interface/response/category-response';
import { ProductsResponse } from '../models/interface/response/products-response';
import { OEMResponse } from '../models/interface/response/oem-response';

@Injectable({ providedIn: 'root' })
export class GlobalSearchService {
  private baseUrl: string;
  private globalSearchUrl : string;


  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = AppService.gatewayUrl.localhost;
    this.globalSearchUrl = AppService.appUrl.globalSearchByKey;

    //this.quotaDetailsUri = this.ouxConfigSvc.getAppConfigValue('apiUri').e2eQuotaACV;
  }



  //fetch All Products by search
  public fetchSearchResults(searchKey : string): Observable<any> {

    let url = this.baseUrl + this.globalSearchUrl;
    //let options = this.getOptions();
    const OPTIONS = {
        params: new HttpParams()
          .set('search', searchKey)
      };

    let request$ = this.http.get<ProductsResponse>(url, OPTIONS)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          //this.orderStore.setOrderRefreshDate(response);
          console.log("&&&& Response Products", response);
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }


  public fetchCategoryMock() : Observable<any> {
    
      return this.http.get('/assets/mock-data/category.json');
    
  }

  public fetchCartMock() : Observable<any> {
    
    return this.http.get('/assets/mock-data/cart-items.json');
  
}


}