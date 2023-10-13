import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';

import * as sampleData from '../sample.json';

@Component({
  selector: 'app-customer-details-view',
  templateUrl: './customer-details-view.component.html',
  styleUrls: ['./customer-details-view.component.css']
})
export class CustomerDetailsViewComponent implements OnInit{


  private subscriptions : Subscription[] = [];

  public customerData : any;

  constructor(
    public route : ActivatedRoute,
    public adminPageService : AdminPageService
  ){}


  ngOnInit(): void {
    
    /*let params = this.route.snapshot.queryParamMap;

    if(params.has('customerId')){
    }
    else{
      return;
    }*/

    this.setCustomerDetailsData();


  }


  public setCustomerDetailsData(){

    /*this.subscriptions.push(
      this.adminPageService.getCustomerDetailsById(null).subscribe(res=>{
        console.log("_+_))() Response Here", res);
      })
    )*/

    this.customerData = sampleData;
    console.log("+_+_+_+ Data ", this.customerData.customerEstimates);

  }


}
