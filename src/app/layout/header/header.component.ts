import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/shared/services/login-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})

export class HeaderComponent implements OnInit{

  public userLoggedIn : boolean = false;

  constructor(
    private appComponent : AppComponent,
    private loginService: LoginService,
    private authService: MsalService,
    private router : Router
  ){}

  /**
   * Click Functions
   */

  // Cart Click

  public ngOnInit(): void {
    this.userLoggedIn = this.authService.instance.getAllAccounts().length > 0;
  }

  public cartFynction(){
    
  }

  public goToHomePage(){
    this.router.navigate(['/']);
  }

  public login(){
    this.loginService.login();
  }

  public logout() {
    this.loginService.logout();
  }

}
