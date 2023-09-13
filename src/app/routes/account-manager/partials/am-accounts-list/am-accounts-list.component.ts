import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'am-accounts-list',
  templateUrl: './am-accounts-list.component.html',
  styleUrls: ['./am-accounts-list.component.css']
})
export class AmAccountsListComponent {

  public subscriptions : Subscription[] = [];

  public accountData : any;

  public info : any;
  public myEmail:string;
  public userId:string;


  public sampleData = {
    "accounts": {
      "data": [{
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "Alt",
        "id": "467371000000405001"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "Altsystech",
        "id": "467371000000402003"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "Altsystech",
        "id": "467371000000402002"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "Altsystech",
        "id": "467371000000397012"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "Altsystech",
        "id": "467371000000396029"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "Altsystech",
        "id": "467371000000396013"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "Altsystech",
        "id": "467371000000396008"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "Altsystech",
        "id": "467371000000396002"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "Altsystech",
        "id": "467371000000393002"
      }, {
        "Owner": {
          "name": "TestSP",
          "id": "467371000000386001",
          "email": "veena@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "TestAltsys_new",
        "id": "467371000000380123"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "TestAltsys_new",
        "id": "467371000000380118"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "TestAltsys_new",
        "id": "467371000000378155"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": null,
        "Account_Name": "FROM API",
        "id": "467371000000366002"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "testingapi companyName",
        "id": "467371000000347002"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "Test Altsys",
        "id": "467371000000318007"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "RWS_COMPANY",
        "id": "467371000000318001"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": null,
        "Account_Name": "FROM API",
        "id": "467371000000312007"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": null,
        "Account_Name": "FROM API",
        "id": "467371000000311023"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "Test Altsys",
        "id": "467371000000311018"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": null,
        "Account_Name": "FROM API",
        "id": "467371000000311013"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": null,
        "Account_Name": "FROM API",
        "id": "467371000000311008"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": null,
        "Account_Name": "FROM API",
        "id": "467371000000311003"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "TestedForAPI1",
        "id": "467371000000289002"
      }, {
        "Owner": {
          "name": "Realize Web Services",
          "id": "467371000000262001",
          "email": "rws@altsystech.com"
        },
        "Account_Type": "Customer",
        "Account_Name": "TestedForAPI1",
        "id": "467371000000282008"
      }],
      "info": {
        "per_page": 200,
        "count": 176,
        "page": 1,
        "sort_by": "id",
        "sort_order": "desc",
        "more_records": false
      }
    }
  }


  // public myAssignedAccounts$ = this.adminPageService.getMyAssignedAccounts(this.myEmail)
  // .pipe(
  //   map(data => {
  //     if(data){
  //       this.accountData = data.accounts.data;
  //       this.info = data.accounts.info;
  //       return data;
        
  //     }
  //     else{
  //       return data;
  //     }
  //   }
  //   )
  // )

  constructor(
    private adminPageService : AdminPageService,
    private router : Router,
    private userAccountStore : UserAccountStore,
  ){}

  ngOnInit(): void {
    
    //this.accountData = this.sampleData.accounts.data;
    //this.info = this.sampleData.accounts.info;
    let userAccountdetails = this.userAccountStore.getUserDetails();

    //this.myEmail=userAccountdetails.email
    //hard coded to komal for testimng
    this.myEmail="komal.verma@skysecuretech.com"
    this.userId=userAccountdetails._id
    this.getMyAssignedAccounts();
    

  }

  public getMyAssignedAccounts(){
    this.subscriptions.push(
      this.adminPageService.getMyAssignedAccounts(this.userId).subscribe( response => {
        this.accountData = response;
       // this.info = response.accounts.info;

      })
    )
  }

  public getAccountById(accountId){

    let queryParams ={
      accountId : accountId
    }
    this.router.navigate(['/admin-page/accounts-details'], {queryParams: queryParams});
  }
}

