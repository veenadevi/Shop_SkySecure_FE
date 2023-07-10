import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit{

  public isValid : boolean = false;

  constructor(
    public router : Router
  ){}

  public ngOnInit(): void {
    
    this.isValid = this.validateAuth();
    if(!this.isValid){
      console.log("()()()()() Inside is valid", );
      //this.router.navigate(['']);
    }

  }

  public validateAuth(){
    let authToken = localStorage.getItem('XXXXaccess__tokenXXXX');
    console.log("()()()()() Inside is valid", authToken);
    return authToken !== null ? true : false;

  }
}
