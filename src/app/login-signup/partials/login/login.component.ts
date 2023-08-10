import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Validation from '../utils/validation';
import { AuthService } from 'src/shared/services/auth.service';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

import * as CryptoJS from 'crypto-js';
import { UserProfileService } from 'src/shared/services/user-profile.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  submitted = false;

  private subscriptions : Subscription[] = [];

  public params : any;

  public enableSignInButton = false;

  public enableOTPButton = true;

  public newEmailAlert : boolean = false;

  public inValidOTP:boolean=false;

  public otpField : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    public router : Router,
    public route : ActivatedRoute,
    private userAccountStore : UserAccountStore,
    private userProfileService : UserProfileService
    ) {}

  ngOnInit(): void {

    this.params = this.route.snapshot.queryParamMap;
    // console.log("()()()()() Inside is valid", this.params);

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
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
    let req = {
    
      "email":formValue.email,
      "password":hashedPass,
     
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
    if (this.form.invalid) { // If Invalid Return
      return;
    }
    else{ // If Valid
      
      

      console.log("*(*(*(*(* ", this.form.value.email);
      let req = {
        "emailId" : this.form.value.email,
        "action":"login"
      }
      this.subscriptions.push(
        this.userProfileService.sendOTP(req).subscribe(
          res=>{
            
            console.log("()()()()( ", res);
            
            if(res.message){
              console.log("()()()()( Inside If", res);
              this.enableSignInButton = false;
              this.enableOTPButton = true;
              this.newEmailAlert = true;
              this.otpField = false;
            }
            else{
              console.log("()()()()( Inside Else", res);
              this.enableSignInButton = true;
              this.enableOTPButton = false;
              this.newEmailAlert = false;
              this.otpField = true;
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

      console.log("(()()() ", this.newEmailAlert);

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

  public login(){
    //Login Logic

    //var passKey= "!ndia2320@securesky";
    let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
      let hashedPass = CryptoJS.AES.encrypt(this.form.value.otp, key).toString();
      let req = {
        "emailId":this.form.value.email,
        //"emailId" : "veena@skysecuretech.com",
        "otp": hashedPass
      }

      this.subscriptions.push(
        this.userProfileService.validateOTP(req).subscribe( res => {
          console.log("*(*(*(*(*( OTP Res", res);
          if(res && res.data){
            this.callSignIn();
          }
          else{
            this.inValidOTP=true;
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
        "emailId":this.form.value.email,
        "password": hashedPass
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
      )
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  public signUp(){
    this.router.navigate(['login/signUp']);
  }
  public navigateToHomePage(){
    this.router.navigate(['']);
  }
}

