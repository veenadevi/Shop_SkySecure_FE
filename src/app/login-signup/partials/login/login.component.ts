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
import { AddItemsToCartService } from 'src/shared/services/global-function-service/add-items-to-cart.service';

 
 

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
  // @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any;
  @ViewChild('ngOtpInput') ngOtpInputRef:any;
  private subscriptions : Subscription[] = [];

  public params : any;
  public emailViaSignup:String

  public cartObj:any;

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
    private userProfileService : UserProfileService,
    private addItemsToCartService : AddItemsToCartService
   

    ) {}

  ngOnInit(): void {
    this.signUpSuccess=false
    this.params = this.route.snapshot.queryParamMap;

    this.route.queryParams.subscribe(params => {
      console.log("params    =====",params)
      
      this.emailViaSignup= params['email'];
      this.cartObj=params
      // console.log("params    =====",this.cartObj)

      // console.log("currentRouteName    =====",this.cartObj['currentRouteName'])

    if(params['succuessMessage']){
      this.signUpSuccess=true
    }

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
    
    
      let req = {
        "emailId" : this.form.value.emailOrMobile,
        "action":"login",
        "isMobile": this.isMobile,
      }
      this.subscriptions.push(
        this.userProfileService.sendOTP(req).subscribe(
          res=>{
            
           
            
            if(res.message){
             
              this.enableSignInButton = false;
              this.enableOTPButton = false;
              this.newEmailAlert = true;
              this.otpField = false;
            }
            else{
             
            
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
        this.isResend=true
        clearInterval(this.timerInterval);
        this.inValidOTP=false;
        this.otpField = false;
       
        this.enableSignInButton = false;
            this.enableOTPButton = true;

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
        
          if(res && res.data){
            this.callSignIn();
          }
          else{
            
           
          
            let eleId=this.ngOtpInputRef.getBoxId(0);
            this.ngOtpInputRef.focusTo(eleId);
            
            this.ngOtpInputRef.setValue(''); 
            // this.form.get('otp').reset();
            this.enableSignInButton = true;
          //  this.enableOTPButton = true;
          //  this.newEmailAlert = true;
            this.otpField = true;
            this.inValidOTP=true;
          }
        })
      ) 
  }

  

  public callSignIn(){

    console.log("==========callSignIn  ")

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

      
          
          this.userAccountStore.setUserDetails(decoded);
          
         // console.log("Login Success=====")
         // console.log("params passed =====",this.params)
        //  var paramsMap=this.params.queryParams



          // console.log("========this.params=====",this.cartObj)

          // console.log("navigator route ",this.cartObj.currentRouteName)
       
          if(this.cartObj && this.cartObj.hasOwnProperty('productId')){

        //  console.log("user logged in ",localStorage.getItem("XXXXaccess__tokenXXXX"));

        //  console.log("can as ====")

          this.addItemsToCartService.addItemsToCart(this.cartObj);
         
     
      this.router.navigate([this.cartObj.currentRouteName]);

         this.cartObj=null
          }
          else{
          //  console.log('coming to else part')
         
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
  
    this.router.navigate(['login/signUp'],{ queryParams: { email: this.form.value.emailOrMobile}});

  
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
 // console.log("passing email as====", control.value)

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