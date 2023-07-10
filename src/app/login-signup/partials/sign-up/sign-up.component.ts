import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';
import Validation from '../utils/validation';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  form: FormGroup;
  submitted = false;

  private subscriptions : Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    public router : Router
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      }
    )
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        /*username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],*/
        email: ['', [Validators.required, Validators.email]],
        lastName : [],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        companyName : ['', Validators.required],
        mobileNumber : ['', Validators.required]
        //acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) { // If Invalid Return
      console.log("()()() Invalid");
      return;
    }
    else{ // If Valid
      console.log("()()() Valid");
      
      
      //console.log(JSON.stringify(this.form.value, null, 2));
      let formValue = this.form.value;
      let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
      let hashedPass = CryptoJS.AES.encrypt(formValue.password, key).toString();
      let req = {
        "firstName":formValue.firstName,
        "lastName":formValue.lastName,
        "email":formValue.email,
        "password":hashedPass,
        "company":formValue.companyName,
        "role": "developer",
        "countryCode":"+91",
        "mobileNumber":formValue.mobileNumber,
        "addressOne":{"name":"bangalore"},
        "addressTwo":{"name":"bangalore"},
        "state":"Karnataga",
        "pinCode":"766789",
        "country":"IN"
        }
        console.log("*(*(*(*(*(*( ",req);
      this.subscriptions.push(
        
        this.authService.signUp(req).subscribe( res=> {
          console.log("***** The res is ", res);
          this.router.navigate(['login']);
          //localStorage.setItem('XXXXaccess__tokenXXXX', res.data);
        })
      )
    }
    
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  public navigateToLogin(){
    this.router.navigate(['login']);
  }


}


