import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/shared/services/login-service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { map, filter, Subscription } from 'rxjs';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})

export class HeaderComponent implements OnInit{

  

  public userLoggedIn = false;

  public subscriptions : Subscription[] = [];

  constructor(
    private appComponent : AppComponent,
    private loginService: LoginService,
    private authService: MsalService,
    private userAccountStore : UserAccountStore,
    private msalBroadcastService: MsalBroadcastService,
    private router : Router
  ){}

  /**
   * Click Functions
   */

  // Cart Click

  public userDetails$ = this.userAccountStore.userAccountDetails$
  .pipe(
    map(data => {
      if(data){
        
        return data;
      }
      else{
        
        return data;
      }
    }
    )
  )

  public ngOnInit(): void {


    this.subscriptions.push(this.userDetails$.subscribe(res => {
      this.userLoggedIn = this.authService.instance.getAllAccounts().length > 0;
      console.log("**** --> Looged in details ", this.authService.instance.getAllAccounts());
    }));


    
    this.msalBroadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
            )
            .subscribe((result: EventMessage) => {
                const payload = result.payload as AuthenticationResult;
                this.authService.instance.setActiveAccount(payload.account);
                this.userAccountStore.setuserAccountDetails(this.authService.instance.getAllAccounts())
            });

        this.msalBroadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None)
            )
            .subscribe(() => {
                
            })

    // setTimeout(() => {
    //   console.log("****** -----> After 5 sec", this.authService.instance.getAllAccounts().length);
    // }, 5000);




    // if(this.userLoggedIn){
    //   this.userAccountStore.setuserAccountDetails(this.authService.instance.getAllAccounts());
    // }
    // else{
    //   this.userAccountStore.setuserAccountDetails(null);
    // }
    
  }

  public cartFynction(){
    this.router.navigate(['/cart']);
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
