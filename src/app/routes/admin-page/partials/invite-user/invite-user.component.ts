import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

import { Country, State, City } from "country-state-city";
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent {


  myForm: FormGroup;
  @Input('request')

  public gstResponseData : any;
  public gstData : boolean = false;
  public subscription : Subscription[] = [];
  public selectedCountrys: any;
  public selectedState: any;
  public selectedCity: any;
  public showMsg : boolean = false;
  public countryList: any;
  public stateList: any;
  public cityList: any;
  public usersList : any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private superAdminService : SuperAdminService,
    private userAccountStore: UserAccountStore,
    private adminPageService : AdminPageService,
    ) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [
        Validators.required,
        Validators.pattern(/^(\+\d{1,3})?\d{10}$/) // Country code (optional) + 10 digits
      ]],
      firstName : [''],
      lastName : [''],
      companyName : [''],
      reason : [''],
      gstin:[''],
      countryName: [''],
      addressLine1: [''],
      addressLine2: [''],
      stateName: [''],
      cityName: [''],
      postalCode: [''],
   
    });
  }

  selectedValue: any;
  ngOnInit(): void {
    this.countryList = Country.getAllCountries();

    this.selectedValue = this.countryList[0];

    this.setSelfData();
    this.getUsersList();

  }

  public getUsersList(){
    this.subscription.push(
      this.adminPageService.getAllusers().subscribe(res=> {
        
        this.usersList = res;
      })
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
      //this.selectedCountrys = allCountries.filter(c => c.isoCode === userDetails.countryCode)[0];
    }

    //this.countryList




    //formVal.countryName = userDetails.countryCode ? userDetails.countryCode : null;
    //formVal.stateName = userDetails.state ? userDetails.state : null;

    //formVal.gstNo = userDetails.gstinNumber ? userDetails.gstinNumber : null;



  }



public fetchGST(){
  console.log("_+_+_+_+_+ GST Data ", this.myForm.value.gstin.length )

  if(this.myForm.value.gstin.length === 15){

    // this.myForm.controls['companyName'].disable();
    // this.myForm.controls['addressLine1'].disable();
    // this.myForm.controls['addressLine2'].disable();
    // this.myForm.controls['postalCode'].disable();
    // this.myForm.controls['countryName'].disable();
    // this.myForm.controls['stateName'].disable();
    // this.myForm.controls['cityName'].disable();
    

    


    this.subscription.push(
    this.superAdminService.getGSTDetailsById(this.myForm.value.gstin).subscribe(res=>{

      const gstResult= res;

      

      

      this.gstResponseData = res;

      if(res && res.adress){
        this.gstData = true;
      }
      
  

      
      // this.myForm.controls['companyName'].setValue(res['legal-name'] ? res['legal-name'] : null);
      
      // this.myForm.controls['companyBusinessName'].setValue(res['legal-name'] ? res['legal-name'] : null);
      this.myForm.controls['addressLine1'].setValue(res.adress.floor ? res.adress.floor : null);
      this.myForm.controls['addressLine2'].setValue(res.adress.street ? res.adress.street : null);
      this.myForm.controls['postalCode'].setValue(res.adress.pincode ? res.adress.pincode : null);
      this.myForm.controls['stateName'].setValue(res.adress.state);


      let resState = res.adress.state;
      let resCity = res.adress.city;




      

      let stateList  = State?.getStatesOfCountry('IN');
      

      

      let selectedState = stateList.filter(c => c.name === resState)[0];
         
      this.selectedState = selectedState;

      

      /*let stateList  = State?.getStatesOfCountry('IN');
      this.stateList=State?.getStatesOfCountry('IN');
      
      

      let selectedState = stateList.filter(c => c.name === resState)[0];
     
      this.selectedState = selectedState;


      let cityList = City.getCitiesOfState('IN', this.selectedState.isoCode);
      this.cityList=City.getCitiesOfState('IN', this.selectedState.isoCode);
      

      let selectedCity = cityList.filter(c => c.name === resCity)[0];
      this.selectedCity = selectedCity;*/


      


      
      
      
    })
  )
}

}

  onSubmit() {
    if (this.myForm.valid) {

      let formData = this.myForm.value;
      
      //companyName email firstName lastName mobile
      let request = {
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "email": formData.email,
        "company": formData.companyName,
        //"role": "User",
        //"countryCode": "+91",
        "mobileNumber": formData.mobile,
        /*"fullAddress": [
                  {
                      "address1": "Electronic City",
                      "address2": "Phase1",
                      "state": "Karnataka",
                      "pincode": "560100",
                      "countryCode":"IN"
                  }
              ],*/
        //"isRegistered":false,
        //"isCustomer":false,
        "companyName": formData.companyName,
        // "inviteReason":formData.reason,
        "inviteReason":"newUserInvite",
        //"createdBy":"6516ba041c0858005370d13f",
        //"updatedBy":"6516ba041c0858005370d13f"
      }


      this.subscription.push(
        this.adminPageService.inviteUsers(request).subscribe(res=>{
          console.log("+_+_+_ Res ", res);
          this.showMsg=true;
          this.myForm.reset();
        })
      )

      //console.log('Form submitted:', this.myForm.value);
    }
  }


  

  public onCountryChange(event) {

    let country = JSON.parse(event.target.value);

    this.selectedCountrys = country;

    this.stateList = State?.getStatesOfCountry(country.isoCode);


  }


  public onStateChange(event) {

    //this.stateList  = State?.getStatesOfCountry(event.target.value);
 
     let state = JSON.parse(event.target.value);
     this.selectedState = state;
     this.cityList = City.getCitiesOfState(state?.countryCode, state.isoCode);
 
 
 
   }
 
   public onCityChange(event) {
 
     let city = JSON.parse(event.target.value);
     this.selectedCity = city;
  //  this.cityList = City.getCitiesOfState(this.selectedState?.countryCode, this.selectedState.isoCode);
 
 
 
   }


}
