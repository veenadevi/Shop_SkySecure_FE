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
import { CartStore } from 'src/shared/stores/cart.store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';

@Component({
  selector: 'app-gst-prompt-modal',
  templateUrl: './gst-prompt-modal.component.html',
  styleUrls: ['./gst-prompt-modal.component.css']
})
export class GstPromptModalComponent implements OnInit{
  showContent: boolean = false;
  showPrivacyContent: boolean = false;
  showButton: boolean=true;
 

  public buttonDisabled : boolean = false;

  //public submitDisabled : boolean = true;

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

  public othersGSTShow = false;

  public showWithoutGST : boolean = true;

  public selectedType : any = 'self';
  myForm: FormGroup;


  isChecked: boolean = true;
  nrSelect : any;

  toStr = JSON.stringify;


  Quantities = Array(50).fill(0).map((x,i)=>i);

  // variable to hold the value of select 
  selectedValue : any;

  public gstData : boolean = false;

  public gstResponseData : any;

  public errorMessageText : string = "* Please choose one option: Enter a Company GST number or select the I don't have Company GST number checkbox"
 
  public submitErrorMessageText = "* Please accept the T&C continue ";
 
  public subscriptions : Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private cartService : CartService,
    private router : Router,
    public activeModal: NgbActiveModal,
    public userProfileService : UserProfileService,
    private userAccountStore : UserAccountStore,
    private formBuilder: FormBuilder,
    private superAdminService : SuperAdminService,
    private cartStore : CartStore,
    private spinner: NgxSpinnerService,
    private toaster : ToasterNotificationService
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
        gstNo : [null],
        checkGstNil : [null],
        companyName : [],
        addressLine1 : [],
        addressLine2 : [],
        countryName : [],
        stateName : [],
        cityName : [],
        postalCode : [],
        phoneNo : [],
        firstName : [],
        email : [],
       checkTerms : [null]
      }
    )
  }

disableGstNOField(){
  
  if(this.myForm.get('checkGstNil').value)
    this.myForm.get('gstNo').disable();
else
this.myForm.get('gstNo').enable();
}
disableCheckGstNil(){
  
  if(this.myForm.get('gstNo').value)
    this.myForm.get('checkGstNil').disable();
  else
    this.myForm.get('checkGstNil').enable();
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

  public onInputChanges(event){
    console.log("_+__+_+_+_ Came here");
    if(this.myForm.get('firstName').value && this.myForm.get('firstName').value.length>0 && this.myForm.get('email').value && this.myForm.get('email').value.length>0 && this.myForm.get('phoneNo').value && this.myForm.get('phoneNo').value.length>0){
      this.buttonDisabled = false;
    }
    else{
      this.buttonDisabled = true;
    }
  }

  public handleChange(val){
    

    
    this.selectedType = val;
    //this.form.reset();
    this.myForm.reset();
    if(val === 'self'){
      this.setSelfData();
      this.buttonDisabled = false;
      this.showWithoutGST = false;
    }
    else{
      this.isChecked = false;
      this.buttonDisabled = true;
    }

  }

public submitErrorMessage: boolean =false;

public submitCityError : boolean = false;

  public createQuotationService(){

    console.log("++__+_+_+_+_ *&*&* &*&*& , ", this.myForm.get('cityName').value);
    


    if((this.myForm.get('checkTerms').value === null || this.myForm.get('checkTerms').value === false))
   {
    this.submitErrorMessageText = "* Please accept the T&C continue ";
    this.submitErrorMessage = true;
  }

  // else if(this.myForm.get('checkGstNil').value !== null || this.myForm.get('checkGstNil').value === true){
  //   if((this.myForm.get('cityName').value === null || this.myForm.get('cityName').value.length<=0 || this.myForm.get('stateName').value === null || this.myForm.get('stateName').value.length<=0)){
  //     this.submitErrorMessageText = "Please fill mandaotry Fields";
  //     this.submitCityError = true;
  //   }
  //   else{

  //   }
  // }
  else if( (this.myForm.get('checkGstNil').value !== null || this.myForm.get('checkGstNil').value === true) &&    (this.myForm.get('cityName').value === null || this.myForm.get('cityName').value.length<=0 || this.myForm.get('stateName').value === null || this.myForm.get('stateName').value.length<=0)){
    console.log("{}{{}{{} ");
    this.submitErrorMessageText = "Please fill mandaotry Fields";
    this.submitCityError = true;
  }
  else
  {
    this.submitErrorMessage = false
   
    let userDetails = this.userAccountStore.getUserDetails();

    let req = this.request;
    //let formVal = this.form.value; 
    let formVal = this.myForm.value;
    
    //if(this.gstData){
      

      
    //}

    
    
    if(this.gstData){
      req.companyName = this.gstResponseData['legal-name'];
    }
    else{
      req.companyName = formVal.companyName;
    }
   



    if(this.gstData){
      req.billing_address = {
        "attention": "name",
        "address": this.gstResponseData.adress.floor,
        "street2": this.gstResponseData.adress.street,
        "state_code": this.selectedState.isoCode,
        "city": this.selectedCity.name,
        "state": this.selectedState.name,
        "zip": this.gstResponseData.adress.pincode,
        "country": "IN", //this.selectedCountry.isoCode,
        "phone": formVal.phoneNo
      }
    }

    else{
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



  


    
    
    this.updateGSTService(req);

   



    this.spinner.show();
    
    this.subscriptions.push(
      this.cartService.createQuotation(req).subscribe( response => {
        this.spinner.hide();
        if(response && response.UserCart){
          
            
            this.cartStore.setCartRefreneceId(null);
            this.cartService.getCartItems(null).subscribe();
            
            this.router.navigate(['/cart/cart-submit']);
            
            this.activeModal.close();
            
          
          
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

  

      //  let req = {
      //    "email" : userAccountdetails.email,
      //    "company" : companyName,
         
      //  }
   

      let tempEmail = "";
      if(this.selectedType === 'others'){
        tempEmail = this.myForm.value.email;
      }
      else{
        tempEmail = userDetails.email;
      }


    let request = {
 
      "email": tempEmail,
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
                 "countryCode" : "IN",
             }
         ],
     
      
       "updatedBy": userDetails._id
     
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

  public onTermsClick(){
    this.showPrivacyContent = !this.showPrivacyContent;
  }


public errorMessage: boolean = false;


  public onNextClick(){


    if(this.selectedType === 'others'){
      this.othersGSTShow = true;
      this.showWithoutGST = false;
    }
    else{
      this.onNextClick2();
    }

    // if(this.myForm.get('firstName').value === null || this.myForm.get('email').value === null || this.myForm.get('phoneNo').value === null){
    //   


    //   if(this.myForm.get('firstName').value === null){
    //     this.myForm.get('firstName').setErrors({ 'required': true });
    //   }
    //   if(this.myForm.get('email').value === null){
    //     this.myForm.get('email').setErrors({ 'required': true });
    //   }
    //   if(this.myForm.get('phoneNo').value === null){
    //     this.myForm.get('phoneNo').setErrors({ 'required': true });
    //   }
    // }
    // else{
    //   this.onNextClick2()
    // }
  }


  public onBackGSTDetails(){
    this.showWithoutGST = false;
  }


  public onNextClickForGST(){
    this.onNextClick2();
  }

  public onNextClick2(){

    this.errorMessage = false;
    
    if((this.myForm.get('checkGstNil').value === null || this.myForm.get('checkGstNil').value === false)
    && (this.myForm.get('gstNo').value === null || this.myForm.get('gstNo').value === '')){
      this.errorMessage = true;
    }
    
    else{
      console.log("+_+_+_+_+_+ (*(*(* ", this.myForm.get('checkGstNil').value);
      console.log("+_+_+_+_+_+ (*(*(* ", this.myForm.get('gstNo').value);
    
    /*if((this.myForm.get('checkGstNil').value !== true || this.myForm.get('checkGstNil').value !== null) && this.selectedType === 'others'){
      this.myForm.get('gstNo').setErrors({ 'invalid': true });
      this.errorMessageText = "Please Enter Valid GST Numebr!"
      this.errorMessage = true;
    }*/
    //else{

      
      this.showContent = true;
      
       
      console.log("((((((((+_+_+_+_+ Came here ", this.myForm.get('checkGstNil').value)
  
      if((this.myForm.get('checkGstNil').value === true || this.myForm.get('checkGstNil').value === null) && this.myForm.value.gstNo.length === 15){
  
          

          this.myForm.controls['companyName'].disable();
          this.myForm.controls['addressLine1'].disable();
          this.myForm.controls['addressLine2'].disable();
          this.myForm.controls['postalCode'].disable();
          this.myForm.controls['countryName'].disable();
          this.myForm.controls['stateName'].disable();
          this.myForm.controls['cityName'].disable();
          this.subscriptions.push(
          this.superAdminService.getGSTDetailsById(this.myForm.value.gstNo).subscribe(res=>{
            
           // this.submitDisabled = false;
            this.spinner.show();
            

            if(res === "Invalid GST Number."){
              this.myForm.get('gstNo').setErrors({ 'invalid': true });
              this.errorMessageText = "Please Enter Valid GST Numebr!"
              this.errorMessage = true;
              this.spinner.hide();
            }
            else{
              this.spinner.hide();
              this.gstResponseData = res;
    
              this.gstData = true;
          
      
              this.errorMessage = false;
              //this.showContent = !this.showContent;
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
              this.selectedCity = selectedCity;
            }

  
  
    
            
          })
        )
      }
      else{
        
      }

    //}

 
  }

  }

  public onBackClick(){
    this.showContent = !this.showContent;
    this.myForm.enable();
  }
  public onCancelClick(){
    this.activeModal.close();
  }
  public onPreviousClick(){
    //this.showContent = false ;
    this.showPrivacyContent = false;

    if(this.isChecked2 === true){
      this.myForm.patchValue({
        checkTerms:false
      })
    }
    if(this.isChecked1 === true){
      this.myForm.patchValue({
        checkTerms:true
      })
    }
    
    this.myForm.enable();
  }


  isChecked1: boolean = false;
  isChecked2: boolean = false;

  checkboxChanged(checkboxNumber: number) {
    if (checkboxNumber === 1) {
      this.isChecked2 = false; // Uncheck Checkbox 2 when Checkbox 1 changes
    } else if (checkboxNumber === 2) {
      this.isChecked1 = false; 
      
    }

    this.showPrivacyContent = false;

    if(this.isChecked2 === true){
      this.myForm.patchValue({
        checkTerms:false
      })
    }
    if(this.isChecked1 === true){
      this.myForm.patchValue({
        checkTerms:true
      })
    }
    
    this.myForm.enable();
  }
  checkTerms :boolean= false;

  disableCheckTerms(){
    
    if(this.isChecked2 === false && this.isChecked1 === false  )
    {
      this.myForm.get('checkTerms').disable();
    }
   
    else
    this.myForm.get('checkTerms').enable();
  }

  disableErrorMessage(){
    if(this.myForm.get('checkTerms').value === true){
      this.submitErrorMessage=false;
    }
  }
  disableAnyOneMessage(){
    if((this.myForm.get('checkGstNil').value === null || this.myForm.get('gstNo').value === true)
   || (this.myForm.get('gstNo').value === null || this.myForm.get('checkGstNil').value === true)){
      this.errorMessage=false;
    }
  }
}
