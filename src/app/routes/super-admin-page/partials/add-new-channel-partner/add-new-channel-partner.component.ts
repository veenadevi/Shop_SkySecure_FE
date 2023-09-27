import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { Country, State, City } from "country-state-city";
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';


interface CreateChannalParterPayload {
  name: String,
  address: Array<any>,
  firstName: String,
  lastName: String,
  email: String,
  countryCode: String,
  mobileNumber: String,
  role: String,
  createdBy: String,
  updatedBy: String,
  isNewUser: boolean

}

@Component({
  selector: 'app-add-new-channel-partner',
  templateUrl: './add-new-channel-partner.component.html',
  styleUrls: ['./add-new-channel-partner.component.css']
})

export class AddNewChannelPartnerComponent {

  createChannalParterPayload: CreateChannalParterPayload;
  public subscription: Subscription[] = [];
  myForm: FormGroup;
  @Input('request')
  public countryList: any;

  public stateList: any;

  public cityList: any;

  public selectedCountry: any;
  public selectedState: any;
  public selectedCity: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private adminPageService : AdminPageService,

    private formBuilder: FormBuilder,
    private userAccountStore: UserAccountStore,
  ) {

    this.myForm = this.fb.group({
      channelName:[, [Validators.required, Validators.required]],

     
      countryName: ['', Validators.required],
      addressLine1: [''],
      addressLine2: [''],
      stateName: [''],
      cityName: [''],
      postalCode: [''],
      credit: [''],
      userName:[''],
      EmailId: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

    });
  }



  selectedValue: any;
  ngOnInit(): void {


    this.countryList = Country.getAllCountries();

    this.selectedValue = this.countryList[0];
    this.setForm();
    this.setSelfData();

  }

  public setForm() {
    //this.form = this.formBuilder.group(
    this.myForm = this.formBuilder.group(
      {
        channelName: [],
     
        addressLine1: [],
        addressLine2: [],
        stateName: [],
        cityName: [],
        postalCode: [],
        credit: [''],
        EmailId:[''],
        phoneNo:[''],
        firstName:[''],
        lastName:[''],






      }
    )
  }


  public setSelfData() {
    let userDetails = this.userAccountStore.getUserDetails();

    //let formVal = this.form.value;
    let formVal = this.myForm.value;

    let allCountries = Country.getAllCountries();

    //isoCode

    var index = allCountries.findIndex(el => el.isoCode === userDetails.countryCode);

    if (index >= 0) {

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

  public onCountryChange(event) {

    let country = JSON.parse(event.target.value);

    this.selectedCountry = country;

    this.stateList = State?.getStatesOfCountry(country.isoCode);


  }


  public onStateChange(event) {

    //this.cityList  = State?.getStatesOfCountry(event.target.value);

    let state = JSON.parse(event.target.value);
    this.selectedState = state;
    this.cityList = City.getCitiesOfState(state?.countryCode, state.isoCode);



  }

  public onCityChange(event) {




    let city = JSON.parse(event.target.value);
    this.selectedCity = city;
    //this.cityList = City.getCitiesOfState(state?.countryCode, state.isoCode);



  }

  public submitErrorMessage: boolean = false;

  public submitForm() {
    if (((this.myForm.get('channelName').value === null) && (this.myForm.get('EmailId').value === null && this.myForm.get('phoneNo').value === null && this.myForm.get('adminUser').value === null))) {
      this.submitErrorMessage = true;
      console.log("_____++++ Error Messgae");
    }
    else {

    this.CreateChannelPartner()
      console.log("_____++++ Error False");
      this.submitErrorMessage = false
    }

  }

  CreateChannelPartner(): any {
    let userAccountdetails = this.userAccountStore.getUserDetails();


    if (!this.myForm.valid) {

      return false;
    } else {



      var channelPartnerData = this.myForm.value;

      this.createChannalParterPayload = {
        name: channelPartnerData.channelName,


        address: [{
          "address": channelPartnerData.addressLine1,
          "street2": channelPartnerData.addressLine2,
          "state_code": "KA",
          "city": "Bengaluru",
          "state": "Karnataka",
          "zip": "560022",
          "country": "IN"

        }],
     
        firstName:channelPartnerData.userName,
        lastName:'',
        email:channelPartnerData.EmailId,
        countryCode:"+91",
        mobileNumber:channelPartnerData.phoneNo,
        role:"ChannelPartnerAdmin",
        createdBy: userAccountdetails._id,
        updatedBy: userAccountdetails._id,
        isNewUser:this.checknewUser(userAccountdetails)
   
      
    
    }

    this.savenewChannelPartner(this.createChannalParterPayload)

  

    this.form.reset();
  }
}


public savenewChannelPartner(request:any){
console.log("+_+_+_+_+_ Res Data ", request);

  this.subscription.push(
    this.adminPageService.addChannelPartner(request).subscribe(res=>{

    })
  )
}


public checknewUser(data){

 if(data.firstName){
  return true
 }
 else return false;
  
}


disableErrorMessage(){
  if (((this.myForm.get('userName').value === true) && (this.myForm.get('EmailId').value === null && this.myForm.get('phoneNo').value === null && this.myForm.get('adminUser').value === null)) ||
    ((this.myForm.get('userName').value === null) && (this.myForm.get('EmailId').value === true && this.myForm.get('phoneNo').value === true && this.myForm.get('adminUser').value === true))) {
    this.submitErrorMessage = false;
  }
}



}