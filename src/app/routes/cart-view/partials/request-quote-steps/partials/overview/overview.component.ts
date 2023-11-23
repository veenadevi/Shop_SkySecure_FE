import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  @Input('cartData')
  public cartData:any

  public finalReq : any;

  public subscriptions : Subscription[] = [];
  public visible: boolean = false;


  public isAcceptChecked: boolean = false;
  public isDeclinedChecked: boolean = false;

  public tandcCheckBox : boolean = false;

  public tandcCheckBoxErrorMessage:boolean=false;


  public dataPresent : boolean = false;

  public disabledFlag : boolean = true;

  @Output() overViewAction = new EventEmitter();
  @ViewChild('form') form: ElementRef;



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
    this.reqBody$.subscribe(res=>{
      this.setReqBody();
    });
  }

  

  public createQuotation(){


    //console.log("+_+_+_+_+ This", this.finalReq);

    if(!this.tandcCheckBox){
      //console.log("Inside create quation", this.finalReq);
      
    this.tandcCheckBoxErrorMessage = true;

    }
     else{
      if(this.tandcCheckBox)
     // console.log("Insideelse if part");
      this.tandcCheckBoxErrorMessage = false;
    
      this.spinner.show();
      
      this.subscriptions.push(
        this.cartService.createQuotation(this.finalReq).subscribe( response => {
          this.spinner.hide();
          if(response && response.UserCart){
         //   this.updateGSTService(this.finalReq);
              
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


    


        this.subscriptions.push(
        this.userProfileService.updateGST(request).subscribe( response => {
          
        })
      )
  }

  public setReqBody(){

    let storeDetails = this.requestQuoteDetailsStore.getReqQuoteDetails();
    let userDetails = this.userAccountStore.getUserDetails();

    this.finalReq = this.reqBody;

   
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

      this.finalReq.billing_address.phone = userDetails.mobileNumber;

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
      this.finalReq.billing_address.phone = storeDetails.phoneNo;
    }

    this.finalReq['gst_no'] = storeDetails.gstNo;
    this.finalReq['gst_treatment'] = (storeDetails.gstFlag) ? 'business_gst' : 'business_none';
    this.finalReq['RequestingForOther'] = (storeDetails.gstType === 'self') ? false : true;
    this.finalReq['currency_id'] = "1014673000000000064";

    this.finalReq['selectedChannelPartnerId'] = storeDetails.selectedChannelPartnerId;
    this.finalReq['selectedChannelPartnerAdminId'] = storeDetails.selectedChannelPartnerAdminId;
    this.finalReq['selectedChannelPartnerName'] = storeDetails.selectedChannelPartnerName;
    this.finalReq['leadStatusUpdate'] = 'ChannalPartner Assigned';

    this.dataPresent = true;
    
  }

  showDialog() {
    this.visible = true;
  }

  public checkboxChanged(val){

    this.disabledFlag = !(this.isAcceptChecked || this.isDeclinedChecked   );
    if(val === 0   && this.isAcceptChecked ){
      //console.log("Inside If")
      this.isAcceptChecked = true;
      this.isDeclinedChecked = false;
      this.tandcCheckBox = true;
    //  this.disabledFlag = true;
    }
    else{
      //console.log("Inside else")
      this.isAcceptChecked = false;
      this.isDeclinedChecked = true;
      this.tandcCheckBox = false;
      this.disabledFlag = true;
    }
    this.visible = false;
  }

  public goBack(){

    let storeDetails = this.requestQuoteDetailsStore.getReqQuoteDetails();
    if(storeDetails.gstFlag){
      this.overViewAction.emit(0);
    }
    else{
      this.overViewAction.emit(1);
    }
    
  }

  // public cartData : any[] = [];
  // public qcartItems$ = this.cartStore.cartItems$
  // .pipe(
  //   map(data => {
  //     if(data){
  //       this.cartData = data.usercart[0].userCartDetails;
        
  //       return this.cartData;
  //     }
  //     else{
  //       return data;
  //     }
  //   }
  //   )
  // )

  public buyNow(){


   this.receiveOrderStatus()
  //this.checkout();

  }

  public receiveOrderStatus(){
    this.subscriptions.push(
      this.cartService.encryptForCCAvenue(null).subscribe(res=>{
       console.log("++++)))))) Res", res);
        this.cartService.trackOrderStatus(res).subscribe(res=>{
        console.log("+_+_+_ ))))))))))) Further Response ", res)
        })
      })
    )
  }

  public encRequestRes : any;
  public accessCode = "AVEI22KJ67BJ07IEJB";
  public merchantId = "2941397";
  public workingKey = "BDBA61F56C8E4C2028818322A0E3C091";
  public selectedAddress : any = {
    name : 'testing',
    address : 'test address',
    city : 'test city',
    pincode : '23456',
    state : 'state test',
    phone : '1234567890'
  }
  public calculateTotal(cartData){
    let total = 0;
    for(var i=0;i<cartData.length;i++){
      total = total + Number(cartData[i].itemTotal);
    }

    return total;
  }

  public checkOutCCAvenue(encryptedData){
    let reqForCCAvenue = {
      "encRequest" : encryptedData, // or any supported currency
      "access_code" : this.accessCode,
    }

    this.subscriptions.push(
      this.cartService.paymentGatewayCCAvenueRequest(reqForCCAvenue).subscribe(res=>{
    //    console.log("+_+_+_+_+_+_+ Response from CCCAVENUE", res);
      })
    )
  }

  checkout(){

    //let order_no = "0001";
    //let testAmount = "10.00";

    let cartRefId = this.cartStore.getCartRefreneceId();
   // console.log(" cart data from input ======",this.cartData)

    let testAmount = this.calculateTotal(this.cartData);

    //console.log("+_+_+_+_ Amount ", cartRefId);
    //console.log("_+_+_+ This cat Data", testAmount);
    
    //let redirect_url = 'http%3A%2F%2Flocalhost%3A3008%2Fhandleresponse';
    //let redirect_url = 'https://dev-shop.skysecuretech.com/';
    let redirect_url = 'https://dev-altsys-realize-order.azurewebsites.net/api/orders/handleResponse'
    let useremail = 'vigneshblog4@gmail.com';
    let request = `merchant_id=${this.merchantId}&order_id=${cartRefId}&currency=INR&amount=${testAmount}&redirect_url=${redirect_url}&cancel_url=${redirect_url}&language=EN&billing_name=${this.selectedAddress.name}&billing_address=${this.selectedAddress.address}&billing_city=${this.selectedAddress.city}&billing_state=MH&billing_zip=${this.selectedAddress.pincode}&billing_country=India&billing_tel=${this.selectedAddress.phone}&delivery_name=${this.selectedAddress.name}&delivery_address=${this.selectedAddress.address}&delivery_city=${this.selectedAddress.city}&delivery_state=${this.selectedAddress.state}&delivery_zip=${this.selectedAddress.pincode}&delivery_country=India&delivery_tel=${this.selectedAddress.phone}&billing_email=${useremail}`
    
  





     this.subscriptions.push(
        this.cartService.encryptdata(request, testAmount, cartRefId).subscribe( data=>{
        //  console.log('---------------------', data)

          this.encRequestRes = data;
          //this.encRequestRes = data['response']; 

              setTimeout(()=>{
                  this.form.nativeElement.submit();
                  
              },1000)
        }, error => {
          console.log("++++++ Error",error)
          })
      )
  }
 
}
