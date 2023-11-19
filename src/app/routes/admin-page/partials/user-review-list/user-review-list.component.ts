
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { AssignLeadsModalComponent } from 'src/shared/components/modals/assign-leads-modal/assign-leads-modal.component';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { SuperAdminStore } from 'src/shared/stores/super-admin.store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';


@Component({
  selector: 'app-user-review-list',
  templateUrl: './user-review-list.component.html',
  styleUrls: ['./user-review-list.component.css']
})
export class UserReviewListComponent {

  public subscriptions : Subscription[] = [];

  public accountData : any;
  public allMarketPlaceList : any;

  public info : any;
  public disableAssign :boolean=true;


  // public myCustomers : any = [];


  public ProductReviewsData : any;
   


  constructor(
    private adminPageService : AdminPageService,
    private router : Router,
    private modalService : NgbModal,
    private superAdminService : SuperAdminService,
    private superAdminStore : SuperAdminStore,
    public spinner: NgxSpinnerService,
    private toaster : ToasterNotificationService
  ){}


 

  ngOnInit(): void {
    this.spinner.show();
   // console.log("===============ReviewListComponent=======")
    
    
    //this.getAllChannelPartners();
    //this.getAllMarketPlaceAccountList();

    this.getProductReviewsData();


  }

  public getProductReviewsData(){
    this.subscriptions.push(
      this.adminPageService.getProductReviewsList().subscribe(res=>{
       // console.log("***** Res", res);
        this.ProductReviewsData = res.productReviews;
      })
    )
  }

  // public getProductReviewsList(){

  //   this.subscriptions.push(
  //     this.adminPageService.getProductReviewsList().subscribe(res=>{
  //       console.log("_+_+_+_+_+_ API Result ", res);
  //       this.myCustomers = res;
  //       this.spinner.hide();
  //     },
  //     error => {
  //       this.spinner.hide();
  //       this.toaster.showWarning("Some Error Occurred! Please try again after sometime.",'')
  //     })
  //   )

  // }


  // public getCustomersById(id){
   
  //   this.router.navigate(['admin-pages/customer-view'],{ queryParams: { customerId: id}});
    
  // }


  /*public getAccountById(account){

    let acc = JSON.stringify(account);
    let queryParams ={
      account : acc,

    }
    console.log("navigate to detaisl page===",account)

    this.router.navigate(['admin-pages/lead-summary'], {queryParams: queryParams});

   
  }*/


  







 
}

