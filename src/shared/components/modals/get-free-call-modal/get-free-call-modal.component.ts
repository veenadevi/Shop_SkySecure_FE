import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MetadataService } from 'src/shared/services/metadata.service';
import { UserProfileService } from 'src/shared/services/user-profile.service';

@Component({
  selector: 'app-get-free-call-modal',
  templateUrl: './get-free-call-modal.component.html',
  styleUrls: ['./get-free-call-modal.component.css']
})
export class GetFreeCallModalComponent implements OnInit{

  public displayBasic: boolean = true; 

  private subscriptions : Subscription[] = [];

  public emailId : string;
  public phoneNo : string;
  public companyName : string;
  public messageText : string;


  public form: FormGroup;
  


  constructor(
    private primengConfig: PrimeNGConfig,
    private userProfileService : UserProfileService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private metadataService : MetadataService
    ) {}


    ngOnInit(): void {
      this.form = this.formBuilder.group(
        {
          //emailId: ['', [Validators.required, Validators.email]],
          emailId: [],
          phoneNo : [],
          companyName : [],
          messageText : []
        }
      )
    }
  public sendEmail(){
    this.displayBasic = false;

    this.subscriptions.push(
      this.userProfileService.sendEmailRequest().subscribe(res=>{
        // console.log("&&&&& ******** ++++++ Response in Email ", res);
      })
    )
  }

  public onSubmit(){
    var formValue = this.form.value;
    let req = {
      "name":"test Client",
      "email": formValue.emailId ? formValue.emailId : '',
      "mobileNumber": formValue.phoneNo ? formValue.phoneNo : '',
      "message": formValue.messageText ? formValue.messageText : '',
      "teamResponse":"",
      "assignedTo":"64ad793a3efc5f490fc6c45d",
      "createdBy":"veena",
      "updatedBy":"veena"
    }

    this.subscriptions.push(
      this.metadataService.sendCustomerSupport(req).subscribe( res=>{
        console.log("()()() ", res);
      })
    )

    console.log("()()() ", req);
  }

  public closeModal(){
    this.activeModal.close();
  }

}
