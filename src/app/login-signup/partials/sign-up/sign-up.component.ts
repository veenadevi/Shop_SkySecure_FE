import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';
import Validation from '../utils/validation';
import * as CryptoJS from 'crypto-js';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { BlockableUI } from 'primeng/api';
import { CompressOutlined } from '@mui/icons-material';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})



export  class SignUpComponent  {

  form: FormGroup;
  formEmail: FormGroup;
  //signupForm: FormGroup;
  submitted = false;
  submittedEmail = false
  otp: any
  showOtpComponent = true;
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any;

  emailFormFlag: boolean = true;
  signUpFormFlag: boolean = false;
  public emailViaSignIn: String

  public enableSignInButton = false;
  public inValidOTP: boolean = false;

  public emailExisitAlert: boolean = false;
  public invalidDomain: boolean = false;

  public enableOTPButton = true;

  private subscriptions: Subscription[] = [];

  public otpField: boolean = false;

  public validatedEmail: string;

  public timerInterval: any;

  public isMobile: boolean = false;

  display: any;
  static isMobile: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private fb: FormBuilder
  ) {
    this.formEmail = this.fb.group(
      {
        emailOrMobile: [this.emailViaSignIn, [Validators.required,emailOrMobileValidator]],
        otp: [],
      }
    )
}




  //   onSubmit01() {
  //     // Handle OTP generation and sending here based on whether it's an email or mobile number.

  //  //   const emailOrMobile = this.signupForm.get('emailOrMobile').value;

  //   }

  
  ngOnInit(): void {


    this.route.queryParams.subscribe(params => {
      this.emailViaSignIn = params['email'];

    });





    
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],

        emailOrMobile: [],
        lastName: [],
        password: [],
        confirmPassword: [],

        companyName: ['', Validators.required],
        mobileNumber: ['', [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$'),
          Validators.maxLength(10)
        ]]
        //acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
    this.form.controls.emailOrMobile.disable();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f2(): { [key: string]: AbstractControl } {
    return this.formEmail.controls;
  }
  // get f3(): { [key: string]: AbstractControl } {
  //   return this.signupForm.controls;
  // }
  // onKeyDown(event: KeyboardEvent): void {
  //   const key = event.key;
  //   if (key === 'E') {
  //     event.preventDefault();
  //   }
  // }


  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) { // If Invalid Return
      // console.log("()()() Invalid");
      //   console.log(this.form.value);
      return;
    }
    else { // If Valid
      // console.log("()()() Valid");


      //console.log(JSON.stringify(this.form.value, null, 2));
      let formValue = this.form.value;
      let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
      let hashedPass = CryptoJS.AES.encrypt(formValue.password, key).toString();
      let req = {
        "firstName": formValue.firstName,
        "lastName": formValue.lastName,
        "validatedEmail": this.validatedEmail,

        //"password":hashedPass,
        "company": formValue.companyName,
        "role": "Customer",
        "countryCode": "+91",
        "mobileNumber": formValue.mobileNumber,
        "addressOne": { "name": "bangalore" },
        "addressTwo": { "name": "bangalore" },
        "state": "Karnataga",
        "pinCode": "766789",
        "country": "IN"
      }

      this.subscriptions.push(

        this.authService.signUp(req).subscribe(res => {

          this.router.navigate(['login'], { queryParams: { email: this.validatedEmail, succuessMessage: "Registered Successfully" } });
          //localStorage.setItem('XXXXaccess__tokenXXXX', res.data);
        })
      )
    }

  }

  timer(minute) {
    // let minute = 1;
    let seconds: number = minute * 45;
    let textSec: any = '0';
    let statSec: number = 45;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 45;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(0.45)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  public navigateToLogin() {
    this.router.navigate(['login']);
  }

  public onSubmitEmail() {


    this.validatedEmail = this.formEmail.value.emailOrMobile;
    console.log(" this.validatedEmail   ", this.validatedEmail)
    this.submittedEmail = true;
    this.form.controls['emailOrMobile'].setValue(this.validatedEmail);
    if (this.formEmail.invalid) { // If Invalid Return


      console.log(" validation failed",this.formEmail.get('emailOrMobile').hasError('emailOrMobile'))
      return;
    }
    else { // If Valid

      console.log("pass====")

      const mobilePattern = /^\d{10}$/;
     this.isMobile= mobilePattern.test(this.formEmail.value.emailOrMobile) 
      let req = {
        "emailId": this.formEmail.value.emailOrMobile,
        "action": "signUp",
        "isMobile": this.isMobile,
      }

      this.subscriptions.push(
        this.userProfileService.sendOTP(req).subscribe(res => {

          //console.log("sign up for exisitng user")
          if (res.message) {
            // console.log("coming for error message")
            // console.log("error message========"+res.message)
            if (res.message == 'Error: Invalid Domain') {

              this.invalidDomain = true;
              this.enableOTPButton = true;

            }
            else {
              this.emailExisitAlert = true
            }
            this.inValidOTP = false
            // console.log("outside iff====")
            this.enableSignInButton = false;
            this.enableOTPButton = true;
            this.otpField = false;
            // this.emailExisitAlert=true
            // this.invalidDomain=true
          }
          else {
            // console.log("inside els====",res)
            //this.emailFormFlag = false;
            //this.signUpFormFlag = true;
            this.enableSignInButton = true;
            this.invalidDomain = false;
            this.enableOTPButton = false;
            this.otpField = true;
            this.timer(1);
          }
        }

        )
      )

    }

  }

  public validateOTP() {
    // console.log("iNSIDE VALIDATE OTP")
    let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
    let hashedPass = CryptoJS.AES.encrypt(this.otp, key).toString();
    let req = {
      "emailId": this.formEmail.value.email,
      "otp": hashedPass
    }

    //   console.log("this.formEmail.value.email",this.formEmail.value.email)

    this.subscriptions.push(
      this.userProfileService.validateOTP(req).subscribe(res => {
        //  console.log("RES & RES.DATA",res && res.data)
        if (res && res.data) {
          this.emailFormFlag = false;
          this.signUpFormFlag = true;
          //this.callSignIn();
          // console.log("iNSIDE VALIDATE OTP IF PART")
        }
        else {
          // console.log("iNSIDE VALIDATE OTP ELSE PART",res && res.data)
          this.inValidOTP = true
          //   this.formEmail.value.otp='';
          // this.formEmail.setValue({otp: ''});
          this.formEmail.get('otp').reset();

          this.emailFormFlag = true;
          this.signUpFormFlag = false;
        }
      })
    )
  }
  public signIn() {

    //console.log("iNSIDE SIGN IN")
    this.router.navigate(['login'], { queryParams: { email: this.validatedEmail } });

  }



  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "43px",
      height: "43px",
    },
  };


  onOtpChange(otp: any) {
    this.otp = otp;
    //console.log("this.otp", this.otp);
    if (otp.length === 6) {
      //  this. onSubmitEmail();
    }
  }

}


export  function emailOrMobileValidator(control: AbstractControl):Observable<ValidationErrors | any>  {
  console.log("passing email as====", control.value)

  //console.log("is access?", this.isMobile)

  const value = control.value;
  //let invalidEmailOrMobile: any = false;
  if (value) {
    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // Regular expression for mobile number validation (adjust it based on your requirements)
    const mobilePattern = /^\d{10}$/;
    if (emailPattern.test(value) || mobilePattern.test(value)) {

      if (mobilePattern.test(value)) {

        SignUpComponent.isMobile = true;
      }
      return null;

    }
  }
  
 // invalidEmailOrMobile=true
  //console.log("what is validatation result ==", invalidEmailOrMobile)
 

  return of( {invalidEmailOrMobile:true});


}

