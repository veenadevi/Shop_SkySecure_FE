import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import AppService  from '../../config/service.json';

import { CatrgoryResponse } from '../models/interface/response/category-response';
import { ProductsResponse } from '../models/interface/response/products-response';

@Injectable({ providedIn: 'root' })
export class MetadataService {
  private baseUrl: string;
  private fetchCategoryUrl : string;
  private fetchProductsUrl : string;


  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = AppService.gatewayUrl.localhost;
    this.fetchCategoryUrl = AppService.appUrl.allCategory;
    this.fetchProductsUrl = AppService.appUrl.allProducts;

    //this.quotaDetailsUri = this.ouxConfigSvc.getAppConfigValue('apiUri').e2eQuotaACV;
  }

  //fetch All Category
  public fetchCategory(): Observable<any> {

    let url = this.baseUrl + this.fetchCategoryUrl;
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

  //fetch All Category
  public fetchProducts(): Observable<any> {

    let url = this.baseUrl + this.fetchProductsUrl;
    //let options = this.getOptions();

    let request$ = this.http.get<ProductsResponse>(url)
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


}