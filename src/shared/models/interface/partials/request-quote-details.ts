export interface RequestQuoteDetails{
    gstNo: string;
    gstType : string;
    gstFlag : boolean;
    name : string;
    emailId : string;
    countryCode : string;
    phoneNo : string;

    companyName : string;
    addressLine1 : string;
    addressLine2 : string;
    postalCode : string;
    country : string;
    state : string;
    city : string;
    billing_address : any;
    selectedChannelPartnerId : string
    selectedChannelPartnerAdminId  : string;


    
}