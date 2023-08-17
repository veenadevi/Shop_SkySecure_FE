import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';
import Validation from '../utils/validation';
import * as CryptoJS from 'crypto-js';
import { UserProfileService } from 'src/shared/services/user-profile.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  form: FormGroup;
  formEmail : FormGroup;
  submitted = false;
  submittedEmail = false

  emailFormFlag : boolean = true;
  signUpFormFlag : boolean = false;
  public emailViaSignIn:String

  public enableSignInButton = false;
  public inValidOTP:boolean=false;

  public emailExisitAlert:boolean=false;

  public enableOTPButton = true;

  private subscriptions : Subscription[] = [];

  public otpField : boolean = false;

  public validatedEmail : string ;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    public router : Router,
    public route : ActivatedRoute,
    private userProfileService : UserProfileService
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    

      this.emailViaSignIn = params['email'];
    
   });


    this.formEmail = this.formBuilder.group(
      {
        email: [this.emailViaSignIn, [Validators.required, Validators.email]],
        otp : [],
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
        email: [],
        lastName : [],
        password :[],
        confirmPassword : [],
        /*password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],*/
        companyName : ['', Validators.required],
        mobileNumber : ['', Validators.required]
        //acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
    this.form.controls.email.disable();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f2(): { [key: string]: AbstractControl } {
    return this.formEmail.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.form.invalid) { // If Invalid Return
      // console.log("()()() Invalid");
      return;
    }
    else{ // If Valid
      // console.log("()()() Valid");
      
      
      //console.log(JSON.stringify(this.form.value, null, 2));
      let formValue = this.form.value;
      let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
      let hashedPass = CryptoJS.AES.encrypt(formValue.password, key).toString();
      let req = {
        "firstName":formValue.firstName,
        "lastName":formValue.lastName,
        "email":this.validatedEmail,
        //"password":hashedPass,
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

      this.subscriptions.push(
        
        this.authService.signUp(req).subscribe( res=> {
      
          this.router.navigate(['login'], { queryParams: { email: this.validatedEmail,succuessMessage:"Registered Successfully"} });
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

  public onSubmitEmail(){

    
    this.validatedEmail = this.formEmail.value.email;
    this.submittedEmail = true;
    this.form.controls['email'].setValue(this.validatedEmail);
    if (this.formEmail.invalid) { // If Invalid Return
      return;
    }
    else{ // If Valid
      

      let req = {
        "emailId" : this.formEmail.value.email,
        "action":"signUp"
      }

      this.subscriptions.push(
        this.userProfileService.sendOTP(req).subscribe( res=>{
          
    //console.log("sign up for exisitng user")
          if(res.message){
           // console.log("inside if")
            //this.emailFormFlag = true;
            //this.signUpFormFlag = false;
            this.enableSignInButton = false;
            this.enableOTPButton = false;
            this.otpField = false;
            this.emailExisitAlert=true
          }
          else{
           // console.log("inside else")
            //this.emailFormFlag = false;
            //this.signUpFormFlag = true;
            this.enableSignInButton = true;
            this.enableOTPButton = false;
            this.otpField = true;
          }
        }

        )
      )

    }
    
  }

  public validateOTP(){

    let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
      let hashedPass = CryptoJS.AES.encrypt(this.formEmail.value.otp, key).toString();
      let req = {
        "emailId":this.formEmail.value.email,
        "otp": hashedPass
      }

      
      
      this.subscriptions.push(
        this.userProfileService.validateOTP(req).subscribe( res => {
          if(res && res.data){
            this.emailFormFlag = false;
            this.signUpFormFlag = true;
            //this.callSignIn();
          }
          else{
            this.inValidOTP=true
         //   this.formEmail.value.otp='';
           // this.formEmail.setValue({otp: ''});
           this.formEmail.get('otp').reset();
          
            this.emailFormFlag = true;
            this.signUpFormFlag = false;
          }
        })
      )
  }
  public signIn(){

 
      this.router.navigate(['login'], { queryParams: { email: this.validatedEmail} });

  }

}


