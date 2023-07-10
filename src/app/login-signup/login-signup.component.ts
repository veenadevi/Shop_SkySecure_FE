import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit{

  public isValid : boolean = false;

  public params : any;

  constructor(
    public router : Router,
    public route : ActivatedRoute
  ){}

  public ngOnInit(): void {

    
    
    this.isValid = this.validateAuth();
    if(!this.isValid){
     
      //this.router.navigate(['']);
    }

  }

  public validateAuth(){
    let authToken = localStorage.getItem('XXXXaccess__tokenXXXX');
    console.log("()()()()() Inside is valid", authToken);
    return authToken !== null ? true : false;

  }
}
