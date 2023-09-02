import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

    public productsData : any;
    

  constructor(
    private route : ActivatedRoute,
    private superAdminService : SuperAdminService,
    private primengConfig: PrimeNGConfig
  ){}


  ngOnInit(): void {
    this.params = this.route.snapshot.queryParamMap;

    this.accountDetails = JSON.parse(this.params.params.account);

    this.getLeadSummary(this.accountDetails);

    
   
  }


  public getLeadSummary(data){

    this.subscriptions.push(
      this.superAdminService.getLeadSummaryDetails(null).subscribe(res=>{
        console.log("+_+_+_C Data After Click", res.zohoBookEstimateData);
        this.productsData = res.zohoBookEstimateData;
      })
    )
  }


  

 


}
