import { RequestQuoteDetails } from "../interface/partials/request-quote-details";

export class RequestQuoteDetailsModel implements RequestQuoteDetails {

    public gstNo : string;
    public gstType : string;
    public gstFlag : boolean;
    public name : string;
    public emailId : string;
    public countryCode : string;
    public phoneNo : string;

    public companyName : string;
    public addressLine1 : string;
    public addressLine2 : string;
    public postalCode : string;
    public country : string;
    public state : string;
    public city : string;

    public billing_address : billingAddress;
   
  
    constructor(args : Partial<RequestQuoteDetailsModel>) {
      Object.assign(this, args);
    } 
  
  }


  export class billingAddress{
        attention: string;
        address: string;
        street2: string;
        state_code: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        phone: string;
  }