import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';


import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

import { b2cPolicies, silentRequest } from 'src/app/auth-config';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import Razorpay from 'razorpay';

@Injectable({ providedIn: 'root' })
export class PaymentGatewayService {




  private razorPayUrl : string;

  private createIonOrderUrl : string;


 
  private options:{headers:HttpHeaders}

  constructor(
    private http: HttpClient,
  ) {
    this.razorPayUrl = "https://api.razorpay.com/v1/"
    this.options = this.getOptions();
  }


  /**
   * Service for razor Pay Create Order
   */

  public createOrder(req) : Observable<any> {


    let url = this.razorPayUrl + "orders";
    

    
    console.log("+_+_+__ Orde", req);
    
    let request$ = this.http.post<Observable<any>>(url, req)
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

   

}


   