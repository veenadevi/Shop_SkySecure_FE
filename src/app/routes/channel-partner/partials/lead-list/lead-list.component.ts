import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { AssignLeadsAmModalComponent } from 'src/shared/components/modals/assign-leads-am-modal/assign-leads-am-modal.component';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { SuperAdminStore } from 'src/shared/stores/super-admin.store';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAccountStore } from 'src/shared/stores/user-account.store';


@Component({
  selector: 'lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css']
})
export class LeadListComponent implements OnInit{
  

  public subscriptions : Subscription[] = [];

  public accountData : any;
  public allMarketPlaceList : any;

  public info : any;
  public myChannelpartnerId:string



   


  constructor(
    private adminPageService : AdminPageService,
    private router : Router,
    private modalService : NgbModal,
    private superAdminService : SuperAdminService,
    private superAdminStore : SuperAdminStore,
    public spinner: NgxSpinnerService,
    private userAccountStore:UserAccountStore
  ){}


 

  ngOnInit(): void {
    this.spinner.show();
    console.log("===============AccountListComponent=======")
    
    //this.accountData = this.sampleData.accounts.data;
    //this.info = this.sampleData.accounts.info;
   // this.getAllAccounts();
    //this.getAllCRMUsers();
    let userAccountdetails = this.userAccountStore.getUserDetails();

    this.getMyChannelLeadList(userAccountdetails._id);
    this.getMyChannelAMList(userAccountdetails._id);

  }

  public getAllAccounts(){
    
      // let a: any = this.sampleData();
      // this.accountData = [...a.accounts.data, ...a.accounts.data];
      // this.info = a.accounts.info;
    this.subscriptions.push(
      this.adminPageService.getAllAccounts().subscribe( response => {
        console.log("running here directly==")
     
        this.accountData = response.accounts.data;
        this.info = response.accounts.info;
        
        

      })
    )
  }

  public getMyChannelLeadList(channelAdminUserId){
    this.spinner.show(); 
   
    this.subscriptions.push(
   
    this.adminPageService.getMyChannelLeadList(channelAdminUserId).subscribe( response => {
    
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
    const modalRef = this.modalService.open(AssignLeadsAmModalComponent, {size: 'lg', windowClass: 'assign-leads-modal-custom-class'});
  
    modalRef.componentInstance.request = account;
    console.log("()))_)_)_)_ Data Index ", i);

    modalRef.componentInstance.passedData.subscribe((res) => {
      //account.Owner.name
      //console.log("_+_+_+_ Outside ", res.ownerName.name);
      this.accountData[i].Owner.name = res.ownerName.name;
    })
    
  }

 



  public getMyChannelAMList(channelAdminUserId:any){
    this.subscriptions.push(
      this.superAdminService.getMyChannelPartnerAMList(channelAdminUserId).subscribe( res=> {
        console.log("_+_+getMyChannelAMList _+_+_+_+ ", res);
        this.superAdminStore.setMyChannelPartnerAMList(res);
      })
    )
  }



}
