import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent {
  myForm: FormGroup;

  public subscription : Subscription[] = [];

  public showMsg : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminPageService : AdminPageService
    ) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [
        Validators.required,
        Validators.pattern(/^(\+\d{1,3})?\d{10}$/) // Country code (optional) + 10 digits
      ]],
      firstName : [''],
      lastName : [''],
      companyName : [''],
      reason : ['']
   
    });
  }

  onSubmit() {
    if (this.myForm.valid) {

      let formData = this.myForm.value;
      
      //companyName email firstName lastName mobile
      let request = {
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "email": formData.email,
        "company": formData.companyName,
        //"role": "User",
        //"countryCode": "+91",
        "mobileNumber": formData.mobile,
        /*"fullAddress": [
                  {
                      "address1": "Electronic City",
                      "address2": "Phase1",
                      "state": "Karnataka",
                      "pincode": "560100",
                      "countryCode":"IN"
                  }
              ],*/
        //"isRegistered":false,
        //"isCustomer":false,
        "companyName": formData.companyName,
        "inviteReason":formData.reason,
        //"createdBy":"6516ba041c0858005370d13f",
        //"updatedBy":"6516ba041c0858005370d13f"
      }


      this.subscription.push(
        this.adminPageService.inviteUsers(request).subscribe(res=>{
          console.log("+_+_+_ Res ", res);
          this.showMsg=true;
          this.myForm.reset();
        })
      )

      //console.log('Form submitted:', this.myForm.value);
    }
  }
}
