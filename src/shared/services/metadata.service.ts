import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import AppService  from '../../config/service.json';
import { environment } from 'src/environments/environment';

import { CatrgoryResponse } from '../models/interface/response/category-response';
import { OEMResponse } from '../models/interface/response/oem-response';
import { ProductsResponse } from '../models/interface/response/products-response';
import { MetadataStore } from '../stores/metadata.store';
import { NotificationsStore } from '../stores/notifications.store';


@Injectable({ providedIn: 'root' })
export class MetadataService {
  private baseUrl: string;
  private baseUrlUsers : string;
  private fetchCategoryUrl : string;
  private fetchOEMUrl : string;
  private fetchProductsUrl : string;
  private fetchSubCategoriesUrl : string;
  private fetchProductsBySubCategoryIds : string;
  private fetchProductsByBrandIds : string;
  private fetchTrendingProductsUrl : string
  private getSingleProduct : string;
  private getSingleProductDetails : string;
  private fetchSignleBrandDetailsUrl : string;
  private fetchProductsByFilter : string;
  private fetchProductBundleVariantDetailsUrl:string;
  private fetchCompareProductsListUrl:string;
  private fetchProductByProductVariant:string;
  private fetchAllSubcategory : string;
  private fetchAdminProductDetailsUrl:string;
  private customerSupportUrl : string;
  private getUserNotificationsUrl : string;
  private createProductReviewUrl : string;
  private fetchProductReviewUrl : string;


  constructor(
    private http: HttpClient,
    private metadataStore : MetadataStore,
    private notificationStore : NotificationsStore
  ) {
    this.baseUrl = environment.gatewayUrl;
    this.baseUrlUsers = environment.gatewayUrlForUserProfile;
    this.fetchCategoryUrl = AppService.appUrl.allCategory;
    this.fetchOEMUrl = AppService.appUrl.allOEM;
    this.fetchProductsUrl = AppService.appUrl.allProducts;
    this.fetchSubCategoriesUrl = AppService.appUrl.subCategoryByCategory;
    this.fetchProductsBySubCategoryIds = AppService.appUrl.getProductsBySubCategoryIds;
    this.getSingleProduct = AppService.appUrl.getSingleProduct;
    this.getSingleProductDetails=AppService.appUrl.getSingleProductDetails;
    this.fetchProductsByBrandIds = AppService.appUrl.getProductsByBrandIds;
    this.fetchTrendingProductsUrl = AppService.appUrl.getTrendingProducts;
    this.fetchProductsByFilter = AppService.appUrl.getProductsByFilter;
    this.fetchSignleBrandDetailsUrl = AppService.appUrl.getSingleBrandDetails;
    this.fetchProductByProductVariant = AppService.appUrl.getByProdyctVariant;
    //this.quotaDetailsUri = this.ouxConfigSvc.getAppConfigValue('apiUri').e2eQuotaACV;
    this.fetchProductBundleVariantDetailsUrl = AppService.appUrl.getProductBundleVariant;
    this.fetchCompareProductsListUrl = AppService.appUrl.fetchCompareProductsListUrl
    this.fetchAllSubcategory = AppService.appUrl.allSubcategory;
    this.fetchAdminProductDetailsUrl=AppService.appUrl.fetchAdmingProduct;
    this.customerSupportUrl = AppService.appUrl.customerSupport;
    this.getUserNotificationsUrl = AppService.appUrl.getUserNotifications;
    this.createProductReviewUrl = AppService.appUrl.createProductReviewURL;
    this.fetchProductReviewUrl = AppService.appUrl.getProductReviewURL;
  }

  //fetch All Category
  public fetchCategory(): Observable<any> {

    let url = this.baseUrl + this.fetchCategoryUrl;
    //let options = this.getOptions();
    

    let request$ = this.http.get<any>(url)
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
    

    let request$ = this.http.get<any>(url)
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
    let url = this.baseUrl + this.getSingleProductDetails + productId;
    //let options = this.getOptions();

    // return this.http.get(url)
    // .pipe(
    //   map(res => {

    //     console.log("############ REs", res);

    //     return res;
        
    //   }) );

    let request$ = this.http.get<any>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          this.metadataStore.setIndividualProductDetail(response);
          return (response);
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }

  public fetchProductByProductVariantId(productId: string) : Observable<any> {
    let url = this.baseUrl + this.fetchProductByProductVariant + productId;
  
    let request$ = this.http.get<any>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          this.metadataStore.setIndividualProductDetail(response);
          return (response);
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }



  public fetchSingleBrandDetails(id: string) : Observable<any> {
    //id = "63eb236c53c21de2f6841bca";
    let url = this.baseUrl+ this.fetchSignleBrandDetailsUrl + String(id);

    //let url = "http://localhost:8002/api/bundle/63eb236c53c21de2f6841bca";
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
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }
  public fetchSingleProductBundleVariantDetails(id: string) : Observable<any> {
    //id = "63eb236c53c21de2f6841bca";
    let url = this.baseUrl+ this.fetchProductBundleVariantDetailsUrl + String(id);

    //let url = "http://localhost:8002/api/bundle/63eb236c53c21de2f6841bca";
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

  public fetchCompareProductsList(paylad: any) : Observable<any> {
    let url = this.baseUrl+ this.fetchCompareProductsListUrl;
    let request$ = this.http.post(url,paylad)
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

    return request$;
  }

  public fetchSubCategory(): Observable<any> {

    let url = this.baseUrl + this.fetchAllSubcategory;
    //let options = this.getOptions();
    

    let request$ = this.http.get<any>(url)
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

  public fetchAdminProductDetails(id: string) : Observable<any> {
    //id = "63eb236c53c21de2f6841bca";
    let url = this.baseUrl+ this.fetchAdminProductDetailsUrl + String(id);
    console.log("fetch API"+url)

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

  /**
   * Customer Enquiry Service
   */
  public sendCustomerSupport(req) : Observable<any> {
    let url = this.baseUrlUsers + this.customerSupportUrl;
    //let options = this.getOptions();

    let request$ = this.http.post(url,req)
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


  /**
   * Service for Fetching Notifications
   */

  public getUserNotifications(id: string) : Observable<any> {
    //id = "63eb236c53c21de2f6841bca";
    let url = this.baseUrlUsers+ this.getUserNotificationsUrl + '/' + String(id);


    let request$ = this.http.get<Observable<any>>(url)
      .pipe(
          map(response => {
            if (!response) {
              return null;
            }
            this.notificationStore.setNotificationList(response);
            console.log("_+_+_+_ Retreive Notifications ", response)
            return response;
          }),
          catchError(error => {
            // create operation mapping for http exception handling 
            return (error);
          })
        );

      return request$;
    }



    
  /**
   * Update Product Review
   */

  public createProductReview(productReviewPayload) : Observable<any> {
    //id = "63eb236c53c21de2f6841bca";
    let url = this.baseUrlUsers+ this.createProductReviewUrl;


    let request$ = this.http.post(url,productReviewPayload)
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


    
  /**
   *  Fetch Product Review By Id
   */

  public getProductReviewById(id: string) : Observable<any> {

    let url = this.baseUrlUsers+ this.fetchProductReviewUrl + '/' + String(id);


    let request$ = this.http.get<Observable<any>>(url)
      .pipe(
          map(response => {
            if (!response) {
              return null;
            }
            console.log("____TEST____",response);
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