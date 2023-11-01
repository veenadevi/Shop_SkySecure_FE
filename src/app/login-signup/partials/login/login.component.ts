import { Component,ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import Validation from '../utils/validation';
import { AuthService } from 'src/shared/services/auth.service';
import { Observable, Subscription, of } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

import * as CryptoJS from 'crypto-js';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { NgOtpInputConfig } from 'ng-otp-input';
 

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;

  submitted = false;
  otp:any
  showOtpComponent = true;
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any;

  private subscriptions : Subscription[] = [];

  public params : any;
  public emailViaSignup:String

  public enableSignInButton = false;
  public signUpSuccess:boolean=false

  public enableOTPButton = true;

  public newEmailAlert : boolean = false;

  public inValidOTP:boolean=false;

  public otpField : boolean = false;

  public timerInterval: any;

  public isMobile: boolean = false;

  public isResend:boolean=false;

  static isMobile: boolean;




  display: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    public router : Router,
    public route : ActivatedRoute,
    private userAccountStore : UserAccountStore,
    private userProfileService : UserProfileService
    ) {}

  ngOnInit(): void {
    this.signUpSuccess=false
    this.params = this.route.snapshot.queryParamMap;
    // console.log("()()()()() Inside is valid", this.params);

    this.route.queryParams.subscribe(params => {
      
      this.emailViaSignup= params['email'];
     

    if(params['succuessMessage']){
      this.signUpSuccess=true
    }
   // console.log("is success isnup  "  +this.signUpSuccess)
      // Use the email value as needed
    });

    this.form = this.formBuilder.group(
      {
        emailOrMobile: [this.emailViaSignup, [Validators.required,emailOrMobileValidator]],
        otp : []
        /*password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],*/
      }
    )
    


    let formValue = this.form.value;
    let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
    let hashedPass = CryptoJS.AES.encrypt(formValue.password, key).toString();





    const mobilePattern = /^\d{10}$/;
    this.isMobile= mobilePattern.test(this.form.value.emailOrMobile) 

    this.isResend=false

    
    let req = {
    
      "email":formValue.emailOrMobile,
      "password":hashedPass,
      "isMobile": this.isMobile,
     
      }
      // console.log("*(*(*(*(*(*( ",req);
      this.subscriptions.push(
        
      // this.authService.signUp(req).subscribe( res=> {
      //   console.log("***** The res is ", res);
      //   this.router.navigate(['']);
      //   //localStorage.setItem('XXXXaccess__tokenXXXX', res.data);
      // })
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    
    this.submitted = true;
    this.signUpSuccess=false
    this.isResend=false
    
    if (this.form.invalid) { // If Invalid Return
      return;
    }
    else{ // If Valid
      
      const mobilePattern = /^\d{10}$/;
      this.isMobile= mobilePattern.test(this.form.value.emailOrMobile) 
  
      this.isResend=false
    
      console.log("*(*(*(*(* ", this.form.value.emailOrMobile);
      let req = {
        "emailId" : this.form.value.emailOrMobile,
        "action":"login",
        "isMobile": this.isMobile,
      }
      this.subscriptions.push(
        this.userProfileService.sendOTP(req).subscribe(
          res=>{
            
           // console.log("()()()()( ", res);
            
            if(res.message){
             // console.log("()()()()( Inside If", res);
              this.enableSignInButton = false;
              this.enableOTPButton = false;
              this.newEmailAlert = true;
              this.otpField = false;
            }
            else{
             
             // console.log("()()()()( Inside Else", res);
              this.enableSignInButton = true;
              this.enableOTPButton = false;
              this.newEmailAlert = false;
              this.otpField = true;
              this.timer(1);
            }
          },
          err => {
              this.enableSignInButton = false;
              this.enableOTPButton = true;
              this.newEmailAlert = true;
              this.otpField = false;
             
          },
        ) 
      )

    //  console.log("(()()() ", this.newEmailAlert);

      /*let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
      let hashedPass = CryptoJS.AES.encrypt(this.form.value.password, key).toString();
      let req = {
        "email":this.form.value.email,
        "password":hashedPass
      }
      this.subscriptions.push(
        this.authService.signin(req).subscribe( res=> {
          
          localStorage.setItem('XXXXaccess__tokenXXXX', res.data);
          var decoded = jwtDecode(res.data);
          
          this.userAccountStore.setUserDetails(decoded);
          

          if(this.params && this.params.has('productId')){
            
          }
          else{
            this.router.navigate(['']);
          }
          
        })
      )*/
    }
    
  }


  timer(minute) {
    // let minute = 1;
    let seconds: number = minute * 59;
    let textSec: any = '0';
    let statSec: number = 59;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(0.59)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        this.isResend=true
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }


  public login(){
  

    const mobilePattern = /^\d{10}$/;
    this.isMobile= mobilePattern.test(this.form.value.emailOrMobile) 

    this.isResend=false
    let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
      let hashedPass = CryptoJS.AES.encrypt(this.otp, key).toString();
      // let req = {
      //   "emailId":this.form.value.email,
      //   //"emailId" : "veena@skysecuretech.com",
      //   "otp": hashedPass
      // }
      let req={
        "emailId":(!this.isMobile)?this.form.value.emailOrMobile:'',
        "otp": hashedPass,
        "mobileNumber":(this.isMobile)?this.form.value.emailOrMobile:'',
      }

      this.subscriptions.push(
        this.userProfileService.validateOTP(req).subscribe( res => {
        // console.log("*(*(*(*(*( OTP Res", res);
          if(res && res.data){
            this.callSignIn();
          }
          else{
            this.inValidOTP=true;
            this.form.get('otp').reset();
            this.enableSignInButton = true;
          //  this.enableOTPButton = true;
          //  this.newEmailAlert = true;
            this.otpField = true;
          }
        })
      )

    
  }

  public callSignIn(){

    var passKey= "!ndia2320@securesky";
    let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
      let hashedPass = CryptoJS.AES.encrypt(passKey, key).toString();
      let req = {
        "emailOrMobile":this.form.value.emailOrMobile,
        "password": hashedPass,
        "isMobile":this.isMobile
      }
      this.subscriptions.push(
        this.authService.signin(req).subscribe( res=> {
          
          localStorage.setItem('XXXXaccess__tokenXXXX', res.data);
          var decoded = jwtDecode(res.data);

          //console.log("decoded value=====",decoded)
          
          this.userAccountStore.setUserDetails(decoded);
          

          if(this.params && this.params.has('productId')){
           // console.log("_+_+_)+_+_+_+_+ Inside Product ID ", this.params);
            this.router.navigate(['']);
          }
          else{
         //   console.log("_+_+_)+_+_+_+_+ Inside Product Else ", this.params);
            this.router.navigate(['']);
          }
          
        })
      )
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  public signUp(){
  
    this.router.navigate(['login/signUp'],{ queryParams: { email: this.form.value.email}});

  
  }
  public navigateToHomePage(){
    this.router.navigate(['']);
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
   
  // setVal(val:any) {
  //   console.log("set value",this.ngOtpInput.setValue(val))
  //   this.ngOtpInput.setValue(val);
  // }
  // onConfigChange() {
  //   this.showOtpComponent = false;
  //   this.otp = null;
  //   setTimeout(() => {
  //     console.log("set valuetimeout")
  //     this.showOtpComponent = true;
  //   }, 0);
  // }
   

  onOtpChange(otp: any) {
    this.otp = otp;
   // console.log("this.otp", this.otp);
    if (otp.length === 6) {
      this.login();
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

        LoginComponent.isMobile = true;
      }
      return null;

    }
  }
  
 // invalidEmailOrMobile=true
  //console.log("what is validatation result ==", invalidEmailOrMobile)
 

  return of( {invalidEmailOrMobile:true});


}