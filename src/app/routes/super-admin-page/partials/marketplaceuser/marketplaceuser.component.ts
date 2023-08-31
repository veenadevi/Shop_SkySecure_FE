// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { AssignLeadsModalComponent } from 'src/shared/components/modals/assign-leads-modal/assign-leads-modal.component';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { SuperAdminStore } from 'src/shared/stores/super-admin.store';

@Component({
  selector: 'app-marketplaceuser',
  templateUrl: './marketplaceuser.component.html',
  styleUrls: ['./marketplaceuser.component.css']
})
export class MarketplaceuserComponent implements OnInit {

  public subscriptions : Subscription[] = [];

  public usersData : any=[];

  public info : any;
  public totalusersCount:number





  public allAccounts$ = this.adminPageService.getAllusers()
  .pipe(
    map(data => {
      if(data){
        this.usersData = data.data;
    
        return data;
        
      }
      // else{
      //   return data;
      // }
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
    this.getAlluser();
    // this.getAllCRMUsers();

  }

  public getAlluser(){
  console.log("fetching All users")
    this.subscriptions.push(
      this.adminPageService.getAllusers().subscribe( response => {

        console.log("fetched user data ",response)
        this.usersData = response;
      this.totalusersCount=response.length;
      console.log("===== this.totalusersCoun  ", this.totalusersCount)
        
        

      })
    )
  }

  public getAccountById(accountId){

    let queryParams ={
      accountId : accountId
    }
   // this.router.navigate(['/admin-page/accounts-details'], {queryParams: queryParams});
  }


  public assign(account, i){
    const modalRef = this.modalService.open(AssignLeadsModalComponent, {size: 'lg', windowClass: 'assign-leads-modal-custom-class'});
    modalRef.componentInstance.request = account;
    console.log("()))_)_)_)_ Data Index ", i);

    modalRef.componentInstance.passedData.subscribe((res) => {
      
    })
    
  }

  public getAllCRMUsers(){
    this.subscriptions.push(
      this.superAdminService.getAllCRMUsers().subscribe( res=> {
        console.log("_+_+_+_+_+_+ ", res);
        this.superAdminStore.setCrmUsers(res);
      })
    )
  }






}
