import { Component, Injectable } from '@angular/core';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { silentRequest } from '../auth-config';
import { b2cPolicies } from '../../app/auth-config';
import { SsoSilentRequest } from '@azure/msal-browser';
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

  // constructor(private spinnerService: NgxSpinnerService) {
  //   this.typeSelected = 'ball-fussion';
  // }

  constructor(
    private userAccountStore : UserAccountStore,
    private authService : MsalService,
    private userProfileService : UserProfileService ,
    public collapseService: CollapseService,
    private loginService : LoginService,
    private spinnerService : NgxSpinnerService
  ){
    this.typeSelected = 'ball-atom';
  }

  public userDetails$ = this.userAccountStore.userProfileDetails$
  .pipe(
    map(data => {
      console.log("*******%%%%%%%%%% Called here");
      if(data){
        this.userName ="Altsys User" || data.userDetails.firstName + ' ' +data.userDetails.lastName;
        this.userLoggedIn = true;
        return data;
      }
      else{
        return data;
      }
    }
    )
  )

  public ngOnInit() : void {
   
    // this.subscriptions.push(this.userDetails$.subscribe(res => {
    //   this.userLoggedIn = this.authService.instance.getAllAccounts().length > 0;
    //   console.log("********* ****** ((((((", this.userAccountStore.getUserProfileDetails());
    // }));
    
    this.userLoggedIn = this.authService.instance.getAllAccounts().length > 0;
    if(this.userLoggedIn){
      this.userDetails$.subscribe();
    }
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