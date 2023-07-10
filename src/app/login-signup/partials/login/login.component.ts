import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Validation from '../utils/validation';
import { AuthService } from 'src/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    public router : Router,
    public route : ActivatedRoute,
    private userAccountStore : UserAccountStore
    ) {}

  ngOnInit(): void {

    this.params = this.route.snapshot.queryParamMap;
    console.log("()()()()() Inside is valid", this.params);

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
    /*this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );*/
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
      
      console.log(JSON.stringify(this.form.value, null, 2));
      let req = {
        "email":this.form.value.email,
        "password":this.form.value.password
      }
      this.subscriptions.push(
        this.authService.signin(req).subscribe( res=> {
          
          localStorage.setItem('XXXXaccess__tokenXXXX', res.data);
          var decoded = jwtDecode(res.data);
          
          this.userAccountStore.setUserDetails(decoded);
          

          if(this.params && this.params.has('productId')){
            console.log("***** The res is ", decoded);
            //this.router.navigate(['/cart'], {queryParams: this.params});
            //this.router.navigate(['/cart'], {queryParams: this.params});
          }
          else{
            this.router.navigate(['']);
          }
          
        })
      )
    }
    
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  public signUp(){
    this.router.navigate(['login/signUp']);
  }
}

