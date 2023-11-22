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

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

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

  public companyListArray : any;

  public isCompanyError:boolean=false

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



  
  ngOnInit(): void {
   

    this.route.queryParams.subscribe(params => {
      this.emailViaSignIn = params['email'];

    });
    this.formEmail.get('emailOrMobile').setValue( this.emailViaSignIn)

  


    this.getAllCompany();
    
    this.form = this.formBuilder.group(
      {
        firstName: ['',Validators.required],
        email: [],
        lastName: [],
        password: [],
        confirmPassword: [],

        selectedCompanyName: ['',Validators.required],
        mobileNumber: ['', [
          
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
  


 


  onSubmit(): void {
    this.submitted = true;
    
    let finalCompanyName=""



    
    if( this.selectedCompanyName===undefined){
     


      
      this.isCompanyError=true
     
    }
   
  else{
    finalCompanyName = (this.selectedCompanyName) ? this.selectedCompanyName : this.selectedCompanyName.company;
    this.isCompanyError=false
    
  
    
  }
    
    

   

    if (this.form.invalid  && this.isCompanyError) { // If Invalid Return
     
      return;
    }
  
    else { 
      
      let formValue = this.form.value;
      let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
    
      let req = {
        "firstName": formValue.firstName,
        "lastName": formValue.lastName,
        //"email": (!this.isMobile)?this.validatedEmail:formValue.email,
        "email": (!this.isMobile)?this.validatedEmail:formValue.email,
        "company": finalCompanyName,
        "role": "Customer",
        "countryCode": "+91",
        "mobileNumber": (this.isMobile)?this.validatedEmail:formValue.mobileNumber,
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
          
          
        },
        (error) => {
          this.isSignupError=true
         

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
       
        this.isResend=true
        clearInterval(this.timerInterval);
          
        this.otpField = false;
       
        this.enableSignInButton = false;
            this.enableOTPButton = true;

        clearInterval(this.timerInterval);
        this.inValidOTP=false;
      }
    }, 1000);
  }

  onReset(): void {
    this.isCompanyError=false
    this.submitted = false;
    this.selectedCompanyName=""
    const mobilePattern = /^\d{10}$/;

    this.isMobile= mobilePattern.test(this.formEmail.value.emailOrMobile) 

   if(!this.isMobile){
    this.form.controls['mobileNumber'].setValue(null);

   }
   else{
    this.form.controls['email'].setValue(null);
   }

   this.form.controls['firstName'].setValue(null);
   // this.form.reset();
  }

  public navigateToLogin() {
    this.router.navigate(['login']);
  }

  public onSubmitEmail() {

    
    const mobilePattern = /^\d{10}$/;
    this.isMobile= mobilePattern.test(this.formEmail.value.emailOrMobile) 

    this.isResend=false
    this.validatedEmail = this.formEmail.value.emailOrMobile;
   
    this.submittedEmail = true;
   
    if(this.isMobile){
      this.form.controls['mobileNumber'].setValue(this.validatedEmail);
      this.form.controls['email'].setValue('');
      this.form.controls.mobileNumber.disable();
      this.form.controls.email.enable()

    }
    else{
      this.form.controls['email'].setValue(this.validatedEmail);
      this.form.controls.email.disable();
      this.form.controls.mobileNumber.enable();
    }

   
    if (this.formEmail.invalid) { // If Invalid Return


     
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

         
          if (res.message) {
            
            if (res.message == 'Error: Invalid Domain') {

              this.invalidDomain = true;
              this.enableOTPButton = true;
            
            }
            else if(res.message == 'Error: User already  exists') {
              this.emailExisitAlert = true
              this.otpField = false;
              this.enableOTPButton=false
            }
        else{

            this.inValidOTP = false
            
            this.enableSignInButton = false;
            this.enableOTPButton = true;
            this.otpField = false;
            
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
   
    let key = "&&((SkysecureRealize&&!!IsTheBestApp^!@$%"
    let hashedPass = CryptoJS.AES.encrypt(this.otp, key).toString();
    
   
    let req = {
    
      "emailId":(this.isMobile)?'':this.formEmail.value.emailOrMobile,
      "otp": hashedPass,
      "mobileNumber":(this.isMobile)?this.formEmail.value.emailOrMobile:'',
    }

   

    this.subscriptions.push(
      this.userProfileService.validateOTP(req).subscribe(res => {
        
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
  
    if (otp.length === 6) {
      //  this. onSubmitEmail();
    }
  }




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


  selectedCompany: string;
  showOptions: boolean = false;
  // myCustomers = [/* your options array */];

  onChange() {
    
    
    this.selectedCarObj = this.myCustomers.find((c)=> c.company==this.selectedCompany);
    

    if(this.selectedCompany && this.selectedCompany.length>3){
      let sampleStr : any = this.selectedCompany.toLowerCase();
     

      this.companyListArray = this.myCustomers.filter(function (str) { return str.company.toLowerCase().includes(sampleStr); });
      
      this.showOptions = true;
    }
    
    
  }

  identify(index, item) {
    return item.id;
  }

  selectOption(option) {

 
    
    this.selectedCompany = option;
    this.showOptions = false;
  }


  public selectedCompanyName; 

  filterCompany(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    //console.log("query  ",query)
    if(query&&query.length>=3){

   

    for (let i = 0; i < (this.myCustomers as any[]).length; i++) {
        let country = (this.myCustomers as any[])[i];
      //  console.log("country  ",country)
        if (country.company.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.companyListArray = filtered;
  }
}


  // selectedCar = "";
  selectedCarObj: any = {};

  

 



  public getAllCompany(){

    this.subscriptions.push(
      this.adminPageService.getAllCompany().subscribe(res=>{
        
        this.myCustomers = res;
        this.companyListArray = this.myCustomers;
       // console.log(" this.companyListArray", this.companyListArray.length)
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
  


  const value = control.value;
  
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

 

  return of( {invalidEmailOrMobile:true});


 


}

