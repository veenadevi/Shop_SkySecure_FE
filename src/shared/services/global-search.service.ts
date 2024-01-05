import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import AppService  from '../../config/service.json';
import { environment } from 'src/environments/environment';

import { CatrgoryResponse } from '../models/interface/response/category-response';
import { ProductsResponse } from '../models/interface/response/products-response';
import { OEMResponse } from '../models/interface/response/oem-response';

@Injectable({ providedIn: 'root' })
export class GlobalSearchService {
  private baseUrl: string;
  private globalSearchUrl : string;

  private globalSearchByProduct : string;


  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = environment.gatewayUrl;
    this.globalSearchUrl = AppService.appUrl.globalSearchByKey;
    this.globalSearchByProduct = AppService.appUrl.globalSearchByProducts;

    //this.quotaDetailsUri = this.ouxConfigSvc.getAppConfigValue('apiUri').e2eQuotaACV;
  }





  //fetch All Products by search
  public fetchSearchResults(searchKey : string): Observable<any> {

    let url = this.baseUrl + this.globalSearchUrl;
    //let url = "http://localhost:8002/" + this.globalSearchUrl;
    //let options = this.getOptions();
    const OPTIONS = {
        params: new HttpParams()
          .set('search', searchKey)
      };

    let request$ = this.http.get<any>(url, OPTIONS)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          //this.orderStore.setOrderRefreshDate(response);
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }

    //fetch Only Products by search
    public fetchSearchResultsByProducts(searchKey : string): Observable<any> {

      //seachByproduct
      let url = this.baseUrl + this.globalSearchByProduct;
      //let options = this.getOptions();
      const OPTIONS = {
          params: new HttpParams()
            .set('search', searchKey)
        };
  
      let request$ = this.http.get<any>(url, OPTIONS)
        .pipe(
          map(response => {
            if (!response) {
              return null;
            }
            //this.orderStore.setOrderRefreshDate(response);
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