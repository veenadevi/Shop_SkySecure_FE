import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';

@Component({
  selector: 'app-deals-details',
  templateUrl: './deals-details.component.html',
  styleUrls: ['./deals-details.component.css']
})
export class DealsDetailsComponent implements OnInit{


  public dealsId : any;

  private subscriptions : Subscription[] = [];

  public dealsData : any[] = [];

  public accounts : any;

  constructor(
    private route : ActivatedRoute,
    private adminPageService : AdminPageService
  ){}


  ngOnInit(): void {
    let params = this.route.snapshot.queryParamMap;

    

    if(params.has('dealsId')){
      console.log("***** )))))) ");
      this.dealsId = params.get('dealsId');
      //this.accountData = this.sampleData.accounts.data;
      this.getDealsDetails(this.dealsId);
    }
    else{
      // No Account
      console.log("***** )))))) Else");
    }
  }

  public getDealsDetails(dealsId){
    this.subscriptions.push(
      this.adminPageService.getDealsById(dealsId).subscribe(response => {
        console.log("&&&&&&& Data at alst ", response)
        if(response){
          this.accounts = response.account;
          this.dealsData = response.deals;
        }
        else{
          this.accounts = [];
          this.dealsData = [];
        }
      })
    )
  }
  
}
