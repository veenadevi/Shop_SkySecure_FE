import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { AssignLeadsModalComponent } from 'src/shared/components/modals/assign-leads-modal/assign-leads-modal.component';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { SuperAdminStore } from 'src/shared/stores/super-admin.store';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'quotation-history',
  templateUrl: './quotation-history.component.html',
  styleUrls: ['./quotation-history.component.css']
})
export class QuotationHistoryComponent implements OnInit {

 
  public subscriptions : Subscription[] = [];

  public accountData : any;
  public allMarketPlaceList : any;

  public info : any;
  public userId:any;





  public allAccounts$ = this.adminPageService.getAllAccounts()
  .pipe(
    map(data => {
     // console.log("running here ==")
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
    private superAdminStore : SuperAdminStore,
    private userProfileService:UserProfileService,
    private userAccountStore : UserAccountStore,
    public spinner: NgxSpinnerService
  ){}

  ngOnInit(): void {
   // console.log("===============AccountListComponent=======")
    
    //this.accountData = this.sampleData.accounts.data;
    //this.info = this.sampleData.accounts.info;
    let userAccountdetails = this.userAccountStore.getUserDetails();
    this.userId=userAccountdetails._id;
    //console.log("userAccountdetails  ",userAccountdetails._id)
    //this.getAllAccounts();
   // this.getAllCRMUsers();
    // console.log("userAccountdetails",userAccountdetails,"this.userId",this.userId)
    this.getMyMarketplaceAccountList();
   

  }

  

  public getMyMarketplaceAccountList(){
   
    this.spinner.show(); 
    // let a: any = this.sampleData();
    // this.accountData = [...a.accounts.data, ...a.accounts.data];
    // this.info = a.accounts.info;
  this.subscriptions.push(
    this.userProfileService.getMyMarketplaceAccountList(this.userId).subscribe( response => {
      //console.log("running here directly==")
      this.allMarketPlaceList=response;
      // console.log("response",response,  ) 
      // console.log("updated date:", response.cartData ) 
      this.allMarketPlaceList.sort((a, b) => {
        const dateA = a?.cartData?.updatedAt ? new Date(a.cartData.updatedAt) : null;
        const dateB = b?.cartData?.updatedAt ? new Date(b.cartData.updatedAt) : null;

        if (dateA && dateB) {
          return dateB.getTime() - dateA.getTime();
        } else {
          return 0;
        }
      });
      
      this.spinner.hide();   

    })
   
  )
 
}  

  public getAccountById(account, status){

    let acc = JSON.stringify(account);
    let queryParams ={
      account : acc,
    }

    // console.log("account",account)
    if(status === 'In Cart'){
      this.router.navigate(['/cart']);
    }
    else{
      this.router.navigate(['user-profile/quotation-summary'], {queryParams: queryParams});
    }

    

   // this.router.navigate(['/admin-page/accounts-details'], {queryParams: queryParams});
  }


  

 




}
