import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import AppService  from '../../config/service.json';

import { CatrgoryResponse } from '../models/interface/response/category-response';
import { OEMResponse } from '../models/interface/response/oem-response';
import { ProductsResponse } from '../models/interface/response/products-response';

@Injectable({ providedIn: 'root' })
export class MetadataService {
  private baseUrl: string;
  private fetchCategoryUrl : string;
  private fetchOEMUrl : string;
  private fetchProductsUrl : string;
  private fetchSubCategoriesUrl : string;
  private fetchProductsBySubCategoryIds : string;
  private fetchProductsByBrandIds : string;
  private fetchTrendingProductsUrl : string
  private getSingleProduct : string;
  private fetchProductsByFilter : string;

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = AppService.gatewayUrl.localhost;
    this.fetchCategoryUrl = AppService.appUrl.allCategory;
    this.fetchOEMUrl = AppService.appUrl.allOEM;
    this.fetchProductsUrl = AppService.appUrl.allProducts;
    this.fetchSubCategoriesUrl = AppService.appUrl.subCategoryByCategory;
    this.fetchProductsBySubCategoryIds = AppService.appUrl.getProductsBySubCategoryIds;
    this.getSingleProduct = AppService.appUrl.getSingleProduct;
    this.fetchProductsByBrandIds = AppService.appUrl.getProductsByBrandIds;
    this.fetchTrendingProductsUrl = AppService.appUrl.getTrendingProducts;
    this.fetchProductsByFilter = AppService.appUrl.getProductsByFilter;
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
          
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );
      
    return request$;
  }
//Fetch all OEM

  public fetchOEM(): Observable<any> {

    let url = this.baseUrl + this.fetchOEMUrl;
   
    //let options = this.getOptions();
    

    let request$ = this.http.get<OEMResponse>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
         
         
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );
    
    return request$;
  }

  //fetch All Products
  public fetchProducts(): Observable<any> {

    let url = this.baseUrl + this.fetchProductsUrl;
    //let options = this.getOptions();

    let request$ = this.http.get<ProductsResponse>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
   
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }

  //fetch SubCategories By Category

  public fetchSubCategories(categoryId: String): Observable<any> {

    let url = this.baseUrl + this.fetchSubCategoriesUrl + categoryId;
    //let options = this.getOptions();

    let request$ = this.http.get<Observable<any>>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
        
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }



  public fetchAllProductsBySubCategoryIds(subCategoryIds: Array<String>) : Observable<any> {
    let url = this.baseUrl + this.fetchProductsBySubCategoryIds;
    //let options = this.getOptions();

    let request$ = this.http.post(url,{subCategoryIds:subCategoryIds})
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
    
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }

  public fetchAllProductsByBrandIds(brandIds: Array<String>) : Observable<any> {
    let url = this.baseUrl + this.fetchProductsByBrandIds;
    //let options = this.getOptions();

    let request$ = this.http.post(url,{oemIds:brandIds})
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
  
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }

  public fetchSingleProductDetails(productId: string) : Observable<any> {
    let url = this.baseUrl + this.getSingleProduct + productId;
    //let options = this.getOptions();

    let request$ = this.http.get<Observable<any>>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
  
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }

  public fetchTrendingProducts(): Observable<any> {

    let url = this.baseUrl + this.fetchTrendingProductsUrl;
    //let options = this.getOptions();

    let request$ = this.http.get<Observable<any>>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
        
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

  public fetchProductsByFilters({subCategoryIds, brandIds }) : Observable<any> {
    let url = this.baseUrl + this.fetchProductsByFilter;
    //let options = this.getOptions();

    let request$ = this.http.post(url,{subCategoryIds,brandIds})
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          console.log("*******Filter Response***********",response);
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