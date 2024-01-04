import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';


import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

import { b2cPolicies, silentRequest } from 'src/app/auth-config';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
//import Razorpay from 'razorpay';

import {ExternalLibraryService} from '../utils/utils';

declare let Razorpay: any;

@Injectable({ providedIn: 'root' })
export class PaymentGatewayService {




  private razorPayUrl : string;

  private createIonOrderUrl : string;


 
  private options:{headers:HttpHeaders}

  constructor(
    private http: HttpClient,
    private razorpayService: ExternalLibraryService
  ) {
    this.razorPayUrl = "https://api.razorpay.com/v1/"
    this.options = this.getOptions();
  }


  /**
   * Service for razor Pay Create Order
   */


  RAZORPAY_OPTIONS = {
    "key": "rzp_test_Ce8KAubc23PhY8",
    "amount": "",
    "name": "Skysecure",
    "order_id": "",
    "description": "Load Wallet",
    "image": "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
    "prefill": {
        "name": "",
        "email": "test@test.com",
        "contact": "",
        "method": ""
    },
    "modal": {},
    "theme": {
        "color": "#0096C5"
    }
  };

  public createOrder(req) : Observable<any> {


    this.razorpayService
            .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
            .subscribe(res=>{
              this.RAZORPAY_OPTIONS.amount = 100 + '00';
    
              // binding this object to both success and dismiss handler
              this.RAZORPAY_OPTIONS['handler'] =        this.razorPaySuccessHandler.bind(this);
          
              // this.showPopup();
          
              let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
              razorpay.open();
            });

    let url = this.razorPayUrl + "orders";
    

    
    console.log("+_+_+__ Orde", req);
    
    /*let request$ = this.http.post<Observable<any>>(url, req)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          return response;
        }),
      ); 

    return request$; */

    return null;
    
  }

  response;
  razorpayResponse;

  public razorPaySuccessHandler(response) {
    console.log(response);
    this.razorpayResponse = `Razorpay Response`;
    //this.showModal = true;
    document.getElementById('razorpay-response').style.display = 'block';
    //this.changeDetectorRef.detectChanges();
  }

  public test() {

    document.getElementById('response-modal').style.display = 'block';
    this.response = `dummy text`;
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


   