import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { AssignLeadsModalComponent } from 'src/shared/components/modals/assign-leads-modal/assign-leads-modal.component';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { SuperAdminStore } from 'src/shared/stores/super-admin.store';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit{
  

  public subscriptions : Subscription[] = [];

  public accountData : any;

  public info : any;





  public allAccounts$ = this.adminPageService.getAllAccounts()
  .pipe(
    map(data => {
      if(data){
        this.accountData = data.accounts.data;
        this.info = data.accounts.info;
        return data;
        
      }
      else{
        return data;
      }
    }
    )
  )

  constructor(
    private adminPageService : AdminPageService,
    private router : Router,
    private modalService : NgbModal,
    private superAdminService : SuperAdminService,
    private superAdminStore : SuperAdminStore
  ){}

  ngOnInit(): void {
    console.log("===============AccountListComponent=======")
    
    //this.accountData = this.sampleData.accounts.data;
    //this.info = this.sampleData.accounts.info;
    this.getAllAccounts();
    this.getAllCRMUsers();

  }

  public getAllAccounts(){
    
      let a: any = this.sampleData();
        this.accountData = a.accounts.data;
        this.info = a.accounts.info;
    /*this.subscriptions.push(
      this.adminPageService.getAllAccounts().subscribe( response => {
        this.accountData = response.accounts.data;
        this.info = response.accounts.info;
        
        

      })
    )*/
  }

  public getAccountById(accountId){

    let queryParams ={
      accountId : accountId
    }
   // this.router.navigate(['/admin-page/accounts-details'], {queryParams: queryParams});
  }


  public assign(){
    const modalRef = this.modalService.open(AssignLeadsModalComponent, {size: 'lg', windowClass: 'assign-leads-modal-custom-class'});
    modalRef.componentInstance.request = null;
  }

  public getAllCRMUsers(){
    this.subscriptions.push(
      this.superAdminService.getAllCRMUsers().subscribe( res=> {
        console.log("_+_+_+_+_+_+ ", res);
        this.superAdminStore.setCrmUsers(res);
      })
    )
  }




  public sampleData(){
    return {
      "accounts": {
        "data": [{
            "Owner": {
              "name": "Realize Web Services",
              "id": "467371000000262001",
              "email": "rws@altsystech.com"
            },
            "Account_Type": null,
            "Account_Name": "test company",
            "id": "467371000000719057"
          },
          {
            "Owner": {
              "name": "Realize Web Services",
              "id": "467371000000262001",
              "email": "rws@altsystech.com"
            },
            "Account_Type": "Customer",
            "Account_Name": "Skysecuretech",
            "id": "467371000000718025"
          },
          {
            "Owner": {
              "name": "Realize Web Services",
              "id": "467371000000262001",
              "email": "rws@altsystech.com"
            },
            "Account_Type": "Customer",
            "Account_Name": "Skysecure Technology",
            "id": "467371000000717034"
          },
          {
            "Owner": {
              "name": "TestSP",
              "id": "467371000000386001",
              "email": "veena@altsystech.com"
            },
            "Account_Type": "Customer",
            "Account_Name": "SKYSECURE",
            "id": "467371000000717007"
          },
          {
            "Owner": {
              "name": "TestSP",
              "id": "467371000000386001",
              "email": "veena@altsystech.com"
            },
            "Account_Type": "Customer",
            "Account_Name": "SKYSECURE OWNER Update",
            "id": "467371000000717002"
          },
          {
            "Owner": {
              "name": "TestSP",
              "id": "467371000000386001",
              "email": "veena@altsystech.com"
            },
            "Account_Type": "Customer",
            "Account_Name": "SKYSECURE",
            "id": "467371000000715007"
          },
          {
            "Owner": {
              "name": "Realize Web Services",
              "id": "467371000000262001",
              "email": "rws@altsystech.com"
            },
            "Account_Type": "Customer",
            "Account_Name": "Sky Secure",
            "id": "467371000000715002"
          },
          {
            "Owner": {
              "name": "Realize Web Services",
              "id": "467371000000262001",
              "email": "rws@altsystech.com"
            },
            "Account_Type": "Customer",
            "Account_Name": "Skysecure Technologies",
            "id": "467371000000714035"
          },
        ],
        "info": {
          "per_page": 200,
          "count": 77,
          "page": 1,
          "sort_by": "id",
          "sort_order": "desc",
          "more_records": false
        }
      }
    }
  }
}
