import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { SuperAdminStore } from 'src/shared/stores/super-admin.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'app-assign-leads-modal',
  templateUrl: './assign-leads-modal.component.html',
  styleUrls: ['./assign-leads-modal.component.css']
})
export class AssignLeadsModalComponent implements OnInit{

  public groupedCities : any;

  public crmUsersList : any;

  public channelPartnerList : any;

  selectedCity: string | undefined;

  selectedUser : any;

  private subscriptions : Subscription[] = [];

  public closingDate : Date | undefined;

  @Input('request')
  public request : any;

  @Output() passedData: EventEmitter<any> = new EventEmitter();



  constructor(
    private superAdminService : SuperAdminService,
    private superAdminStore : SuperAdminStore,
    private activeModal : NgbActiveModal,
    private userAccountStore :UserAccountStore
  ){
    
  }

   // Cart Click

   public crmUsers$ = this.superAdminStore.crmUsers$
   .pipe(
     map(data => {
       if(data){
        //console.log("_+_+_+_+_+_+ In Ser", data);
         return data;
         
       }
       else{
         return data;
       }
     }
     )
   )


   public channelPartnerList$ = this.superAdminStore.channelPartnerList$
   .pipe(
     map(data => {
       if(data){
      
         return data;
         
       }
       else{
         return data;
       }
     }
     )
   )
  ngOnInit(): void {
   this.getAllCRMUsers();
   this.getAllChannelPartner();
  }

  public getAllCRMUsers(){
    this.subscriptions.push(
      this.crmUsers$.subscribe(res=>{
        
        this.crmUsersList = res;
        
        //this.selectedUser = res[0];
      })
    )
  }

  public getAllChannelPartner(){
    this.subscriptions.push(
      this.channelPartnerList$.subscribe(res=>{
        
        this.channelPartnerList = res.channelPartners
        ;
        
        
        //this.selectedUser = res[0];
      })
    )
  }

  public submit(){
    

    let userAccountdetails = this.userAccountStore.getUserDetails();



//Setting up assignChannelPartner PayLoad 

      let req = {
        "cart_ref_id":this.request.cartData.cart_ref_id,
        "assignedChannelPartnerId":this.selectedUser._id,
        "assignedAccountOwnerId":"",
        "leadStatusUpdate":"ChannalPartner Assigned",
        "updatedBy":userAccountdetails._id


      
      }
     




   
    this.subscriptions.push(
      this.superAdminService.assignChannelPartner(req).subscribe(res=>{
        
       // if(res && res.assignownerResult && res.assignownerResult.code === 'SUCCESS'){
        if(res){
         //  res.assignownerResult.ownerName = this.selectedUser;
       
         res['assignedName'] = this.selectedUser.channelPartnerMaster.name
           this.passedData.emit(res);
          this.activeModal.close();
        }
        
      })
    )

    //this.passedData.emit("ABCD")
    
  }

  public onCancelClick(){
    this.activeModal.close();
  }

  public onChange(event){
    
    this.selectedUser = event.value;

  }
}
