import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit{

  public accountId : string;

  public accountData : any;
  public subscriptions : Subscription[] =[];

  constructor(
    private route : ActivatedRoute,
    private adminPageService : AdminPageService
  ){}

  public sampleData = {
    "accounts": {
      "data": [{
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "$currency_symbol": "$",
        "$field_states": null,
        "Account_Type": "Customer",
        "SIC_Code": null,
        "$sharing_permission": "full_access",
        "Last_Activity_Time": "2023-05-04T14:08:34+05:30",
        "Industry": null,
        "Account_Site": null,
        "$state": "save",
        "$process_flow": false,
        "Billing_Country": null,
        "$locked_for_me": false,
        "id": "467371000000405001",
        "$approval": {
          "delegate": false,
          "approve": false,
          "reject": false,
          "resubmit": false
        },
        "Enrich_Status__s": null,
        "Billing_Street": null,
        "Created_Time": "2023-05-04T14:08:32+05:30",
        "$editable": true,
        "Billing_Code": null,
        "Shipping_City": null,
        "Shipping_Country": null,
        "Shipping_Code": null,
        "Billing_City": null,
        "Created_By": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "$zia_owner_assignment": "owner_recommendation_unavailable",
        "Annual_Revenue": null,
        "Shipping_Street": null,
        "Ownership": null,
        "Description": null,
        "Rating": null,
        "Shipping_State": null,
        "$review_process": {
          "approve": false,
          "reject": false,
          "resubmit": false
        },
        "Website": null,
        "Employees": null,
        "Record_Image": null,
        "Modified_By": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "$review": null,
        "Phone": null,
        "Account_Name": "Alt",
        "$zia_visions": null,
        "Account_Number": "0",
        "Ticker_Symbol": null,
        "Modified_Time": "2023-05-04T14:08:32+05:30",
        "$orchestration": null,
        "Parent_Account": null,
        "$in_merge": false,
        "Locked__s": false,
        "Billing_State": null,
        "Fax": null,
        "$approval_state": "approved",
        "$pathfinder": null,
        "Last_Enriched_Time__s": null
      }]
    }
  }

  public ngOnInit(): void {
    let params = this.route.snapshot.queryParamMap;

    console.log("+++++ ((( ))) ******", params);



    if(params.has('accountId')){
      this.accountId = params.get('accountId');
      //this.accountData = this.sampleData.accounts.data;
      this.getAccountDetails(this.accountId);
    }
    else{
      // No Account
    }
  }

  public getAccountDetails(accountId){
    this.subscriptions.push(
      this.adminPageService.getAccountsById(accountId).subscribe(response => {
        console.log("+++++++ ------ +++++ ", response);
        this.accountData = response.accounts.data;
      })
    )
  }

}
