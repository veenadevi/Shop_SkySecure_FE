import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { City, Country, State } from 'country-state-city';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { RequestQuoteDetailsStore } from 'src/shared/stores/request-quote-details.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit{


  public businessDetailsForm;

  public onNextClickFlag : boolean = false;

  public countryList : any;
  public selectedCountry : any;
  public selectedState : any;
  public selectedCity : any;

  public stateList : any;
  public cityList : any;

  public countryStateError : boolean = false;

  public selectedCompanyName; 

  public myCustomers : any = [];

  public companyListArray : any = [];

  public subscriptions : Subscription[] = [];
  public companyNameErrorFlag : boolean = false;

  @Output() businessDetailsAction = new EventEmitter();




  constructor(
    private reqQuoteDetailsStore : RequestQuoteDetailsStore,
    private formBuilder: FormBuilder,
    private userAccountStore : UserAccountStore,
    private adminPageService : AdminPageService
  ){}

  ngOnInit(): void {
    this.getAllMyCustomers();
    console.log("+_+_+_+_ Req Details Store Came in");
    let reqBody = this.reqQuoteDetailsStore.getReqQuoteDetails();
    console.log("+_+_+_+_ Req Details Store ", reqBody);


    this.countryList = Country.getAllCountries();
 

    this.setBusinessDetailsForm();
  }


  public setBusinessDetailsForm(){

    this.businessDetailsForm = this.formBuilder.group(
      {
        companyName : [''],
        //phoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        countryCode : [],
        addressLine1 :[''],
        addressLine2 :['',Validators.required],
        countryName :[],
        stateName :[],
        citryName : [],
        postalCode : [''],//accepting only numbers
      });
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
public goBack(){
    this.businessDetailsAction.emit('back');
}

  public onNextClick(){

    this.countryStateError = false;
    this.companyNameErrorFlag = false;
    //console.log("+_+_+_+_+_+_ **** ", this.businessDetailsForm.get('countryName').value);
    
    this.onNextClickFlag = true;
    console.log("this.selectedCompanyName  ",this.selectedCompanyName)
    if(!this.selectedCompanyName || this.selectedCompanyName === '' || this.selectedCompanyName ==='undefined'){
      this.companyNameErrorFlag = true;
    }

    if(this.businessDetailsForm.invalid){
        //alert('Invalid');
        console.log("+++__+_ Invlaid");
    }
   
   
    else{
      this.companyNameErrorFlag = false;
      console.log("+++__+_ Else");
      if(!this.selectedCountry || !this.selectedState || !this.selectedCity){
        
        console.log("+++__+_ AAAA");
        this.countryStateError = true;
      }
      else{
        console.log("+++__+_ BBBB");
        this.countryStateError = false;

        let userDetails = this.userAccountStore.getUserDetails();

        let businessDetails = {
          "attention": "Name",
          "address": this.businessDetailsForm.get('addressLine1').value,
          "street2": this.businessDetailsForm.get('addressLine2').value,
          "state_code": this.selectedState.isoCode,
          "city": this.selectedCity.name,
          "state": this.selectedState.name,
          "zip": this.businessDetailsForm.get('postalCode').value,
          "country": this.selectedCountry.isoCode,
          "phone": ""
        }

        let reqBody = this.reqQuoteDetailsStore.getReqQuoteDetails();
        reqBody.billing_address = businessDetails;
        reqBody.companyName = (typeof(this.selectedCompanyName) === 'string') ? this.selectedCompanyName : this.selectedCompanyName.company;
        this.reqQuoteDetailsStore.setReqQuoteDetails(reqBody);
      
        this.businessDetailsAction.emit('next');
        
      }
      //alert('Valid')


    }

  }

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

}
