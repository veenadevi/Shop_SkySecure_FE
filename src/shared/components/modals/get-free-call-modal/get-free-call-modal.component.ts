import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/shared/services/user-profile.service';

@Component({
  selector: 'app-get-free-call-modal',
  templateUrl: './get-free-call-modal.component.html',
  styleUrls: ['./get-free-call-modal.component.css']
})
export class GetFreeCallModalComponent {

  public displayBasic: boolean = true; 

  private subscriptions : Subscription[] = [];

  public emailId : string;
  public phoneNo : string;
  public companyName : string;
  public messageText : string;
  


  constructor(
    private primengConfig: PrimeNGConfig,
    private userProfileService : UserProfileService,
    public activeModal: NgbActiveModal,
    ) {}


  public sendEmail(){
    this.displayBasic = false;

    this.subscriptions.push(
      this.userProfileService.sendEmailRequest().subscribe(res=>{
        // console.log("&&&&& ******** ++++++ Response in Email ", res);
      })
    )
  }

  public closeModal(){
    this.activeModal.close();
  }

}
