import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import AppService  from '../../config/service.json';

import { CatrgoryResponse } from '../models/interface/response/category-response';
import { ProductsResponse } from '../models/interface/response/products-response';
import { OEMResponse } from '../models/interface/response/oem-response';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

import { b2cPolicies, silentRequest } from 'src/app/auth-config';
import { UserAccountStore } from '../stores/user-account.store';
import { UserCartRequest } from '../models/interface/request/user-cart.request';
import { UserCartRequestModel } from '../models/concrete/user-cart.model';
import { CartStore } from '../stores/cart.store';

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl: string;
  private userCartUrl : string;



  constructor(
    private http: HttpClient,
    private authService : MsalService,
    private userAccountStore : UserAccountStore,
    private cartStore : CartStore
  ) {
    this.baseUrl = environment.gatewayUrlForOrders;
    this.userCartUrl = AppService.appUrl.userCart;

    
  }


  public addCartItems( request : UserCartRequest): Observable<any> {

    const URL = this.baseUrl + this.userCartUrl;
    //const OPTIONS = this.getOptions();



    // let re = new UserCartRequestModel({
    //     userId : "12345",
    //     createdBy : "ADMIN",
    //     products : [{
    //         "productId":"6408c67ebc262d784813b71f",
    //         "quantity" :4
    //     }
    //     ]
    //   })
    
    const REQUEST$ = this.http.post<any>(URL, request)
      .pipe(
        switchMap(response => {
          if (!response) {
            return throwError(response);
          }
          //this.userAccountStore.setUserProfileDetails(response);
          return of(response);
        }),
        map((response: any) => {
          //this.userAccountStore.setUserProfileDetails(response);
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling
          return error
        })
      );

    return REQUEST$;
  }

  public getCartItems(userData: any): Observable<any> {

  
    console.log("****** Cart Items Data ", userData);
 
    //let url = this.baseUrl + this.userCartUrl + '/1001';
    //let url = this.baseUrl + this.userCartUrl + '/2222';
    let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    console.log("************ Userdeatils ", this.userAccountStore.getUserProfileDetails());
    let url = this.baseUrl + this.userCartUrl + '/' + userAccountdetails._id;
    //let options = this.getOptions();

    let request$ = this.http.get<Observable<any>>(url)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          this.cartStore.setCartRefreneceId(response);
          this.cartStore.setCartItems(response);
          //this.cartStore.setProductList(response);
          this.setProductList(response);
         
          return response;
        }),
      );

    return request$;
  }


  public setProductList(data : any) : void {
    
    let tempList = data.usercart[0].userCartDetails;
    let productList = [];
   

    tempList.forEach( element=> {
      productList.push({
          "productId": element.productId,
          "quantity" : element.quantity,
          "productName" : element.productName
      })

    })

    this.cartStore.setProductListItems(productList);
    
    //this.cartItemsSubject.next(data);

    

    
        
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