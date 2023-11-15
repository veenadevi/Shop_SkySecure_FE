import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { City, Country, State } from 'country-state-city';
import { RequestQuoteDetailsStore } from 'src/shared/stores/request-quote-details.store';

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

  @Output() businessDetailsAction = new EventEmitter();


  constructor(
    private reqQuoteDetailsStore : RequestQuoteDetailsStore,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    console.log("+_+_+_+_ Req Details Store Came in");
    let reqBody = this.reqQuoteDetailsStore.getReqQuoteDetails();
    console.log("+_+_+_+_ Req Details Store ", reqBody);


    this.countryList = Country.getAllCountries();
 

    this.setBusinessDetailsForm();
  }


  public setBusinessDetailsForm(){

    this.businessDetailsForm = this.formBuilder.group(
      {
        companyName : ['', Validators.required],
        phoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        countryCode : [],
        addressLine1 :['', Validators.required],
        addressLine2 :[''],
        countryName :[],
        stateName :[],
        citryName : [],
        postalCode : [],
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
    //console.log("+_+_+_+_+_+_ **** ", this.businessDetailsForm.get('countryName').value);
    
    this.onNextClickFlag = true;

    if(this.businessDetailsForm.invalid){
        //alert('Invalid');
        console.log("+++__+_ Invlaid");
    }
    else{
      console.log("+++__+_ Else");
      if(!this.selectedCountry || !this.selectedState || !this.selectedCity){
        console.log("+++__+_ AAAA");
        this.countryStateError = true;
      }
      else{
        console.log("+++__+_ BBBB");
        this.countryStateError = false;

        let businessDetails = {
          "attention": "Name",
          "address": this.businessDetailsForm.get('addressLine1').value,
          "street2": this.businessDetailsForm.get('addressLine2').value,
          "state_code": this.selectedState.isoCode,
          "city": this.selectedCity.name,
          "state": this.selectedState.name,
          "zip": this.businessDetailsForm.get('postalCode').value,
          "country": this.selectedCountry.isoCode,
          "phone": this.businessDetailsForm.get('phoneNo').value,
        }

        let reqBody = this.reqQuoteDetailsStore.getReqQuoteDetails();
        reqBody.billing_address = businessDetails;
        this.reqQuoteDetailsStore.setReqQuoteDetails(reqBody);
      
        this.businessDetailsAction.emit('next');
        
      }
      //alert('Valid')


    }

  }

}
