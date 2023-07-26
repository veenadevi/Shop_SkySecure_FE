import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router : Router,
    private adminPageService : AdminPageService
  ){}


  ngOnInit(): void {
    let params = this.route.snapshot.queryParamMap;

    

    if(params.has('dealsId')){
      // console.log("***** )))))) ");
      this.dealsId = params.get('dealsId');
      //this.accountData = this.sampleData.accounts.data;
      this.getDealsDetails(this.dealsId);
    }
    else{
      // No Account
      // console.log("***** )))))) Else");
    }
  }

  public getDealsDetails(dealsId){
    this.subscriptions.push(
      this.adminPageService.getDealsById(dealsId).subscribe(response => {
        // console.log("&&&&&&& Data at alst ", response)
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

  public craeteEstimate(deal){




    let queryParams = {
        org_Id:"60021207031",
        companyName: (this.accounts && this.accounts.length>0) ? this.accounts[0].Account_Name : '',
        userName:"veena59",
        phone:"9972835477",
        Billing_Street: "SAMPLE ADDRESS",
        Billing_City: "Bangalore",
        Billing_State: "Karnataka",
        Billing_Code: "560100",
        Billing_Country: "India",
        userId :"640f59c83d2d10005c34023e",
        cart_ref_id: 100040,
        products:[{
          productId:"6408c67ebc262d784813b71f",
          productName: deal.Deal_Name,
          quantity :15,
          price : deal.Expected_Revenue
        }]
  
    }


    //this.router.navigate(['admin-page/estimate-details']);
    this.subscriptions.push(
      this.adminPageService.createEstimate(queryParams).subscribe(res=>{
        // console.log("&&&&& Response In Create Estimate");

        //If Success
        this.router.navigate(['admin-page/estimate-details']);
      })
    )



  }
  
}
