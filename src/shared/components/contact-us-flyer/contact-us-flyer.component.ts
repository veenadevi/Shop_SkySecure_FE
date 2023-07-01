import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/shared/services/user-profile.service';

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
    private userProfileService : UserProfileService
    ) {}

    ngOnInit() {
      this.primengConfig.ripple = true;
    }
    
    showBasicDialog() {
      this.displayBasic = true;
    }

    public sendEmail(){
      this.displayBasic = false;

      this.subscriptions.push(
        this.userProfileService.sendEmailRequest().subscribe(res=>{
          console.log("&&&&& ******** ++++++ Response in Email ", res);
        })
      )
      

    }

}
