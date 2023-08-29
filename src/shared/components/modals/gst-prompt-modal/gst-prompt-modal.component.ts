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
        phoneNo : []

      }
    )
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

  public createQuotationService2(){
    

    let userDetails = this.userAccountStore.getUserDetails();

    

    console.log("_+_+_+_ +Details",userDetails);


    let req = this.request;
    let formVal = this.form.value; 
    


    req.companyName = "Test"
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

    req.contact_persons =  [
        {
            "first_name": "Veena",
            "email": "veena@skysecuretech.com",
            "phone": "+91-9972835477",
            "is_primary_contact": true,
            "enable_portal": false
        }
    ];

    
    


    if(formVal.gstNo === null || formVal.gstNo === ''){
      
      
      req.gst_treatment = "business_none";
    }
    else{
      req.gst_no =  formVal.gstNo;
      req.gst_treatment = "business_gst";
    }


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
    )

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
        console.log("SSSS");
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
