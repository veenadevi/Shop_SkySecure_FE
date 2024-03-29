import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

import { Country, State, City } from "country-state-city";
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

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
  public companyBusinessName:String;
  private subscriptions: Subscription[] = [];
  public companyListArray : any;
  public myCustomers : any;
  selectedCompany: string;
  showOptions: boolean = false;
   companyValue:any


  getGstCompany:boolean=false;
  isDataError:boolean=false
  contactError:boolean=false
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private superAdminService : SuperAdminService,
    private userAccountStore: UserAccountStore,
    private adminPageService : AdminPageService,
    ) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      mobile: ['', [ 
        Validators.pattern(/^(\+\d{1,3})?\d{10}$/) // Country code (optional) + 10 digits
      ]],
      firstName : ['',Validators.required],
      lastName : [''],
      companyName : [''],
      reason : [''],
      gstin:[''],
      countryName: [''],
      companyBusinessName:[''],
      addressLine1: [''],
      addressLine2: [''],
      stateName: [''],
      cityName: [''],
      postalCode: [''],
      isZohoCustomer:[''],
      triggeremail:['']

   
    });
  }

  selectedValue: any;
  userDetails:any;
  ngOnInit(): void {
    this.userDetails = this.userAccountStore.getUserDetails();
    this.countryList = Country.getAllCountries();

    this.selectedValue = this.countryList[0];

    this.setSelfData();
    this.getUsersList();
    this.getAllMyCustomers();

  }

  public getUsersList(){
    this.subscription.push(
      this.adminPageService.getAllusers().subscribe(res=> {
        
        this.usersList = res;
      })
    )
  }

  

  
  public setSelfData() {
   

    //let formVal = this.form.value;
    let formVal = this.myForm.value;

    let allCountries = Country.getAllCountries();

    //isoCode

    var index = allCountries.findIndex(el => el.isoCode === this.userDetails .countryCode);

    if (index >= 0) {

     
    }



  }


  public getAllMyCustomers(){

    this.subscriptions.push(
      this.adminPageService.getAllMyCustomers().subscribe(res=>{
        
        this.myCustomers = res;
        this.companyListArray = this.myCustomers;
        //this.spinner.hide();
      },
      error => {
        //this.spinner.hide();
        //this.toaster.showWarning("Some Error Occurred! Please try again after sometime.",'')
      })
    )

  }




public fetchGST(){
 // console.log("_+_+_+_+_+ GST Data ", this.myForm.value.gstin.length )

  if(this.myForm.value.gstin.length === 15){
    this.getGstCompany=true

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
      
      this.myForm.controls['companyBusinessName'].setValue(res['legal-name'] ? res['legal-name'] : null);
      this.selectedCompanyName=res['legal-name'] ? res['legal-name'] : null;
      this.myForm.controls['addressLine1'].setValue(res.adress.floor ? res.adress.floor : null);
      this.myForm.controls['addressLine2'].setValue(res.adress.street ? res.adress.street : null);
      this.myForm.controls['postalCode'].setValue(res.adress.pincode ? res.adress.pincode : null);
      this.myForm.controls['stateName'].setValue(res.adress.state);


      let resState = res.adress.state;
      let resCity = res.adress.city;




      

      let stateList  = State?.getStatesOfCountry('IN');
      

      

      let selectedState = stateList.filter(c => c.name === resState)[0];
         
      this.selectedState = selectedState;

      

   

      


      
      
      
    })
  )
}

}

  onSubmit() {
    
    let finalCompnayName=""

    if( this.selectedCompanyName===undefined){
  
     
    }
   
  else{
    finalCompnayName = (this.selectedCompanyName) ? this.selectedCompanyName : this.selectedCompanyName.company;
  }
    //finalCompnayName = (typeof(this.selectedCompanyName) === 'string') ? this.selectedCompanyName : this.selectedCompanyName.company;
    

    let isMobileOREmail= this.myForm.get('mobile').value.length>0 || this.myForm.get('email').value.length>0

  
    if(!isMobileOREmail){
      this.contactError=true
      return
    }
    else if (this.myForm.valid) {
      this.contactError=false

      let formData = this.myForm.value;
     // console.log("this.myForm.get('triggeremail').value===",formData.isZohoCustomer)
      //companyName email firstName lastName mobile
      let request = {
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "email": formData.email,
        // "company": formData.companyBusinessName,
      
        "company":this.companyValue,
        //"role": "User",
         "countryCode": "+91",
        "mobileNumber": formData.mobile,
        "fullAddress": [
                  {
                      "address1": formData.addressLine1,
                      "address2": formData.addressLine2,
                      "state":  this.selectedState.name,
                      "pincode": formData.postalCode,
                      "countryCode":"IN"
                  }
              ],
        //"isRegistered":false,
        "isCustomer":formData.isZohoCustomer?formData.isZohoCustomer:false,
        "companyBusinessName": this.companyValue,
        //formData.companyBusinessName?formData.companyBusinessName:formData.finalCompnayName,

        "gstinNumber":formData.gstin?formData.gstin:"",
        // "inviteReason":formData.reason,
        "inviteReason":"newUserInvite",
        "createdBy":this.userDetails._id,
        "updatedBy":this.userDetails._id,
        "sendEmail":formData.triggeremail?formData.triggeremail:false
      }

    
      this.subscription.push(
        this.adminPageService.inviteUsers(request).subscribe(res=>{
         // console.log("+_+_+_ Res ", res);
     
          this.showMsg=true;
        //  this.myForm.reset();
          window.location.reload();
        })
      )
    

     // console.log('Form submitted:',request);
    }
    else if(!finalCompnayName || finalCompnayName.length<=0){
      return;
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
   showDefaultContent: boolean = true;
   showAlternateContent: boolean = false;
   showDefault() {
    this.showDefaultContent = true;
    this.showAlternateContent = false;
  }
  
  showAlternate() {
    let formData = this.myForm.value;
   
   
    if( this.selectedCompanyName===undefined){
  
      this.companyValue  =formData.companyBusinessName.length>0?formData.companyBusinessName:''
    }
   
  else{
    this.companyValue = (this.selectedCompanyName) ? this.selectedCompanyName : this.selectedCompanyName.company;
  }


    // console.log("formData.companyBusinessName  ",formData.companyBusinessName)
    //  companyValue=!formData.companyBusinessName?formData.companyBusinessName:formData.finalCompnayName
   
   
    if(  this.companyValue===undefined|| formData.addressLine2.length==0 || (this.selectedState===undefined)){
    
      this.showDefaultContent = true;
      this.showAlternateContent = false; 
      this.isDataError=true
    }
 else{

  this.isDataError=false
  this.showDefaultContent = false;
  this.showAlternateContent = true;
 }
   
  }


 
  // myCustomers = [/* your options array */];

  onChange() {
    
    
    this.selectedCarObj = this.myCustomers.find((c)=> c.company==this.selectedCompany);
    

    if(this.selectedCompany && this.selectedCompany.length>3){
      let sampleStr : any = this.selectedCompany.toLowerCase();
     

      this.companyListArray = this.myCustomers.filter(function (str) { return str.company.toLowerCase().includes(sampleStr); });
      
      this.showOptions = true;
    }
    
    
  }

  identify(index, item) {
    return item.id;
  }

  selectOption(option) {

 
    
    this.selectedCompany = option;
    this.showOptions = false;
  }


  public selectedCompanyName; 

  filterCompany(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.myCustomers as any[]).length; i++) {
        let country = (this.myCustomers as any[])[i];
        if (country.company.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.companyListArray = filtered;
}


  // selectedCar = "";
  selectedCarObj: any = {};

  
}
