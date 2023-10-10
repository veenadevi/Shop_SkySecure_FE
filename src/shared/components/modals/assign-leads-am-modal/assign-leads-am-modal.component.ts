import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { SuperAdminStore } from 'src/shared/stores/super-admin.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'app-assign-leads-am-modal',
  templateUrl: './assign-leads-am-modal.component.html',
  styleUrls: ['./assign-leads-am-modal.component.css']
})
export class AssignLeadsAmModalComponent implements OnInit{

  public groupedCities : any;




  public myChannelAMList : any;

  

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

 
  public myChannelAMList$ = this.superAdminStore.myChannelAMList$
  .pipe(
    map(data => {
      if(data){
      console.log("_+_+_+_+_+_+ myChannelAMList", data);
        return data;
        
      }
      else{
        return data;
      }
    }
    )
  )

   
  ngOnInit(): void {
 
   this.getMyChannelAMList();
  }


  public getMyChannelAMList(){
    this.subscriptions.push(
      this.myChannelAMList$.subscribe(res=>{

        console.log("in model what is the am list data ===",res)
        
        this.myChannelAMList = res.usersList
        ;
        console.log("in model ===",this.myChannelAMList
        )
        
        //this.selectedUser = res[0];
      })
    )
  }

  public submit(){
    

    let userAccountdetails = this.userAccountStore.getUserDetails();
    //console.log("++_+_+_+_+_+_+_+ _Data here", this.selectedUser);
   console.log("++_+_+_+_+_+_+_+ _Data here", this.request);

      let req = {
        "cart_ref_id":this.request.cartData.cart_ref_id,
        "assignedAccountOwnerId":this.selectedUser._id,
         "leadStatusUpdate":"ChannalPartner AM Assigned",
        "leadComment":"",
        "updatedBy":userAccountdetails._id


      
      }
     




   
    this.subscriptions.push(
      this.superAdminService.assignLeadsToChannelPartnerAM(req).subscribe(res=>{
        
       // if(res && res.assignownerResult && res.assignownerResult.code === 'SUCCESS'){
        if(res){
         //  res.assignownerResult.ownerName = this.selectedUser;
         console.log("in model=====",this.selectedUser)
         res['assignedName'] = this.selectedUser.firstName
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
    console.log("this.selectedUser  ",this.selectedUser)
  }
}
