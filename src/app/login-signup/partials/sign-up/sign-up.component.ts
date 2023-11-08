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
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';

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
  @ViewChild('ngOtpInput') ngOtpInputRef:any;
  emailFormFlag: boolean = true;
  signUpFormFlag: boolean =false;
  public emailViaSignIn: String

  public isSignupError:boolean=false

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

  public isResend:boolean=false;

  public myCustomers : any;

  display: any;
  static isMobile: boolean;


  public selectedCompnayName : any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private fb: FormBuilder,
    private adminPageService : AdminPageService
  ) {
    this.formEmail = this.fb.group(
      {
        emailOrMobile: [this.emailViaSignIn, [Validators.required,emailOrMobileValidator]],
       // otp: [],
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




    this.getAllMyCustomers();
    
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],

        email: [],
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
   // this.form.controls.emailOrMobile.disable();
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

    console.log("+_+_+_+_+_+", this.selectedCar);
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
    //  let hashedPass = CryptoJS.AES.encrypt(formValue.password, key).toString();
      let req = {
        "firstName": formValue.firstName,
        "lastName": formValue.lastName,
        "email": (!this.isMobile)?this.validatedEmail:formValue.email,

        //"password":hashedPass,
        "company": formValue.companyName,
        "role": "Customer",
        "countryCode": "+91",
        "mobileNumber": (this.isMobile)?this.validatedEmail:formValue.emailformValue.mobileNumber,
        "addressOne": { "name": "bangalore" },
        "addressTwo": { "name": "bangalore" },
        "state": "Karnataga",
        "pinCode": "766789",
        "country": "IN",
        "isMobile":this.isMobile
      }

      this.subscriptions.push(

        this.authService.signUp(req).subscribe((res) => {
         

          this.router.navigate(['login'], { queryParams: { email: this.validatedEmail, succuessMessage: "Registered Successfully" } });
          //localStorage.setItem('XXXXaccess__tokenXXXX', res.data);
          
        },
        (error) => {
          this.isSignupError=true
          console.log("sign up error -------")

        }
        
        )
      )
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

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  public navigateToLogin() {
    this.router.navigate(['login']);
  }

  public onSubmitEmail() {
    const mobilePattern = /^\d{10}$/;
    this.isMobile= mobilePattern.test(this.formEmail.value.emailOrMobile) 

    this.isResend=false
    this.validatedEmail = this.formEmail.value.emailOrMobile;
    console.log(" this.validatedEmail   ", this.validatedEmail)
    this.submittedEmail = true;
    console.log("is this mobile =====",this.isMobile)
    if(this.isMobile){
      this.form.controls['mobileNumber'].setValue(this.validatedEmail);
      this.form.controls.mobileNumber.disable();
    }
    else{
      this.form.controls['email'].setValue(this.validatedEmail);
      this.form.controls.email.disable();
    }
   
    if (this.formEmail.invalid) { // If Invalid Return


      console.log(" validation failed",this.formEmail.get('emailOrMobile').hasError('emailOrMobile'))
      return;
    }
    else { // If Valid

    

   
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
              this.enableOTPButton = false;

            }
            else if(res.message == 'Error: User already  exists') {
              this.emailExisitAlert = true
              this.otpField = false;
              this.enableOTPButton=false
            }
        else{

            this.inValidOTP = false
            // console.log("outside iff====")
            this.enableSignInButton = false;
            this.enableOTPButton = true;
            this.otpField = false;
            // this.emailExisitAlert=true
            // this.invalidDomain=true
          }

          }
          else {
            
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
    
      "emailId":(!this.isMobile)?this.formEmail.value.emailOrMobile:'',
      "otp": hashedPass,
      "mobileNumber":(this.isMobile)?this.formEmail.value.emailOrMobile:'',
    }

   console.log("signup req",req)

    this.subscriptions.push(
      this.userProfileService.validateOTP(req).subscribe(res => {
        //  console.log("RES & RES.DATA",res && res.data)
        if (res && res.data) {
          this.emailFormFlag = false;
          this.signUpFormFlag = true;
          
        }
        else {
         
          this.inValidOTP = true
          let eleId=this.ngOtpInputRef.getBoxId(0);
            this.ngOtpInputRef.focusTo(eleId);
           
            this.ngOtpInputRef.setValue('');
          

          //this.ngOtpInput.formEmail.setValue('', { emitEvent: true });

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



  // public onCompanyNameChange(){
  //   if(this.myCustomers && this.myCustomers.length>0){
  //     console.log("+_+_+_+ Changed Compnay Name ", this.selectedCompnayName);
  //     console.log("+_+_+_+ Changed Compnay Name ", this.myCustomers);
  //     this.selectedCarObj = this.myCustomers.find((c)=> c.company===this.selectedCompnayName);
  //     console.log(this.selectedCarObj)
  //   }
    
  // }

  cars = [{
    make: 'Ford',
    model: 'GTX',
    color: 'green'
  }, {
    make: 'Ferarri',
    model: 'Enzo',
    color: 'red'
  }, {
    make: 'VW',
    model: 'Amarok',
    color: 'white'
  }];


  selectedCar: string;
  showOptions: boolean = false;
  // myCustomers = [/* your options array */];

  onChange() {
    console.log("__+_+_+_ ",this.selectedCar);
    //this.selectedCarObj = this.cars.find((c)=> c.make==this.selectedCar);
    this.selectedCarObj = this.myCustomers.find((c)=> c.company==this.selectedCar);
    console.log(this.selectedCarObj)
    this.showOptions = true;
  }

  selectOption(option) {
    console.log("+_+_+_+_+_+_ ", option);
    this.selectedCar = option;
    this.showOptions = false;
  }

  // selectedCar = "";
  selectedCarObj: any = {};

  

  // onChange = () => {
    // console.log(this.selectedCar);
    //this.selectedCarObj = this.cars.find((c)=> c.make==this.selectedCar);
    // this.selectedCarObj = this.myCustomers.find((c)=> c.company==this.selectedCar);
    // console.log(this.selectedCarObj)
  // }



  public getAllMyCustomers(){

    this.subscriptions.push(
      this.adminPageService.getAllMyCustomers().subscribe(res=>{
        console.log("_+_+_+_+_+_ API Result ", res);
        this.myCustomers = res;
        //this.spinner.hide();
      },
      error => {
        //this.spinner.hide();
        //this.toaster.showWarning("Some Error Occurred! Please try again after sometime.",'')
      })
    )

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

