import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';

@Component({
  selector: 'estimate-details',
  templateUrl: './estimate-details.component.html',
  styleUrls: ['./estimate-details.component.css']
})
export class EstimateDetailsComponent implements OnInit{

  public subscriptions : Subscription[] = [];

  public estimatesData : any;

  constructor(
    private adminPageService : AdminPageService
  ){}

  ngOnInit(): void {
    
    this.getEstimateData();

  }
  
  public getEstimateData(){
    this.subscriptions.push(
      this.adminPageService.getEstimateDetails().subscribe(res=>{
        // console.log("***** Res", res);
        this.estimatesData = res.estimates;
      })
    )
  }

}
