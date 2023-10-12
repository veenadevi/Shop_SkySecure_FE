import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { AssignLeadsModalComponent } from 'src/shared/components/modals/assign-leads-modal/assign-leads-modal.component';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { SuperAdminStore } from 'src/shared/stores/super-admin.store';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'app-cpuser-lead-list',
  templateUrl: './cpuser-lead-list.component.html',
  styleUrls: ['./cpuser-lead-list.component.css']
})
export class CpuserLeadListComponent implements OnInit{
  

  public subscriptions : Subscription[] = [];

  public accountData : any;
  public allMarketPlaceList : any;

  public info : any;



   


  constructor(
    private adminPageService : AdminPageService,
    private router : Router,
    private modalService : NgbModal,
    private superAdminService : SuperAdminService,
    private superAdminStore : SuperAdminStore,
    public spinner: NgxSpinnerService,
    private userAccountStore:UserAccountStore
  ){}


  public allAccounts$ = this.adminPageService.getAllAccounts()
  .pipe(
    map(data => {
      console.log("running here ==")
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

  ngOnInit(): void {
    this.spinner.show();
    console.log("===============AccountListComponent=======")
    
    //this.accountData = this.sampleData.accounts.data;
    //this.info = this.sampleData.accounts.info;

    //this.getAllCRMUsers();
    let userAccountdetails = this.userAccountStore.getUserDetails();
    //this.getAllChannelPartners();
    this.getChannelAMAccountList(userAccountdetails._id);

  }

 
  public getChannelAMAccountList(channelAMuserId){
    this.spinner.show(); 
   
    this.subscriptions.push(
   
    this.adminPageService.getChannelAMAccountList(channelAMuserId).subscribe( response => {
    
      //console.log("running here directly==")
      this.allMarketPlaceList=response;
      this.spinner.hide();
    
      

    })
  )
}

  public getAccountById(account){

    let acc = JSON.stringify(account);
    let queryParams ={
      account : acc,

    }
    console.log("navigate to detaisl page===",account)

    this.router.navigate(['channel-partner/lead-summary'], {queryParams: queryParams});

   // this.router.navigate(['/admin-page/accounts-details'], {queryParams: queryParams});
  }


  public assign(account, i){
    const modalRef = this.modalService.open(AssignLeadsModalComponent, {size: 'lg', windowClass: 'assign-leads-modal-custom-class'});
  
    modalRef.componentInstance.request = account;
    console.log("()))_)_)_)_ Data Index ", i);

    modalRef.componentInstance.passedData.subscribe((res) => {
      //account.Owner.name
      //console.log("_+_+_+_ Outside ", res.ownerName.name);
      this.accountData[i].Owner.name = res.ownerName.name;
    })
    
  }

 


  public getAllChannelPartners(){
    this.subscriptions.push(
      this.superAdminService.getAllChannelPartners().subscribe( res=> {
        console.log("_+_+getAllChannelPartners _+_+_+_+ ", res);
        this.superAdminStore.setChannelPartnerList(res);
      })
    )
  }

  public getMyChannelUsersList(){
    this.subscriptions.push(
      this.superAdminService.getAllChannelPartners().subscribe( res=> {
        console.log("_+_+getAllChannelPartners _+_+_+_+ ", res);
        this.superAdminStore.setMyChannelPartnerAMList(res);
      })
    )
  }



}

