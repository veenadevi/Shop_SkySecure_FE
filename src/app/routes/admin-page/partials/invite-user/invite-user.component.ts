import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [
        Validators.required,
        Validators.pattern(/^(\+\d{1,3})?\d{10}$/) // Country code (optional) + 10 digits
      ]]
   
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, perform your action here
      console.log('Form submitted:', this.myForm.value);
    }
  }
}
