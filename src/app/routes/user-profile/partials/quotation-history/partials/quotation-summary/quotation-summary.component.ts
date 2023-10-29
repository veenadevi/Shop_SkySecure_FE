import { Component } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';

@Component({
  selector: 'app-quotation-summary',
  templateUrl: './quotation-summary.component.html',
  styleUrls: ['./quotation-summary.component.css']
})
export class QuotationSummaryComponent {

  public params : any;

  public accountDetails : any;

  public subscriptions : Subscription[] = [];

  public responseData : any;

  public cartData : any;

  public estimateData : any;

  public accountsData : any;

  public contactsData : any;


  
  
    

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private superAdminService : SuperAdminService,
    private primengConfig: PrimeNGConfig
  ){}


  ngOnInit(): void {
    this.params = this.route.snapshot.queryParamMap;

    this.accountDetails = JSON.parse(this.params.params.account);

    this.getLeadSummary(this.accountDetails);

   

    
   
  }


  public getLeadSummary(data){

    console.log("value pass to fetch details ==",data)
    this.subscriptions.push(
      this.superAdminService.getLeadSummaryDetails(data).subscribe(res=>{
       // console.log("+_+_+_C Data After Click", res.zohoBookEstimateData);
        this.responseData = res;
        this.cartData=res.cartData;
        this.estimateData = res.zohoBookEstimateData;
        this.accountsData =  res.zohoCRMAccountData;
        this.contactsData = res.zohoBookContactData?res.zohoBookContactData:null

      //  console.log("cartDetailsData  ",this.cartData)

      })
    )
  }


  navigateToQuotationHistory() {
    this.router.navigate(['/user-profile/quotation-history']);
}

 


}