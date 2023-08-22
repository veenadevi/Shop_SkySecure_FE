import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';

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
    private router : Router
  ){}

  ngOnInit(): void {
    console.log("===============AccountListComponent=======")
    
    //this.accountData = this.sampleData.accounts.data;
    //this.info = this.sampleData.accounts.info;
    this.getAllAccounts();

  }

  public getAllAccounts(){
    this.subscriptions.push(
      this.adminPageService.getAllAccounts().subscribe( response => {
        this.accountData = response.accounts.data;
        this.info = response.accounts.info;

      })
    )
  }

  public getAccountById(accountId){

    let queryParams ={
      accountId : accountId
    }
   // this.router.navigate(['/admin-page/accounts-details'], {queryParams: queryParams});
  }
}
