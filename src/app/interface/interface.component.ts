import { Component, Injectable } from '@angular/core';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { BehaviorSubject, filter, map, Subscription } from 'rxjs';
import { silentRequest } from '../auth-config';
import { b2cPolicies } from '../../app/auth-config';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, SsoSilentRequest } from '@azure/msal-browser';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { LoginService } from 'src/shared/services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent {

  public subscriptions : Subscription[] = [];

  public userLoggedIn : boolean = false;

  public isExapnded : boolean = false;

  public userName : string;

  public typeSelected : string;

  public userRole : string;

  // constructor(private spinnerService: NgxSpinnerService) {
  //   this.typeSelected = 'ball-fussion';
  // }

  constructor(
    private userAccountStore : UserAccountStore,
    private authService : MsalService,
    private userProfileService : UserProfileService ,
    public collapseService: CollapseService,
    private loginService : LoginService,
    private spinnerService : NgxSpinnerService,
    private msalBroadcastService: MsalBroadcastService
  ){
    this.typeSelected = 'ball-atom';
  }

  public userDetails$ = this.userAccountStore.userProfileDetails$
  .pipe(
    map(data => {
      //console.log("++++++++++ Came inside User", data);
      if(data){
        this.userRole = (data.userDetails && data.userDetails.role) ? data.userDetails.role : null;
        console.log("++++++++++ Came inside User Data", data);
        if(data.userDetails.firstName){
          this.userName = data.userDetails.firstName + ' ' + (data.userDetails.lastName ? data.userDetails.lastName : '');
        }
        else {
          this.userName ="Altsys User" 
        }
        
        this.userLoggedIn = true;
        return data;
      }
      else{
        this.userName ="Altsys User" 
        return data;
      }
    }
    )
  )

  public ngOnInit() : void {

    console.log("++++++++++ Called NGONInit");
    this.userLoggedIn = this.authService.instance.getAllAccounts().length > 0;
    this.userDetails$.subscribe();
    // if(this.userLoggedIn){
    //   this.userDetails$.subscribe();
    // }


        
    this.msalBroadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
            )
            .subscribe((result: EventMessage) => {
              let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com"))
              if(loggedinData.length > 0 ){
                this.userLoggedIn = true;
                //this.userDetails$.subscribe();
              }
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
  }


  public loginEvent(event){
    this.loginService.login();
  }
  public exapndCollapse () {

   this.isExapnded = this.isExapnded ? false : true;
   //return this.isExapnded;
  }

  public logout() {
    this.loginService.logout();
  }

  public showSpinner(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 5000); // 5 seconds
  }
  

  

}


@Injectable({
  providedIn: 'root'
})
export class CollapseService {

  isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isSidenavBig$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }
  
  toggleSidenav() {
    this.isOpen$.next(!this.isOpen$.getValue())
  }

  toggleSidenavContentSize() {
    this.isSidenavBig$.next(!this.isSidenavBig$.getValue())
  }
}