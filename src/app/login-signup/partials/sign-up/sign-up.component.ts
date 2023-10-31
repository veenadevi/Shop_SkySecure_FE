import { Component ,ViewChild} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';
import Validation from '../utils/validation';
import * as CryptoJS from 'crypto-js';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { BlockableUI } from 'primeng/api';

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
  otp:any
  showOtpComponent = true;
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any;

  emailFormFlag : boolean = true;
  signUpFormFlag : boolean = false;
  public emailViaSignIn:String

  public enableSignInButton = false;
  public inValidOTP:boolean=false;

  public emailExisitAlert:boolean=false;
  public invalidDomain:boolean=false;

  public enableOTPButton = true;

  private subscriptions : Subscription[] = [];

  public otpField : boolean = false;

  public validatedEmail : string ;

  public timerInterval: any;
  display: any;

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
        mobileNumber : ['', [
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
    this.form.controls.email.disable();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f2(): { [key: string]: AbstractControl } {
    return this.formEmail.controls;
  }
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key; 
    if (key === 'E') {
      event.preventDefault();  
    }
  }
   

  onSubmit(): void {
    this.submitted = true;
    
    if (this.form.invalid) { // If Invalid Return
      // console.log("()()() Invalid");
   //   console.log(this.form.value);
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
        "role": "Customer",
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
           // console.log("coming for error message")
           // console.log("error message========"+res.message)
            if(res.message=='Error: Invalid Domain'){
              
              this.invalidDomain=true;
              this.enableOTPButton = true;
             
            }
            else{
              this.emailExisitAlert=true
            }
            this.inValidOTP=false
           // console.log("outside iff====")
            this.enableSignInButton = false;
            this.enableOTPButton = true;
            this.otpField = false;
            // this.emailExisitAlert=true
            // this.invalidDomain=true
          }
          else{
          // console.log("inside els====",res)
            //this.emailFormFlag = false;
            //this.signUpFormFlag = true;
            this.enableSignInButton = true;
            this.invalidDomain=false;
            this.enableOTPButton = false;
            this.otpField = true;
            this.timer(1);
          }
        }

        )
      )

    }
    
  }

  public validateOTP(){
  // console.log("iNSIDE VALIDATE OTP")
    let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
      let hashedPass = CryptoJS.AES.encrypt( this.otp, key).toString();
      let req = {
        "emailId":this.formEmail.value.email,
        "otp": hashedPass
      }

   //   console.log("this.formEmail.value.email",this.formEmail.value.email)
      
      this.subscriptions.push(
        this.userProfileService.validateOTP(req).subscribe( res => {
        //  console.log("RES & RES.DATA",res && res.data)
          if(res && res.data ){
            this.emailFormFlag = false;
            this.signUpFormFlag = true;
            //this.callSignIn();
            // console.log("iNSIDE VALIDATE OTP IF PART")
          }
          else{
            // console.log("iNSIDE VALIDATE OTP ELSE PART",res && res.data)
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

    //console.log("iNSIDE SIGN IN")
      this.router.navigate(['login'], { queryParams: { email: this.validatedEmail} });

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


