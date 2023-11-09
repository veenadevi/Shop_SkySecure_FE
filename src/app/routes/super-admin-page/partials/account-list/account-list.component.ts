import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { AssignLeadsModalComponent } from 'src/shared/components/modals/assign-leads-modal/assign-leads-modal.component';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { SuperAdminStore } from 'src/shared/stores/super-admin.store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';
import { GetReasonModalComponent } from 'src/shared/components/modals/get-reason-modal/get-reason-modal.component';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit{
  
  @Input('matTooltip')
  @Input('matTooltipPosition')

  public subscriptions : Subscription[] = [];

  public accountData : any;
  public allMarketPlaceList : any;

  public info : any;
  public disableAssign :boolean=true;





  constructor(
    private adminPageService : AdminPageService,
    private router : Router,
    private modalService : NgbModal,
    private superAdminService : SuperAdminService,
    private superAdminStore : SuperAdminStore,
    public spinner: NgxSpinnerService,
    private toaster : ToasterNotificationService
  ){}


  // public allAccounts$ = this.adminPageService.getAllAccounts()
  // .pipe(
  //   map(data => {
  //     console.log("running here ==")
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

  ngOnInit(): void {
    this.spinner.show();
    console.log("===============AccountListComponent=======")
    
    //this.accountData = this.sampleData.accounts.data;
    //this.info = this.sampleData.accounts.info;
    //this.getAllAccounts();
    //this.getAllCRMUsers();
    this.getAllChannelPartners();
    this.getAllMarketPlaceAccountList();

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

  public getAllMarketPlaceAccountList(){
    this.spinner.show(); 
    // let a: any = this.sampleData();
    // this.accountData = [...a.accounts.data, ...a.accounts.data];
    // this.info = a.accounts.info;
    this.subscriptions.push(
   
    this.adminPageService.getAllMarketPlaceAccountList().subscribe( response => {
    
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

    this.router.navigate(['admin-pages/lead-summary'], {queryParams: queryParams});

   // this.router.navigate(['/admin-page/accounts-details'], {queryParams: queryParams});
  }


  public assign(account, i){
    const modalRef = this.modalService.open(AssignLeadsModalComponent, {size: 'lg', windowClass: 'assign-leads-modal-custom-class'});
  
    modalRef.componentInstance.request = account;
    

    modalRef.componentInstance.passedData.subscribe((res) => {
      //account.Owner.name
     
      //this.accountData[i].Owner.name = res.ownerName.name;
      //this.allMarketPlaceList[i].assignedChannalpartner=['channelPartner']['name'] = res.assignedName;
      this.allMarketPlaceList[i].assignedChannalpartner=
            {
              "channelPartner" : {
              "name" : res.assignedName
              }
            }
   //console.log("after assign",this.allMarketPlaceList[i].assignedChannalpartner)

    })
    
  }

  public getAllCRMUsers(){
    this.subscriptions.push(
      this.superAdminService.getAllChannelPartners().subscribe( res=> {
        console.log("_+_+_+_+_+_+ ", res);
        this.superAdminStore.setCrmUsers(res);
      })
    )
  }


  public getAllChannelPartners(){
    this.subscriptions.push(
      this.superAdminService.getAllChannelPartners().subscribe( res=> {
        console.log("_+_+getAllChannelPartners _+_+_+_+ ", res);
        if(res.channelPartners.length>0){
         this.disableAssign=false

        }
        this.superAdminStore.setChannelPartnerList(res);
      })
    )
  }

  public openReasonModal(){
    this.viewModal(null);
  }

  public viewModal(req) {
    const modalRef = this.modalService.open(GetReasonModalComponent);
    modalRef.componentInstance.request = req;
  }

 
}
