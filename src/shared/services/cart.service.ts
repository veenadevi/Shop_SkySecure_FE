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
import * as CryptoJS from 'crypto-js';
const qs = require('qs');

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl: string;
  private userCartUrl : string;

  private createQuotationUrl : string;
  private editQuoatationUrl :string;

  private createInvoiceURL :string;

  public handleResponseURL : string;

  public paymentStatusByIdUrl : string
  private options:{headers:HttpHeaders}



  constructor(
    private http: HttpClient,
    private authService : MsalService,
    private userAccountStore : UserAccountStore,
    private cartStore : CartStore
  ) {
    this.baseUrl = environment.gatewayUrlForOrders;
    this.userCartUrl = AppService.appUrl.userCart;
    this.createQuotationUrl = AppService.appUrl.createQuotation;
    this.editQuoatationUrl=AppService.appUrl.editQuotation;

    this.createInvoiceURL=AppService.appUrl.createInvoice;
    this.handleResponseURL = AppService.appUrl.handleResponse;
    this.paymentStatusByIdUrl = AppService.appUrl.paymentStatusByid;
    this.options=this.getOptions();
    
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
    
    const REQUEST$ = this.http.post<any>(URL, request,this.options)
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

  public getCartItems(userData1: any): Observable<any> {

    //console.log("()()()()( )", userData);

    var userData = this.userAccountStore.getUserDetails();
 
    //let url = this.baseUrl + this.userCartUrl + '/1001';
    //let url = this.baseUrl + this.userCartUrl + '/2222';
    //let userAccountdetails = this.userAccountStore.getUserProfileDetails();

    //let url = this.baseUrl + this.userCartUrl + '/' + userAccountdetails._id;
    let url = this.baseUrl + this.userCartUrl + '/' + userData._id;

    let options = this.getOptions();

    let request$ = this.http.get<Observable<any>>(url,options)
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
    
    let productList = [];
    if(data && data.usercart.length>0){
      let tempList = data.usercart[0].userCartDetails;
      
     
  
      tempList.forEach( element=> {
        productList.push({
            "productId": element.productId,
            "quantity" : element.quantity,
            "productName" : element.productName,
            "price" : element.price ? element.price : 0,
            "erpPrice":element.erpPrice,
            "discountRate":element.discountRate,
            "priceType":element.priceType,
            "distributorPrice":element.distributorPrice,
            "priceList" : element.priceList
        })
  
      })

    }


    this.cartStore.setProductListItems(productList);
    
    //this.cartItemsSubject.next(data);

    

    
        
  }

  /**
   * Service for Creating Quotation
   */

  public createQuotation( request : any): Observable<any> {

    const URL = this.baseUrl + this.createQuotationUrl;

   // const URL = 'http://localhost:8080/api/user/createQuotation'

  //   let request = {
  //     companyName: "TestAltsys_new",
  //     userId : "640c46225cd0c77a80ce3e03",
  //     cart_ref_id :206,
  //     products: product
  
  // }


    let options = this.getOptions();
    const REQUEST$ = this.http.post<any>(URL, request, options)
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

  /**
   * Stages our Http Request Headers
   */

  private getOptions() : { headers: HttpHeaders } { 
 
    let token = localStorage.getItem("XXXXaccess__tokenXXXX");

    const OPTIONS : { headers : HttpHeaders } = { 
      headers : new HttpHeaders() 
        .set('authorization', token) 
        .append('Content-Type', 'application/json') 
    }; 
 
    return OPTIONS; 
  }



  public editQuotation( request : any): Observable<any> {


    const URL = this.baseUrl + this.editQuoatationUrl;

  


    let options = this.getOptions();
    const REQUEST$ = this.http.post<any>(URL, request, options)
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

  public createInvoice( request : any): Observable<any> {


    const URL = this.baseUrl + this.createInvoiceURL;

  


    let options = this.getOptions();
    const REQUEST$ = this.http.post<any>(URL, request, options)
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
  public trackOrderStatus(req){

        //let url = `${this.baseUrl}api/orders/encryptForCCAvenue`;
        let url = "http://localhost:8080/api/orders/getStatusResponse";
        

      
        
    
    
        let request$ = this.http.post<Observable<any>>(url, req)
        .pipe(
          map(response => {
            if (!response) {
              console.log("+_+_+_+_+_+ Vaklue here", response);
              return null;
              
            }
            return response;
          }),
        ); 
    
        return request$;
        

    
  }

  public getOrderStatus(req){


    //let url = "http://localhost:8080/api/orders/encryptForCCAvenue";
        

        let request = {
          "reference_no": "1698922729925", 
          "order_no": "1698922759496",
        }
        

        //var testUrl = "https://apitest.ccavenue.com/apis/servlet/DoWebTrans?command=orderStatusTracker&version=1.2&request_type=JSON&response_type=JSON&access_code=";
     // var testUrl = "https://test.ccavenue.com/apis/servlet/DoWebTrans";


        var testUrl = "https://apitest.ccavenue.com/apis/servlet/DoWebTrans?command=orderStatusTracker&version=1.2&request_type=JSON&response_type=JSON&access_code=AVEI22KJ67BJ07IEJB&enc_request="+req;
    
    
        let reqBody = {
          'command' : 'orderStatusTracker',
          'version' : '1.2',
          'request_type' : 'JSON',
          'response_type' : 'JSON', 
          'access_code' : 'AVEI22KJ67BJ07IEJB',
          'enc_request' : req

        }

        let testReq = {}

        let options = this.getOptions();
        let request$ = this.http.post<Observable<any>>(testUrl,reqBody)
        .pipe(
          map(response => {
            if (!response) {
              return null;
            }
            return response;
          }),
        ); 
    console.log("===request from webdransw==",request$)
        return request$;
  }

  public encryptForCCAvenue(req){
        
        //let url = `${this.baseUrl}api/orders/encryptForCCAvenue`;
        let url = "http://localhost:8080/api/orders/encryptForCCAvenue";
        

       // Request for sending CCAVenue Data for Order Numbet and Tracking Id
        let request = {
          "reference_no": 312010606393, 
          "order_no": 101125,
        }
        
    
    
        let request$ = this.http.post<Observable<any>>(url, request)
        .pipe(
          map(response => {
            if (!response) {
              console.log("+_+_+_+_+_+ Vaklue here", response);
              return null;
              
            }
            return response;
          }),
        ); 
    
        return request$;
        
  }

  public encryptdata(request, amount, ref_id){
    //let url = `${this.baseUrl}orders/encryptFormData`;
    let url = `${this.baseUrl}api/orders/encryptFormData`;
    //let url = "http://localhost:8080/api/orders/encryptFormData";
    let data = {
    request : request
    }



    //console.log("+_+_+_+_ Key Here ", request.amount);

    let key = "&&((SkysecureRealize&&For&&PaymentGateway&&!!IsTheBestApp^!@$%"
    let hashedPass = CryptoJS.AES.encrypt(amount.toFixed(2), key).toString();

    request = {
      "order_id" : ref_id,
      "currency" : "INR", // or any supported currency
      "amount" : hashedPass,
      //"redirect_url" : this.baseUrl+this.handleResponseURL,
      //"redirect_url" : "http://localhost:8080/api/orders/handleResponse",
      "redirect_url" : 'https://dev-altsys-realize-order.azurewebsites.net/api/orders/handleResponse',
      "cancel_url" : 'https://dev-shop.skysecuretech.com/',
    }
    


    let request$ = this.http.post<Observable<any>>(url, request)
    .pipe(
      map(response => {
        if (!response) {
          return null;
        }
        return response;
      }),
    ); 

    return request$;
    //return null;
    //return this.http.get(url,{params:data})
  }


  public getPaymentStatusUpdate(request){


    
    let url = this.baseUrl + this.paymentStatusByIdUrl + request;
    let options = this.getOptions()
    let request$ = this.http.get<Observable<any>>(url, options)
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

  public paymentGatewayCCAvenueRequest(request){
    
    let url = "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
   
    
    

    let options = this.getOptions();
    let request$ = this.http.post<Observable<any>>(url, request, options)
    .pipe(
      map(response => {
        if (!response) {
          return null;
        }
        return response;
      }),
    );

    return request$;
    //return this.http.get(url,{params:data})
  }


}