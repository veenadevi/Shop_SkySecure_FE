import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Subscription, map } from 'rxjs';
import { CartService } from 'src/shared/services/cart.service';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { RequestQuoteDetailsStore } from 'src/shared/stores/request-quote-details.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{

  @Input('reqBody')
  public reqBody : any;

  public finalReq : any;

  public subscriptions : Subscription[] = [];

  constructor(
    private userAccountStore : UserAccountStore,
    private requestQuoteDetailsStore : RequestQuoteDetailsStore,
    private spinner : NgxSpinnerService,
    private cartService : CartService,
    private cartStore : CartStore,
    private router : Router,
    private toaster : ToasterNotificationService,
    private userProfileService : UserProfileService
  ){}


  private reqBody$ = this.requestQuoteDetailsStore.reqQuoteDetails$
  .pipe(
    map(data => {
      if(data){
        //this.setReqBody();
        return data;
      }
      else{
        return data;
      }
    }
    )
  )

  ngOnInit(): void {
    this.reqBody$.subscribe();
  }

  public createQuotation(){
    this.setReqBody();

    this.spinner.show();
    
    this.subscriptions.push(
      this.cartService.createQuotation(this.finalReq).subscribe( response => {
        this.spinner.hide();
        if(response && response.UserCart){
          this.updateGSTService(this.finalReq);
            
            this.cartStore.setCartRefreneceId(null);
            this.cartService.getCartItems(null).subscribe();
            
            this.router.navigate(['/user-profile/quotation-history']);
            
            
            
          
          
        }
        else{
          
        }
        
      },
      error => {
        this.spinner.hide();
        this.toaster.showWarning("Some Error Occurred! Please try again after sometime.",'')
      }
      ),
    
      
    )  
    
  }

  public updateGSTService(req){

    

       
      let userDetails = this.userAccountStore.getUserDetails();

      let request = {

        "email": req.emailId,
        "isRegistered": (req.gst_treatment === "business_gst") ? true : false,
        //"gstinNumber":"ABCDEG78101",
        "companyBusinessName":req.companyName,
        "placeOfSupply": req.billing_address.state_code,
          "fullAddress" : [
                {
                    "address1" : req.billing_address.address,
                    "address2" : req.billing_address.street2,
                    //"state" : this.selectedState.name,
                    "state" :   req.billing_address.state_code,
                    "district" : req.billing_address.city,
                    "pincode" : req.billing_address.zip,
                    //"countryCode" : this.selectedState.isoCode,
                    "countryCode" : "IN",
                }
            ],
        
        
          "updatedBy": userDetails._id,
          "isCustomer":true,
        
        }

        if(req.gst_treatment === "business_gst"){
          request["gstinNumber"] = req.gst_no ;
        }


      console.log("+_+_+_+_ Updated GST", request);


        this.subscriptions.push(
        this.userProfileService.updateGST(request).subscribe( response => {
          
        })
      )
  }

  public setReqBody(){

    let storeDetails = this.requestQuoteDetailsStore.getReqQuoteDetails();
    let userDetails = this.userAccountStore.getUserDetails();

    this.finalReq = this.reqBody;

    console.log("+_+_+_ STore Details", storeDetails);
    this.finalReq['updatedBy'] = userDetails._id;
    this.finalReq['billing_address'] = storeDetails.billing_address;

    this.finalReq.companyName = storeDetails.companyName;
    
    if(storeDetails.gstType === 'self'){
      this.finalReq['contact_persons'] = [
        {
          "first_name": userDetails.firstName,
          "email": userDetails.email,
          "phone": userDetails.mobileNumber ? userDetails.mobileNumber : '',
          "is_primary_contact": true,
          "enable_portal": false
        }
      ]

    }
    else{
      this.finalReq['contact_persons'] = [
        {
          "first_name": storeDetails.name,
          "email": storeDetails.emailId,
          "phone": storeDetails.phoneNo,
          "is_primary_contact": true,
          "enable_portal": false
        }
      ]
    }

    this.finalReq['gst_no'] = storeDetails.gstNo;
    this.finalReq['gst_treatment'] = (storeDetails.gstFlag) ? 'business_gst' : 'business_none';
    this.finalReq['RequestingForOther'] = (storeDetails.gstType === 'self') ? false : true;
    this.finalReq['currency_id'] = "1014673000000000064";

    this.finalReq['selectedChannelPartnerId'] = "654b346f8bddb500715ba10d";
    this.finalReq['selectedChannelPartnerAdminId'] = "654b2d8e8bddb500715b9fbc";

   
    







   
    
  }

 
}
