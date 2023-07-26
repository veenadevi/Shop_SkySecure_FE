import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { GetFreeCallModalComponent } from '../modals/get-free-call-modal/get-free-call-modal.component';

@Component({
  selector: 'contact-us-flyer',
  templateUrl: './contact-us-flyer.component.html',
  styleUrls: ['./contact-us-flyer.component.css']
})
export class ContactUsFlyerComponent {


  public displayBasic: boolean; 

  private subscriptions : Subscription[] = [];


  constructor(
    private primengConfig: PrimeNGConfig,
    private userProfileService : UserProfileService,
    private modalService : NgbModal
    ) {}

    ngOnInit() {
      this.primengConfig.ripple = true;
    }
    
    showBasicDialog() {
      //this.displayBasic = true;
      this.viewModal(null);
    }

    public viewModal(req) {
      const modalRef = this.modalService.open(GetFreeCallModalComponent);
      modalRef.componentInstance.request = req;
    }
    public sendEmail(){
      this.displayBasic = false;

      this.subscriptions.push(
        this.userProfileService.sendEmailRequest().subscribe(res=>{
          // console.log("&&&&& ******** ++++++ Response in Email ", res);
        })
      )
      

    }

}
