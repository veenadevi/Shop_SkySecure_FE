import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CartService } from 'src/shared/services/cart.service';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { Country, State, City } from "country-state-city";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gst-prompt-modal',
  templateUrl: './gst-prompt-modal.component.html',
  styleUrls: ['./gst-prompt-modal.component.css']
})
export class GstPromptModalComponent implements OnInit{

  @Input('request')
  public request : any;

  public companyName : String; 

  public radioValue : any;

  public gstNo : any;


  public countryList : any;

  public stateList : any;

  public cityList : any;

  public selectedCountry : any;
  public selectedState : any;
  public selectedCity : any;

  public form: FormGroup;

  public selectedType : any = 'self';

  

  public subscriptions : Subscription[] = [];
  constructor(
    private cartService : CartService,
    private router : Router,
    public activeModal: NgbActiveModal,
    public userProfileService : UserProfileService,
    private userAccountStore : UserAccountStore,
    private formBuilder: FormBuilder,
  ){

  }

  ngOnInit(): void {
    
    
    this.setForm();
    this.setSelfData();
    this.countryList = Country.getAllCountries();
  }



  public setForm(){
    this.form = this.formBuilder.group(
      {
        //email: [this.emailViaSignup, [Validators.required, Validators.email]],
        //otp : [],
        gstNo : [],
        companyName : [],
        addressLine1 : [],
        addressLine2 : [],
        countryName : [],
        stateName : [],
        cityName : [],
        postalCode : [],
        phoneNo : [],
        firstName : [],
        email : []

      }
    )
  }

  public setSelfData(){
    let userDetails = this.userAccountStore.getUserDetails();

    let formVal = this.form.value;


    this.form.controls['gstNo'].setValue(userDetails.gstinNumber ? userDetails.gstinNumber : null);
    this.form.controls['companyName'].setValue(userDetails.company ? userDetails.company : null);
    this.form.controls['addressLine1'].setValue(userDetails.addressOne ? userDetails.addressOne : null);
    this.form.controls['addressLine2'].setValue(userDetails.addressTwo ? userDetails.addressTwo : null);
    this.form.controls['phoneNo'].setValue(userDetails.mobileNumber ? userDetails.mobileNumber : null);





    //formVal.countryName = userDetails.countryCode ? userDetails.countryCode : null;
    //formVal.stateName = userDetails.state ? userDetails.state : null;
    
    //formVal.gstNo = userDetails.gstinNumber ? userDetails.gstinNumber : null;
    

    console.log("+_+_+_+_+_+_ UserDetails ", userDetails);
  }

  public onCountryChange(event){
    
    let country = JSON.parse(event.target.value);
    this.selectedCountry = country;

    this.stateList  = State?.getStatesOfCountry(country.isoCode);
 

  }

  
  public onStateChange(event){
    
    //this.cityList  = State?.getStatesOfCountry(event.target.value);

    let state = JSON.parse(event.target.value);
    this.selectedState = state;
    this.cityList = City.getCitiesOfState(state?.countryCode, state.isoCode);
   
    

  }

  public onCityChange(event){
    
    

    
    let city = JSON.parse(event.target.value);
    this.selectedCity = city;
    //this.cityList = City.getCitiesOfState(state?.countryCode, state.isoCode);
    
    

  }


  public onRadioButtonClick(){
    

  }

  public onToogleChange(val){
    
    this.selectedType = val;
    this.form.reset();
    if(val === 'self'){
      this.setSelfData();
    }
  }

  public createQuotationService2(){
    

    console.log("+__+_+_+_+_ Type ", this.selectedType);

    let userDetails = this.userAccountStore.getUserDetails();



    

    let req = this.request;
    let formVal = this.form.value; 
    
    console.log("+__+_+_+_+_ Email ", formVal.email);
    console.log("+__+_+_+_+_ Name ", formVal.firstName);

    
    req.companyName = formVal.companyName;
    req.billing_address = {
        "attention": "name",
        "address": formVal.addressLine1,
        "street2": formVal.addressLine2,
        "state_code": this.selectedState.isoCode,
        "city": this.selectedCity.name,
        "state": this.selectedState.name,
        "zip": formVal.postalCode,
        "country": this.selectedCountry.isoCode,
        "phone": formVal.phoneNo
    }

    req.currency_id = "1014673000000000064";

    req.RequestingForOther = (this.selectedType === 'others') ? true : false;

    if(this.selectedType === 'others'){
      req.contact_persons =  [
          {
              "first_name": formVal.firstName,
              "email": formVal.email,
              "phone": formVal.mobileNumber ? formVal.mobileNumber : '',
              "is_primary_contact": true,
              "enable_portal": false
          }
      ];
    }

    else{
      req.contact_persons =  [
          {
              "first_name": userDetails.firstName,
              "email": userDetails.email,
              "phone": userDetails.mobileNumber ? userDetails.mobileNumber : '',
              "is_primary_contact": true,
              "enable_portal": false
          }
      ];
    }


    

    

    
    


    if(formVal.gstNo === null || formVal.gstNo === ''){
      
      
      req.gst_treatment = "business_none";
    }
    else{
      req.gst_no =  formVal.gstNo;
      req.gst_treatment = "business_gst";
    }

    console.log("*(*(*(*(*(* Final Req ", req);



    /*
    
    this.updateGSTService(req);

   
    
    this.subscriptions.push(
      this.cartService.createQuotation(req).subscribe( response => {
        
        if(response && response.Accounts && response.Accounts){
          if(response.Accounts.code === 'SUCCESS'){
            this.cartService.getCartItems(null).subscribe();
            this.router.navigate(['/cart/cart-submit']);
          } 
          else {
            
          }
        }
        else{
          
        }
        
      })
    )*/

  }

  public updateGSTService(req){

    

       
       let userDetails = this.userAccountStore.getUserDetails();

  

      //  let req = {
      //    "email" : userAccountdetails.email,
      //    "company" : companyName,
         
      //  }
   


    let request = {
 
      "email": userDetails.email,
      "isRegistered": (req.gst_treatment === "business_gst") ? true : false,
      //"gstinNumber":"ABCDEG78101",
      "companyBusinessName":req.companyName,
      "placeOfSupply": this.selectedState.isoCode,
       "fullAddress" : [
             {
                 "address1" : req.billing_address.address,
                 "address2" : req.billing_address.street2,
                 //"state" : this.selectedState.name,
                 "state" : this.selectedState.isoCode,
                 "district" : this.selectedCity.isoCode,
                 "pincode" : req.billing_address.zip,
                 //"countryCode" : this.selectedState.isoCode,
                 "countryCode" : this.selectedCountry.isoCode,
             }
         ],
     
      
       "updatedBy": userDetails.email
     
     }

     if(req.gst_treatment === "business_gst"){
        request["gstinNumber"] = req.gst_no ;
     }





     this.subscriptions.push(
      this.userProfileService.updateGST(request).subscribe( response => {
        
      })
    )
  }

  public createQuotationService(){
    let req = this.request;
    req.companyName = this.companyName;

    this.activeModal.close();
    this.updateProfile(this.companyName);
    this.subscriptions.push(
      this.cartService.createQuotation(req).subscribe( response => {
        
        if(response && response.Accounts && response.Accounts){
          if(response.Accounts.code === 'SUCCESS'){
            this.cartService.getCartItems(null).subscribe();
            this.router.navigate(['/cart/cart-submit']);
            this.activeModal.close();
          } 
          else {
           
          }
        }
        else{
          
        }
        
      })
    )
  }

  public updateProfile(companyName){
    
    //let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let userAccountdetails = this.userAccountStore.getUserDetails();

  

    let req = {
      "email" : userAccountdetails.email,
      "company" : companyName,
      
    }

    this.subscriptions.push(
      this.userProfileService.updateUserProfile(req).subscribe( response => {
        
      })
    )
  }



}
