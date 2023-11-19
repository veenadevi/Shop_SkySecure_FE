import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'app-cp-reassign-modal',
  templateUrl: './cp-reassign-modal.component.html',
  styleUrls: ['./cp-reassign-modal.component.css']
})
export class CpReassignModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userAccountStore : UserAccountStore,
    private adminPageService : AdminPageService
  ){}


  public form: FormGroup;
  public submitted = false;

  public subscription : Subscription[] = [];

  @Input('request')
  public request : any;

  @Output() passedData: EventEmitter<any> = new EventEmitter();


  public ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        messageText: ['', Validators.required],
        
      }
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public closeModal(){
    this.activeModal.close();
  }

  public CpReAssign(isReassign){
    this.submitted = true;
    if (this.form.invalid) { // If Invalid Return
      
      return;
    }
    else{
      

      let statusMessage=""

      if(isReassign){
        statusMessage="ChannalPartner  ReAssinged"
      }
      else{
        statusMessage="ChannalPartner  Rejected"
      }

      let userAccountdetails = this.userAccountStore.getUserDetails();



      let reqBody = {
        "cart_ref_id":this.request.cartData.cart_ref_id,
        "assignedAccountOwnerId":"",
        "leadStatusUpdate":statusMessage,
        "leadComment":[{
            "commentBy": userAccountdetails.firstName,
            "comment": this.form.value.messageText
      
      
        }],
        "isRevert":isReassign,
        "isReject":(!isReassign),
        "updatedBy": userAccountdetails._id,
        "assignedChannelPartnerId":this.request.cartData.assignedChannelPartnerId,
        "assignedChannelPartnerAdminId":this.request.cartData.assignedChannelPartnerAdminId
      }


      this.subscription.push(
        this.adminPageService.cpRejectReassign(reqBody).subscribe(res=>{
          
          this.passedData.emit("Success");
          this.activeModal.close();
          
          //window.location.reload();

        })
      )

      
      
    }
    
  }

}





