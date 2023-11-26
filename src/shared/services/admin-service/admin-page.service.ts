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
export class AdminPageService {
  private baseUrl: string;
  private baseUrlForQuote : string;
  private baseUrlForOrders : string;
  private addFeatureUrl : string;
  private getAllDashBoardDataUrl :  string;
  private getAllAccountsUrl : string;
  private getMyAssignedAccountsUrl:string
  private getAccountsByIdUrl : string
  private baseUrlForUsers:string
  private getAllusersURL:string
  private updateUserRoleURL:string
  private getAllMarketPlaceAccountListURL:string
  private getAllChannelLeadListURL:string
  private getMyMarketPlaceAccountListURL:string
  private addChannelPartnerURL:string;
  private getAllMyCustomersUrl : String;

  private getAllUserReviewsListURL:String;

  private getAllCompanyUrl : String;


  private getCustomerDetailsByIdUrl : String;

  private addChannelPartnerUsersURL:string;

  private inviteUsersURL : string;

  private rejectReassignURL : string;

  private cpRejectReassignURL :string;

  private createProductOfferURL: String;

  private getChannelAMAccountListURL:string;
  private options:{headers:HttpHeaders}





  constructor(
    private http: HttpClient,
    private authService : MsalService,
    private userAccountStore : UserAccountStore
  ) {
    this.baseUrl = environment.gatewayUrl;
    this.baseUrlForUsers = environment.gatewayUrlForUserProfile;
    this.baseUrlForQuote = environment.gatewayUrlForOrders;
    this.addFeatureUrl = AppService.appUrl.addFeature;
    this.getAllDashBoardDataUrl = AppService.appUrl.getAllDashBoardData;
    this.getAllAccountsUrl = AppService.appUrl.getAllAccounts;
    this.getMyAssignedAccountsUrl=AppService.appUrl.getMyAssignedAccounts;
    this.getAccountsByIdUrl = AppService.appUrl.getAccountsById;
    this.getAllusersURL=AppService.appUrl.getAllUsers;
    this.updateUserRoleURL=AppService.appUrl.updateUserRole;
    this.getAllMarketPlaceAccountListURL=AppService.appUrl.getAllMarketPlaceAccountListURL;
    this.addChannelPartnerURL=AppService.appUrl.addChannelPartnerURL;
    this.getAllChannelLeadListURL=AppService.appUrl.getMyChannelLeadList;
    this.inviteUsersURL = AppService.appUrl.inviteUsers;
    this.createProductOfferURL = AppService.appUrl.createProductOffer;
    
    this.getAllMyCustomersUrl = AppService.appUrl.getAllMyCustomers;
    this.getAllCompanyUrl=AppService.appUrl.getAllCompany;
    this.getCustomerDetailsByIdUrl = AppService.appUrl.getCustomerDetailsById;
    this.rejectReassignURL = AppService.appUrl.rejectRevertLeadAsAM;
    this.cpRejectReassignURL= AppService.appUrl.rejectRevertSuperAdminAsCpAdmin;

    this.addChannelPartnerUsersURL=AppService.appUrl.addUsersToChannelURL
    //For Channel AM

    this.getChannelAMAccountListURL=AppService.appUrl.getChannelAMAccountListURL;
    this.getAllUserReviewsListURL=AppService.appUrl.getAllUserReviewsListURL
     this.options = this.getOptions();

    
  }

  /**
   * Service for Getting Admin Dashboard
   */

  public getDashboardData() : Observable<any> {

    let url = this.baseUrlForQuote + this.getAllDashBoardDataUrl;

    //let url = 'https://realize.wiremockapi.cloud/api/user/allDashBoardData'

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

  /**
   * Service for Getting All Accounts Details
   */

  public getAllMarketPlaceAccountList() : Observable<any> {

    let url = this.baseUrlForQuote + this.getAllMarketPlaceAccountListURL;

    //let url = "https://realize.wiremockapi.cloud/api/user/allAccounts";

    let request$ = this.http.get<Observable<any>>(url, this.options)
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

  public getChannelAMAccountList(channelAMuserId:any) : Observable<any> {

    let url = this.baseUrlForQuote + this.getChannelAMAccountListURL + '/' + channelAMuserId;;

    

    //let url = "https://realize.wiremockapi.cloud/api/user/allAccounts";

    let request$ = this.http.get<Observable<any>>(url,this.options)
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


  public getMyChannelLeadList(adminUserId:any) : Observable<any> {

    let url = this.baseUrlForQuote + this.getAllChannelLeadListURL + '/' + adminUserId;
    

    //let url = "https://realize.wiremockapi.cloud/api/user/allAccounts";

    let request$ = this.http.get<Observable<any>>(url,this.options)
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


  public getAllAccounts() : Observable<any> {

    let url = this.baseUrlForQuote + this.getAllAccountsUrl;

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


  public getAllusers() : Observable<any> {

    let url = this.baseUrlForUsers + this.getAllusersURL;

    //let url = "https://realize.wiremockapi.cloud/api/user/allAccounts";

    let request$ = this.http.get<Observable<any>>(url,this.options)
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

  public getMyAssignedAccounts(emailId:string) : Observable<any> {

    let url = this.baseUrlForQuote + this.getMyAssignedAccountsUrl+ '/' + emailId;

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

  /**
   * Service for Getting Accounts Details By ID
   */

  public getAccountsById(accountsId : string) : Observable<any> {

    let url = this.baseUrlForQuote + this.getAccountsByIdUrl + '/' + accountsId;

   // let url = "https://realize.wiremockapi.cloud/api/user/getAccountDetails/467371000000450104"

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

  /**
   * 
   * Service for Editing Product/Features
   * 
   */


  public addFeature( request : any): Observable<any> {

    const URL = this.baseUrl + this.addFeatureUrl;
  
    
    const REQUEST$ = this.http.post<any>(URL, request)
      .pipe(
        switchMap(response => {
          if (!response) {
            return throwError(response);
          }
          
          return of(response);
        }),
        map((response: any) => {
          
          return response;
        }),
        catchError(error => {
          
          return error
        })
      );

    return REQUEST$;
  }

  
  

  /**
   * Service to get Deals By Id
   */

  public getDealsById(accountsId : string) : Observable<any> {

    let url = this.baseUrlForQuote + this.getAccountsByIdUrl + '/' + accountsId;

    
   // let url = "https://realize.wiremockapi.cloud/api/admin/GetDealsByAccountId/467371000000378155"

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
 

  /**
   * Create Estimate Service
   */

  public createEstimate( request : any): Observable<any> {

    //const URL = this.baseUrl + this.addFeatureUrl;

    let temp = "api/admin/createZohoBooksCustomer"
  
    let URL = this.baseUrlForQuote + temp;
    
    const REQUEST$ = this.http.post<any>(URL, request)
      .pipe(
        switchMap(response => {
          if (!response) {
            return throwError(response);
          }
          
          return of(response);
        }),
        map((response: any) => {
          
          return response;
        }),
        catchError(error => {
          
          return error
        })
      );

    return REQUEST$;
  }


  /**
   * Service to Get Estimate Details https://realize.wiremockapi.cloud/api/admin/getEstimates
   */
    
  public getEstimateDetails() : Observable<any> {

    //let url = this.baseUrlForQuote + this.getAccountsByIdUrl + '/' + accountsId;

    
    let url = "https://realize.wiremockapi.cloud/api/admin/getEstimates"

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


    

  /**
   * Stages our Http Request Headers
   */

  private getOptions() : { headers: HttpHeaders } { 
 
    let token = localStorage.getItem("XXXXaccess__tokenXXXX");;
    const OPTIONS : { headers : HttpHeaders } = { 
      headers : new HttpHeaders() 
        .set('authorization', token) 
        .append('Content-Type', 'application/json') 
    }; 
 
    return OPTIONS; 
  }
 

  uploadFile(event: any) {
    // console.log("Upload File", event);
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);
    let url="https://dev-productapi.realize.skysecuretech.com/api/bulk/update-pricing"

    const uploadedFileResponse = this.http.post<any>(url, formData)
    .pipe(
      switchMap(response => {
        if (!response) {
          return (response);
        }
        
        return of(response);
      }),
      map((response: any) => {
        
        return response;
      }),
      catchError(error => {
        
        return error
      })
    );

  return uploadedFileResponse;
}

public addChannelPartner( request : any): Observable<any> {

  const URL = this.baseUrlForUsers + this.addChannelPartnerURL;



//console.log("+++++++ ____ _ addChannelPartner", request);
  
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

public addChannelPartnerUsers( request : any): Observable<any> {

  const URL = this.baseUrlForUsers + this.addChannelPartnerUsersURL;



//console.log("+++++++ ____ _ addChannelPartner", request);
  
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



public inviteUsers( request : any): Observable<any> {



  let url = this.baseUrlForUsers + this.inviteUsersURL;
  //let url="http://localhost:2003/api/user/inviteuser"

  
  let request$ = this.http.post(url, request,this.options)
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
   * Service for Fetching All Customers
   */

  public getAllMyCustomers() : Observable<any> {

    let url = this.baseUrlForUsers + this.getAllMyCustomersUrl;

    let request$ = this.http.get<Observable<any>>(url,this.options)
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

  /**
   * Service for Fetching All Customer Details By Id
   */

  public getCustomerDetailsById(id) : Observable<any> {

    //let url = this.baseUrlForQuote + this.getCustomerDetailsByIdUrl + "1014673000000483001";
    let url = this.baseUrlForQuote + this.getCustomerDetailsByIdUrl + id;

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


  public getAllCompany() : Observable<any> {

    let url = this.baseUrlForUsers + this.getAllCompanyUrl;

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


  public getProductReviewsList() : Observable<any> {

   let url = this.baseUrl + this.getAllUserReviewsListURL

    
   // let url = "https://dev-productapi.realize.skysecuretech.com/api/product-reviews"

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

  public createProductOffer( request : any): Observable<any> {



    let url = this.baseUrl + this.createProductOfferURL;
    
  
    
    let request$ = this.http.post(url, request)
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
   * Reject Reassign Service
   */

  public rejectReassign( request : any): Observable<any> {



    let url = this.baseUrlForQuote + this.rejectReassignURL;
    
  
    
    let request$ = this.http.post(url, request,this.options)
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

  public cpRejectReassign( request : any): Observable<any> {



    let url = this.baseUrlForQuote + this.cpRejectReassignURL;
    
  
    
    let request$ = this.http.post(url, request,this.options)
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


  public productEdit( request : any): Observable<any> {

    var endPoint = 'api/admin/product/edit'

    let url = this.baseUrl + endPoint;
    

    
    let request$ = this.http.patch(url, request,this.options)
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

}


   