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
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectOemModalComponent } from 'src/shared/components/modals/select-oem-modal/select-oem-modal.component';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';


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

  public visible : boolean;


  public cities : any;

  public selectedCity : any;

  public dashboardFlag : boolean = false;
  public securityFlag : boolean = false;
  public profileFlag : boolean = false;

  public content_height : any;

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
    private msalBroadcastService: MsalBroadcastService,
    private modalService : NgbModal,
    private router : Router
  ){
    this.typeSelected = 'ball-atom';
  }

  /*public userDetails$ = this.userAccountStore.userProfileDetails$
  .pipe(
    map(data => {
      if(data){
        this.userRole = (data.userDetails && data.userDetails.role) ? data.userDetails.role : null;
        
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
  )*/

  public userDetails$ = this.userAccountStore.userDetails$
  .pipe(
    map(data => {
      if(data){
        this.userRole = (data && data.role) ? data.role : null;
        
        if(data.firstName){
          this.userName = data.firstName + ' ' + (data.lastName ? data.lastName : '');
        }
        else {
          this.userName ="Altsys User" 
        }
        
        this.userLoggedIn = true;
        return data;
      }
      else{
        this.userName ="Altsys User" ;
        this.userLoggedIn = false;
        return data;
      }
    }
    )
  )

  public ngOnInit() : void {

    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];

    this.checkUserLogIn();

    //this.userLoggedIn = this.authService.instance.getAllAccounts().length > 0;
    this.userDetails$.subscribe();
    this.setContentPadding();
  }

  public setContentPadding(){

    let nav_bar = document.getElementById("navbar");

    console.log("()()() ", nav_bar.offsetHeight);

    let nav_height = nav_bar.offsetHeight;

    let content_holder = document.getElementById("content-holder");

    content_holder.style.paddingTop = nav_height + "px";
    
  }

  public checkUserLogIn(){
    let encodedVal = localStorage.getItem('XXXXaccess__tokenXXXX');
    if (encodedVal !== null) {
      //Logged In
        var decoded = jwtDecode(encodedVal);
        this.userAccountStore.setUserDetails(decoded);
    }
    else{
        console.log("******* Auth Gaurd Else ");
        this.userAccountStore.setUserDetails(null);
    }
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

  public showDialog() : void {

    const modalRef = this.modalService.open(SelectOemModalComponent);
  }
  

  public subMenuClick(val){
    
    switch (val) {
      case 'dashboard':
        this.dashboardFlag = this.dashboardFlag ? false : true;
        this.securityFlag = false;
        this.profileFlag = false;
        return;
      case 'security':
        this.dashboardFlag = false;
        this.securityFlag = this.securityFlag ? false : true;;
        this.profileFlag = false;
        return;
      case 'profile':
        this.dashboardFlag = false;
        this.securityFlag = false;
        this.profileFlag = this.profileFlag ? false : true;;
        return;
      
      default:
        return null;
    }
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