import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
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

  constructor(
    private userAccountStore : UserAccountStore,
    private requestQuoteDetailsStore : RequestQuoteDetailsStore
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
    console.log("+_+_+_ Req Body", this.finalReq);
  }

  public setReqBody(){

    let storeDetails = this.requestQuoteDetailsStore.getReqQuoteDetails();
    let userDetails = this.userAccountStore.getUserDetails();

    this.finalReq = this.reqBody;

    console.log("+_+_+_ STore Details", storeDetails);
    this.finalReq['updatedBy'] = userDetails._id;
    this.finalReq['billing_address'] = storeDetails.billing_address;
    
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
    this.finalReq['RequestingForOther'] = (storeDetails.gstType === 'self') ? true : false;
    this.finalReq['currency_id'] = "1014673000000000064";
    



/*
    "currency_id": "1014673000000000064",
    "selectedChannelPartnerId": "654b346f8bddb500715ba10d",
    "selectedChannelPartnerAdminId": "654b2d8e8bddb500715b9fbc",
    "RequestingForOther": false,
    "contact_persons": [
        {
            "first_name": "Vignesh S",
            "email": "vignesh@skysecuretech.com",
            "phone": "8072316022",
            "is_primary_contact": true,
            "enable_portal": false
        }
    ],
    "gst_no": "29ABDCS1510L1ZB",
    "gst_treatment": "business_gst"
   
     req.gst_treatment = "business_none";
   

    */



   
    
  }
}
