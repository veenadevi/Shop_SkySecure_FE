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
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';


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
  public disableAssign :boolean=true;


   


  constructor(
    private adminPageService : AdminPageService,
    private router : Router,
    private modalService : NgbModal,
    private superAdminService : SuperAdminService,
    private superAdminStore : SuperAdminStore,
    public spinner: NgxSpinnerService,
    private userAccountStore:UserAccountStore,
    private toaster : ToasterNotificationService
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
    error => {
      this.spinner.hide();
      this.toaster.showWarning("Some Error Occurred! Please try again after sometime.",'')
    }

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
   
     
      

    },
    error => {
      this.spinner.hide();
      this.toaster.showWarning("Some Error Occurred! Please try again after sometime.",'')
    }
    )
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
    
    modalRef.componentInstance.passedData.subscribe((res) => {
      console.log("()))_)_)_)_ Data Index ", res);

      //account.Owner.name
      //console.log("_+_+_+_ Outside ", res.ownerName.name);
     // this.accountData[i].Owner.name = res.ownerName.name;

    //  this.allMarketPlaceList[i]?.assignedChannelpartnerAM?.firstName =res.assignedName

      this.allMarketPlaceList[i].assignedChannelpartnerAM=
            {
             
              "firstName" : res.assignedName
            
            }
        console.log("after assignment ==",this.allMarketPlaceList[i].assignedChannelpartnerAM.firstName)
         //   this.allMarketPlaceList[i].assignedChannelpartnerAM.
      //this.accountData[i].Owner.name = res.assignedName;

    
        // {
        //   "channelPartner" : {
        //   "name" : 'res.assignedName'
        //   }
        // }
    })
    
  }

 



  public getMyChannelAMList(channelAdminUserId:any){
    this.subscriptions.push(
      this.superAdminService.getMyChannelPartnerAMList(channelAdminUserId).subscribe( res=> {
        console.log("_+_+getMyChannelAMList _+_+_+_+ ", res);
        if(res.usersList.length>0){
          this.disableAssign=false
 
         }
        this.superAdminStore.setMyChannelPartnerAMList(res);
      })
    )
  }



}
