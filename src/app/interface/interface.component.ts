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
    private modalService : NgbModal
  ){
    this.typeSelected = 'ball-atom';
  }

  public userDetails$ = this.userAccountStore.userProfileDetails$
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
  )

  public ngOnInit() : void {

    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];

    this.userLoggedIn = this.authService.instance.getAllAccounts().length > 0;
    this.userDetails$.subscribe();
    // if(this.userLoggedIn){
    //   this.userDetails$.subscribe();
    // }


        
    /*this.msalBroadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
            )
            .subscribe((result: EventMessage) => {
              let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"))
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
                
            })*/
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