import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CartService } from 'src/shared/services/cart.service';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { Country, State, City } from "country-state-city";
import { FormBuilder, FormGroup , Validators  } from '@angular/forms';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';

@Component({
  selector: 'app-gst-prompt-modal',
  templateUrl: './gst-prompt-modal.component.html',
  styleUrls: ['./gst-prompt-modal.component.css']
})
export class GstPromptModalComponent implements OnInit{
  showContent: boolean = false;
  showButton: boolean=true;
 

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
  myForm: FormGroup;

 
  isChecked: boolean = false;
  nrSelect : any;

  toStr = JSON.stringify;


  Quantities = Array(50).fill(0).map((x,i)=>i);

  // variable to hold the value of select 
  selectedValue : any;

  public gstData : boolean = false;

 
 
  public subscriptions : Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private cartService : CartService,
    private router : Router,
    public activeModal: NgbActiveModal,
    public userProfileService : UserProfileService,
    private userAccountStore : UserAccountStore,
    private formBuilder: FormBuilder,
    private superAdminService : SuperAdminService
  ){
    //this.myForm = this.fb.group({
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngOnInit(): void {
    

    this.countryList = Country.getAllCountries();
 
    this.selectedValue = this.countryList[0];
    this.setForm();
    this.setSelfData();
    
    
    
  }



  public setForm(){
    //this.form = this.formBuilder.group(
      this.myForm = this.formBuilder.group(
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

    //let formVal = this.form.value;
    let formVal = this.myForm.value;


    /*this.form.controls['gstNo'].setValue(userDetails.gstinNumber ? userDetails.gstinNumber : null);
    this.form.controls['companyName'].setValue(userDetails.companyBusinessName ? userDetails.companyBusinessName : null);
    this.form.controls['addressLine1'].setValue(userDetails.addressOne ? userDetails.addressOne : null);
    this.form.controls['addressLine2'].setValue(userDetails.addressTwo ? userDetails.addressTwo : null);
    this.form.controls['phoneNo'].setValue(userDetails.mobileNumber ? userDetails.mobileNumber : null);
    */

    this.myForm.controls['gstNo'].setValue(userDetails.gstinNumber ? userDetails.gstinNumber : null);
    this.myForm.controls['companyName'].setValue(userDetails.companyBusinessName ? userDetails.companyBusinessName : null);
    this.myForm.controls['addressLine1'].setValue(userDetails.addressOne ? userDetails.addressOne : null);
    this.myForm.controls['addressLine2'].setValue(userDetails.addressTwo ? userDetails.addressTwo : null);
    this.myForm.controls['phoneNo'].setValue(userDetails.mobileNumber ? userDetails.mobileNumber : null);

  

    let allCountries = Country.getAllCountries();

    //isoCode

    var index = allCountries.findIndex(el => el.isoCode === userDetails.countryCode);
         
          if(index >=0){
            
            //this.myForm.value.countryName = allCountries[index];
            //this.myForm.controls['countryName'].setValue(allCountries[index]);
            //this.myForm.controls['countryName'].setValue(allCountries.filter(c => c.isoCode === userDetails.countryCode));
            //this.selectedCountry = allCountries.filter(c => c.isoCode === userDetails.countryCode)[0];
          }

    //this.countryList




    //formVal.countryName = userDetails.countryCode ? userDetails.countryCode : null;
    //formVal.stateName = userDetails.state ? userDetails.state : null;
    
    //formVal.gstNo = userDetails.gstinNumber ? userDetails.gstinNumber : null;
    

    
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
    //this.form.reset();
    this.myForm.reset();
    if(val === 'self'){
      this.setSelfData();
    }

  }

  public handleChange(val){
    

    this.selectedType = val;
    //this.form.reset();
    this.myForm.reset();
    if(val === 'self'){
      this.setSelfData();
    }

  }



  public createQuotationService(){
    


    let userDetails = this.userAccountStore.getUserDetails();



    

    let req = this.request;
    //let formVal = this.form.value; 
    let formVal = this.myForm.value;
    
    

    
    req.companyName = formVal.companyName;
    req.billing_address = {
        "attention": "name",
        "address": formVal.addressLine1,
        "street2": formVal.addressLine2,
        "state_code": this.selectedState.isoCode,
        "city": this.selectedCity.name,
        "state": this.selectedState.name,
        "zip": formVal.postalCode,
        "country": "IN", //this.selectedCountry.isoCode,
        "phone": formVal.phoneNo
    }

    req.currency_id = "1014673000000000064";

    req.RequestingForOther = (this.selectedType === 'others') ? true : false;

    if(this.selectedType === 'others'){
      req.contact_persons =  [
          {
              "first_name": formVal.firstName,
              "email": formVal.email,
              "phone": formVal.phoneNo ? formVal.phoneNo : '',
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



    console.log("+_+_+_+_+ Final Val , ", req);


    
    /*
    this.updateGSTService(req);

   
    
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
     
      
       "updatedBy": userDetails._id
     
     }

     if(req.gst_treatment === "business_gst"){
        request["gstinNumber"] = req.gst_no ;
     }





     this.subscriptions.push(
      this.userProfileService.updateGST(request).subscribe( response => {
        
      })
    )
  }

  public createQuotationService2(){
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


  public onNextClick(){
    this.showContent = !this.showContent;

    

    if(this.myForm.value.gstNo.length === 15){

        this.myForm.controls['companyName'].disable();
        this.myForm.controls['addressLine1'].disable();
        this.myForm.controls['addressLine2'].disable();
        this.myForm.controls['postalCode'].disable();
        this.myForm.controls['countryName'].disable();
        this.myForm.controls['stateName'].disable();
        this.myForm.controls['cityName'].disable();
      this.subscriptions.push(
        this.superAdminService.getGSTDetailsById(this.myForm.value.gstNo).subscribe(res=>{
  
          this.gstData = true;
      
  
          
          this.myForm.controls['companyName'].setValue(res['legal-name'] ? res['legal-name'] : null);
          this.myForm.controls['addressLine1'].setValue(res.adress.floor ? res.adress.floor : null);
          this.myForm.controls['addressLine2'].setValue(res.adress.street ? res.adress.street : null);
          this.myForm.controls['postalCode'].setValue(res.adress.pincode ? res.adress.pincode : null);
          
          //this.myForm.controls['addressLine1'].setValue(userDetails.addressOne ? userDetails.addressOne : null);
          //this.myForm.controls['addressLine2'].setValue(userDetails.addressTwo ? userDetails.addressTwo : null);
  
          
        })
      )
    }
    else{

    }


  }

  public onBackClick(){
    this.showContent = !this.showContent;
    this.myForm.enable();
  }



}
