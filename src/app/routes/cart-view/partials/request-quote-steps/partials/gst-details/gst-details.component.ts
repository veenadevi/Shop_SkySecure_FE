import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country, State } from 'country-state-city';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, first } from 'rxjs';
import { RequestQuoteDetailsModel } from 'src/shared/models/concrete/request-quote-details.model';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';
import { RequestQuoteDetailsStore } from 'src/shared/stores/request-quote-details.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'gst-details',
  templateUrl: './gst-details.component.html',
  styleUrls: ['./gst-details.component.css']
})
export class GstDetailsComponent implements OnInit{

  @Output() gstDetailsAction = new EventEmitter();


  public isChecked : boolean = true;
  public selectedGSTType : string = 'self';


  public gstForm;
  public gstFormOthers;

  public gstErrorMessageFlag : boolean = false;

  public gstErrorMessage = "Please fill mandaotry Fields";

  public onGSTDetailsCLicked : boolean = false;

  public referredBy : any;

  public channelPartnerList : any;

  public subscriptions : Subscription[] = [];


  constructor(

    private formBuilder: FormBuilder,
    private userAccountStore : UserAccountStore,
    private superAdminService : SuperAdminService,
    private spinner: NgxSpinnerService,
    private reqQuoteDetailsStore : RequestQuoteDetailsStore,
    private router : Router,
    private toaster : ToasterNotificationService,

  ){}


  ngOnInit(): void {
    

    this.setGSTDetailsForm();
    this.getAllMyCustomers();
    this.setSelfData();
  }




  public setGSTDetailsForm(){
    this.gstForm = this.formBuilder.group(
      {
        //email: [this.emailViaSignup, [Validators.required, Validators.email]],
        //otp : [],
        gstNo : [null],
        checkGstNil : [null],
        companyName : [],
      });

      this.gstFormOthers = this.formBuilder.group(
        {
          gstNo : [],
          checkGstNil : [],
          companyName : [],
          firstName :['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        });
  }

  public setSelfData(){
    let userDetails = this.userAccountStore.getUserDetails();

    let formVal = this.gstForm.value;



    this.gstForm.controls['gstNo'].setValue(userDetails.gstinNumber ? userDetails.gstinNumber : null);
    //this.myForm.controls['companyName'].setValue(userDetails.companyBusinessName ? userDetails.companyBusinessName : null);
    //this.myForm.controls['addressLine1'].setValue(userDetails.addressOne ? userDetails.addressOne : null);
    //this.myForm.controls['addressLine2'].setValue(userDetails.addressTwo ? userDetails.addressTwo : null);
    //this.myForm.controls['phoneNo'].setValue(userDetails.mobileNumber ? userDetails.mobileNumber : null);

  

    let allCountries = Country.getAllCountries();

    //isoCode

    
  }

  public onInputChanges(event){
    //if(this.myForm.get('firstName').value && this.myForm.get('firstName').value.length>0 && this.myForm.get('email').value && this.myForm.get('email').value.length>0 && this.myForm.get('phoneNo').value && this.myForm.get('phoneNo').value.length>0){
    //makign phone as non Mandatory 
    if(this.gstFormOthers.get('firstName').value && this.gstFormOthers.get('firstName').value.length>0 && this.gstFormOthers.get('email').value && this.gstFormOthers.get('email').value.length>0 ){ 
    //this.buttonDisabled = false;
    }
    else{
      //this.buttonDisabled = true;
    }
  }

  public onNextClick(){

    this.gstErrorMessageFlag = false;
    this.gstErrorMessage = "Please Enter Valid GST No.";
    
    this.onGSTDetailsCLicked = true;
    this.gstErrorMessage = "Please fill mandaotry Fields";
    if(this.selectedGSTType === 'self'){
      if( this.gstForm.get('checkGstNil').value === null || this.gstForm.get('checkGstNil').value === false){
        


        if(!this.referredBy){
          this.gstErrorMessageFlag = true;
          this.gstErrorMessage = "Please Select Refered By";
          return;
        }

        else if(this.gstForm.get('gstNo').value.length === 15){
          this.gstErrorMessageFlag = false;
          this.getGSTData(this.gstForm.get('gstNo').value);
          
        }
        else{
          this.gstErrorMessageFlag = true;
          this.gstErrorMessage = "Please Enter Valid GST No.";
        }
        
        
      }
      
      else{

        if(!this.referredBy){
          this.gstErrorMessageFlag = true;
          this.gstErrorMessage = "Please Select Refereed By";
          return;
        }
        else{
          this.gstErrorMessageFlag = false;
          let reqBody = this.reqQuoteDetailsStore.getReqQuoteDetails();
         
          reqBody.gstNo = null;
          reqBody.gstType = "self";
          reqBody.gstFlag = false;
          reqBody.selectedChannelPartnerAdminId = (this.referredBy) ? this.referredBy.ChannelPartnerAdminId: '';
          reqBody.selectedChannelPartnerId = (this.referredBy) ? this.referredBy.ChannelPartnerId : '';
          reqBody.selectedChannelPartnerName=(this.referredBy) ? this.referredBy.companyBusinessName : '';
          this.reqQuoteDetailsStore.setReqQuoteDetails(reqBody);
          this.gstDetailsAction.emit('next');
        }
        

      }
    }

    else{ // Others
      if(this.gstFormOthers.invalid){
        return;
      }
      else if(!this.referredBy){
        this.gstErrorMessageFlag = true;
        this.gstErrorMessage = "Please Select Refereed By";
        return;
      }
      else{
        let reqBody : RequestQuoteDetailsModel = this.reqQuoteDetailsStore.getReqQuoteDetails();
        reqBody.name = this.gstFormOthers.get('firstName').value;
        reqBody.emailId = this.gstFormOthers.get('email').value;
        reqBody.countryCode = "IN";
        reqBody.phoneNo = this.gstFormOthers.get('phoneNo').value;

        reqBody.selectedChannelPartnerAdminId = (this.referredBy) ? this.referredBy.ChannelPartnerAdminId: '';
        reqBody.selectedChannelPartnerId = (this.referredBy) ? this.referredBy.ChannelPartnerId : '';
        reqBody.selectedChannelPartnerName = (this.referredBy) ? this.referredBy.companyBusinessName: '';
        
        this.reqQuoteDetailsStore.setReqQuoteDetails(reqBody);
        if( this.gstFormOthers.get('checkGstNil').value === null || this.gstFormOthers.get('checkGstNil').value === false){
         
  
          if(this.gstFormOthers.get('gstNo').value && this.gstFormOthers.get('gstNo').value.length === 15){
            this.gstErrorMessageFlag = false;
            this.getGSTData(this.gstFormOthers.get('gstNo').value);

          }
          else{
            this.gstErrorMessageFlag = true;
            this.gstErrorMessage = "Please Enter Valid GST No.";
          }
          
          
        }
        else{
          this.gstErrorMessageFlag = false;
          let reqBody = this.reqQuoteDetailsStore.getReqQuoteDetails();
          reqBody.gstNo = null;
          reqBody.gstType = "others";
          reqBody.gstFlag = false;
          reqBody.selectedChannelPartnerAdminId = (this.referredBy) ? this.referredBy.ChannelPartnerAdminId : '';
          reqBody.selectedChannelPartnerId = (this.referredBy) ? this.referredBy.ChannelPartnerId: ''
          reqBody.selectedChannelPartnerName=(this.referredBy) ? this.referredBy.companyBusinessName : '';
          this.reqQuoteDetailsStore.setReqQuoteDetails(reqBody);
          this.gstDetailsAction.emit('next');
  
        }
      }
    }
  }

  public getGSTData(gstNo){
    this.spinner.show();
    this.superAdminService.getGSTDetailsById(gstNo).subscribe( res=>{
                 // this.submitDisabled = false;
                 
                 this.gstErrorMessageFlag = true;
                 this.gstErrorMessage = "Please Enter Valid GST No.";

                 if(res === "Invalid GST Number."){
                  this.spinner.hide();
                   /*this.myForm.get('gstNo').setErrors({ 'invalid': true });
                   this.errorMessageText = "Please Enter Valid GST Number!"
                   this.errorMessage = true;
                   this.spinner.hide();*/

                 }
                 else{
                  this.gstErrorMessageFlag = false;
                   this.spinner.hide();
                   let reqBody = this.reqQuoteDetailsStore.getReqQuoteDetails();
                   

                   reqBody.gstNo = gstNo;
                   reqBody.gstType = this.selectedGSTType;
                   reqBody.gstFlag = true;

                   reqBody.companyName = res['legal-name'];

                   let stateList  = State?.getStatesOfCountry('IN');
                   let selectedState = stateList.filter(c => c.name === res.adress.state)[0];
                   let userDetails = this.userAccountStore.getUserDetails();
             
                   //this.selectedState = selectedState;

                   reqBody.billing_address = {
                      "attention": "Name",
                      "address": res.adress.floor ? res.adress.floor : null,
                      "street2": res.adress.street ? res.adress.street : null,
                      "state_code": selectedState.isoCode,
                      "city": res.adress.city,
                      "state": res.adress.state,
                      "zip": res.adress.pincode ? res.adress.pincode : null,
                      "country": "IN",
                      "phone": userDetails.mobileNumber
                   }

               
                    reqBody.selectedChannelPartnerAdminId = (this.referredBy) ? this.referredBy.ChannelPartnerAdminId : '';
                    reqBody.selectedChannelPartnerId = (this.referredBy) ? this.referredBy.ChannelPartnerId: '';
                    reqBody.selectedChannelPartnerName=(this.referredBy) ? this.referredBy.companyBusinessName : '';

                   this.reqQuoteDetailsStore.setReqQuoteDetails(reqBody);
                   this.gstDetailsAction.emit('nextOverview');




                   /*this.gstResponseData = res;
         
                   this.gstData = true;
               
           
                   this.errorMessage = false;
                   
                   this.showContent = true;
       
       
                   this.myForm.controls['companyName'].setValue(res['legal-name'] ? res['legal-name'] : null);
                   this.myForm.controls['addressLine1'].setValue(res.adress.floor ? res.adress.floor : null);
                   this.myForm.controls['addressLine2'].setValue(res.adress.street ? res.adress.street : null);
                   this.myForm.controls['postalCode'].setValue(res.adress.pincode ? res.adress.pincode : null);
         
         
                   let resState = res.adress.state;
                   let resCity = res.adress.city;
         
         
                   let stateList  = State?.getStatesOfCountry('IN');
                   
         
         
                   let selectedState = stateList.filter(c => c.name === resState)[0];
                  
                   this.selectedState = selectedState;
         
         
                   let cityList = City.getCitiesOfState('IN', this.selectedState.isoCode);
         
                   
         
                   let selectedCity = cityList.filter(c => c.name === resCity)[0];
                   this.selectedCity = selectedCity; */
                 }
    }

    )
  }


  disableGstNOField(){
  
    if(this.selectedGSTType === 'self'){
      if(this.gstForm.get('checkGstNil').value)
      this.gstForm.get('gstNo').disable();
    else
      this.gstForm.get('gstNo').enable();
    }
    else{
      if(this.gstFormOthers.get('checkGstNil').value)
      this.gstFormOthers.get('gstNo').disable();
    else
      this.gstFormOthers.get('gstNo').enable();
    }
    
  }
  disableCheckGstNil(){
    
    if(this.selectedGSTType === 'self'){
      if(this.gstForm.get('gstNo').value)
      this.gstForm.get('checkGstNil').disable();
    else
      this.gstForm.get('checkGstNil').enable();
    }
    else{
      if(this.gstFormOthers.get('gstNo').value)
      this.gstFormOthers.get('checkGstNil').disable();
    else
      this.gstFormOthers.get('checkGstNil').enable();
    }
    
  }

  public handleChange(val){
    if(val === 'self'){
      this.isChecked = true;
      this.selectedGSTType = 'self';
      this.setSelfData();
    }
    else{
      this.isChecked = false;
      this.selectedGSTType = 'others'
    }
  }

  public onCancelClick(){
    this.router.navigate(['/cart']);
  }

  public onReferredByChange(event){
    
    //this.referredBy = event.target.value;
    this.referredBy = JSON.parse(event.target.value);
  }

  


  public getAllMyCustomers(){

    this.subscriptions.push(
      this.superAdminService.getReferToChannelPartners().subscribe(res=>{
       

        
        this.channelPartnerList = res.channelPartners;

      },
      error => {
        this.spinner.hide();
        this.toaster.showWarning("Some Error Occurred! Please try again after sometime.",'')
      })
    )

  }

}
