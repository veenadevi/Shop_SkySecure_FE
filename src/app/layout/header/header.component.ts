import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/shared/services/login.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { map, filter, Subscription, switchMap, forkJoin } from 'rxjs';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { b2cPolicies, silentRequest } from 'src/app/auth-config';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { CartService } from 'src/shared/services/cart.service';


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
    private userProfileService : UserProfileService,
    private cartService : CartService,
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
      if(this.userLoggedIn){
        this.getAccessIdToken();
      }
    }));


    
    this.msalBroadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
            )
            .subscribe((result: EventMessage) => {
                const payload = result.payload as AuthenticationResult;
                this.authService.instance.setActiveAccount(payload.account);
                this.userAccountStore.setuserAccountDetails(this.authService.instance.getAllAccounts());
                this.loginService.retrieveAccessIdToken();
            });

        this.msalBroadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None)
            )
            .subscribe(() => {
                
            })

    // setTimeout(() => {
    //   
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

  public getAccessIdToken() {
    this.authService.acquireTokenSilent(silentRequest).subscribe( res => {
      this.userAccountStore.setAccessIdToken(res.idToken);
      this.userProfileService.fetchUserProfile().subscribe(res => {
        this.retrieveCarttItems(res);
        
      });

      


      /*this.userProfileService.fetchUserProfile()
        .pipe(
          switchMap ( (response) => {
            this.setCartItems(response);
            return response;
          })
        ).subscribe( res => {
          console.log("--------------------***** res ", res);
        })*/
      
    })


    
  }


  public retrieveCarttItems(data) {


      this.cartService.getCartItems(null).subscribe();
      
    

  }

}
