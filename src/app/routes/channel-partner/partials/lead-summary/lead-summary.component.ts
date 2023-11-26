import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';

@Component({
  selector: 'lead-summary',
  templateUrl: './lead-summary.component.html',
  styleUrls: ['./lead-summary.component.css']
})
export class LeadSummaryComponent implements OnInit{

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
    private superAdminService : SuperAdminService,
    private primengConfig: PrimeNGConfig,
    public spinner: NgxSpinnerService,
  ){}


  ngOnInit(): void {
    this.params = this.route.snapshot.queryParamMap;

    this.accountDetails = JSON.parse(this.params.params.account);

    this.getLeadSummary(this.accountDetails);

   

    
   
  }


  public getLeadSummary(data){
    this.spinner.show()
   // console.log("value pass to fetch details ==",data)
    this.subscriptions.push(
      this.superAdminService.getLeadSummaryDetails(data).subscribe(res=>{
  
     //   console.log("+_+_+_C Data After Click", res.zohoBookEstimateData);
        this.responseData = res;
        this.cartData=res.cartData;
        this.estimateData = res.zohoBookEstimateData;
        this.accountsData =  res.zohoCRMAccountData;
        this.contactsData = res.zohoBookContactData?res.zohoBookContactData:null
        this.spinner.hide()

       // console.log("cartDetailsData  ",this.cartData)

      })
    )
  }


  

 


}
