import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { Country, State, City } from "country-state-city";
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';


interface CreateChannalParterPayload {
  name: String,
  address: Array<any>,
  gstin:String,
  firstName: String,
  lastName: String,
  email: String,
  countryCode: String,
  mobileNumber: String,
  role: String,
  createdBy: String,
  updatedBy: String,
  isNewUser: boolean,
  companyBusinessName:String

}

@Component({
  selector: 'app-add-new-channel-partner',
  templateUrl: './add-new-channel-partner.component.html',
  styleUrls: ['./add-new-channel-partner.component.css']
})

export class AddNewChannelPartnerComponent implements OnInit{

  createChannalParterPayload: CreateChannalParterPayload;
  public subscription: Subscription[] = [];
  myForm: FormGroup;
  @Input('request')
  public countryList: any;


  
  public selectedAdminuser:any;
  

  public stateList: any;

  public cityList: any;
  public showMsg:boolean
  public duplicate:boolean;

  public selectedCountrys: any;
  public selectedState: any;
  public selectedCity: any;
  public form: FormGroup;
  public companyBusinessName:String;

  public selectedCSP : any;

  public addAdminOption : any = "new";

  public usersList : any[] = [];

  countries: any[] | undefined;

  selectedCountry: string | undefined;

  public gstData : boolean = false;

  public gstResponseData : any;

  //public addAdminOption = "Add Existing User";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private adminPageService : AdminPageService,

    private formBuilder: FormBuilder,
    private userAccountStore: UserAccountStore,
    private superAdminService : SuperAdminService,
  ) {

    this.myForm = this.fb.group({
      channelName:[, Validators.required],
      gstin:[''],
      countryName: ['India'],
      addressLine1: [''],
      addressLine2: [''],
      stateName: [''],
      cityName: [''],
      postalCode: [''],
      credit: ['0'],
      userName:['', [Validators.required, Validators.required]],
      EmailId: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      country : [''],
      selectedAdminuser:['']

    });

      
  }


  selectedValue: any;
  ngOnInit(): void {

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
  ];


    this.countryList = Country.getAllCountries();

    this.selectedValue = this.countryList[0];
  //  this.setForm();
    this.setSelfData();
    this.getUsersList();
    this.showMsg=false;
    this.duplicate=false;

  }

  public setForm() {
    //this.form = this.formBuilder.group(
    this.myForm = this.formBuilder.group(
      {
        channelName: ['', Validators.required],
        gstin:[],
        countryName:[],
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
        selectedAdminuser:['']






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
      //this.selectedCountrys = allCountries.filter(c => c.isoCode === userDetails.countryCode)[0];
    }

    //this.countryList




    //formVal.countryName = userDetails.countryCode ? userDetails.countryCode : null;
    //formVal.stateName = userDetails.state ? userDetails.state : null;

    //formVal.gstNo = userDetails.gstinNumber ? userDetails.gstinNumber : null;



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

  public submitErrorMessage: boolean = false;

  public submitForm() {
    if (this.myForm.invalid){
      this.submitErrorMessage = true;
      console.log("_____submit form ++++ Error Messgae");
    }
    else {

    this.CreateChannelPartner()
      console.log("_____++++ Error False");
      this.submitErrorMessage = false
    }
  //  this.CreateChannelPartner()
  }

  CreateChannelPartner(): any {
    let userAccountdetails = this.userAccountStore.getUserDetails();
   

   if (!this.myForm.valid) {

      return false;
    } else {



      var channelPartnerData = this.myForm.value;

      this.createChannalParterPayload = {
        name: channelPartnerData.channelName,
        gstin:channelPartnerData.gstin,
        companyBusinessName:this.companyBusinessName,

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

  

   
  }
}


public savenewChannelPartner(request:any){


  this.subscription.push(
    this.adminPageService.addChannelPartner(request).subscribe( res =>{
     
        this.showMsg=true
        this.duplicate=false
        this.myForm.reset();
     
    },
    
    (error) => {
    this.duplicate=true
    this.showMsg=false
    }
    )
  )
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
      this.companyBusinessName=res['legal-name'] ? res['legal-name'] : ''
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

public radioClick(){
  

  if(this.addAdminOption === 'new'){
    this.myForm.controls['EmailId'].enable();
    this.myForm.controls['phoneNo'].enable();
  }
  else{
    if(this.usersList.length>0){
  // this.getUsersList();
    }
    else{
      this.getUsersList();
    }
    this.myForm.controls['EmailId'].setValue(null);
    this.myForm.controls['phoneNo'].setValue(null);
    this.myForm.controls['userName'].setValue(null);
    this.myForm.controls['EmailId'].disable();
    this.myForm.controls['phoneNo'].disable();
  }
}

public getUsersList(){
  this.subscription.push(
    this.adminPageService.getAllusers().subscribe(res=> {
      
      this.usersList = res;
    })
  )
}

public onDropDownChange(item:any){
  console.log("selectedValue1  ===",item.target.value)
  const selectedValue = item.target.value;
  console.log("selectedValue  ===",selectedValue)


  const userMap = new Map<string, any>();
  this.usersList.forEach(user => {
    userMap.set(user._id.toString(), user);
  });
  const selecteduser = userMap.get(selectedValue);
   console.log("selecteduser  "+selecteduser._id)




  this.myForm.controls['phoneNo'].enable();
  this.myForm.controls['EmailId'].enable();
  
  this.myForm.controls['EmailId'].setValue(selecteduser.email);
  this.myForm.controls['phoneNo'].setValue(selecteduser.mobileNumber);
  this.myForm.controls['userName'].setValue(selecteduser.firstName);


  
  
  
}


selectAdminUserDetails(event: any) {

  console.log("======dropdown selection===",event)
  this.selectedAdminuser=event.value
  if(this.selectedAdminuser){
    this.myForm.controls['phoneNo'].enable();
  this.myForm.controls['EmailId'].enable();
  
  this.myForm.controls['EmailId'].setValue(this.selectedAdminuser.email);
  this.myForm.controls['phoneNo'].setValue(this.selectedAdminuser.mobileNumber);
  this.myForm.controls['userName'].setValue(this.selectedAdminuser.firstName);

 
  }
  else{
    // this.registrationForm.reset();
    // location.reload();
    // this.addDynamicElementNew = null;
  }
  
}



}