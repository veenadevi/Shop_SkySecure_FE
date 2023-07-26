import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { SelectOemModalComponent } from 'src/shared/components/modals/select-oem-modal/select-oem-modal.component';
import { LoginService } from 'src/shared/services/login.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'app-sidenav-wrapper',
  templateUrl: './sidenav-wrapper.component.html',
  styleUrls: ['./sidenav-wrapper.component.css']
})
export class SidenavWrapperComponent {

  public userLoggedInFlag = false;
  public userRoleVal = '';
  public userFullName = '';
  //isExpanded: boolean = false;
  isExpanded: boolean = true;

  public menuToogled : boolean = false;

  @Input() set userLoggedIn(value: any){
    this.userLoggedInFlag = value;
    console.log("&&&&&&&& ++++++ ", this.userLoggedInFlag);
  }

  @Input() set userRole(value: any){
    this.userRoleVal = value;
    
  }

  @Input() set menuToogledVal(value: any){
    this.menuToogled = value;
  }

  @Input() set userName(value : any){
    this.userFullName =  value;
  }


  public userSubMenu : boolean = false;
  public dashboardSubMenu : boolean = false;
  public securitySubMenu : boolean = false;
  // public profileSubMenu : boolean = false;
  public adminSubMenu : boolean = false;

  constructor(
    private loginService : LoginService,
    private router : Router,
    private modalService : NgbModal,
    private userAccountStore : UserAccountStore
  ){}

  public userDetails$ = this.userAccountStore.userProfileDetails$
  .pipe(
    map(data => {
      
      if(data){
        //this.userDetails = data.userDetails;
        //console.log("++++++++++ Came inside User", this.userDetails);
        return data;
      }
      else{
        
        return null;
      }
    }
    )
  )

  public logout() {
    //this.loginService.logout();
    //localStorage.setItem('XXXXaccess__tokenXXXX', null);
    this.menuToogled = false;
    localStorage.removeItem('XXXXaccess__tokenXXXX');
    this.userAccountStore.setUserDetails(null);
    this.router.navigate(['']);
  }


  public menuExpansion(val, navVal){

    //this.isExpanded = (val) ? false : true;
    this.isExpanded = true;
    

    if(navVal === 'security'){
      this.securitySubMenu = true;
    }
    if(navVal === 'user'){
      this.userSubMenu = true;
    }
    if(navVal === 'admin'){
      this.adminSubMenu = true;
    }
    if(navVal === 'dashboard'){
      this.dashboardSubMenu = true;
    }

    /*if(this.isExpanded === false){
      this.userSubMenu = false;
      this.dashboardSubMenu = false;
      this.securitySubMenu = false;
      this.profileSubMenu = false;
      this.adminSubMenu = false;
    }*/


  }

  public navAction(val, navVal){

    switch (navVal) {
      case 'user':
          this.userSubMenu = (this.userSubMenu) ? false : true;
          this.isExpanded = this.isExpanded ? false : true;
          return;
      case 'dashboard':
          //this.dashboardSubMenu = (this.dashboardSubMenu) ? false : true;
          //this.isExpanded = this.isExpanded ? false : true;
          return;
      case 'shop':
          //this.router.navigate(['/']);
          return;
      case 'recommendations':
          //this.showDialog();
          this.router.navigate(['security-view/recommendation-default']);
        return;

      default:
        return null;
    }
  }


  public subMenuClick(val){


    
    console.log("+++++++ ", val);

    switch (val) {
      case 'user':
          this.userSubMenu = (this.userSubMenu) ? false : true;
          return;
      case 'dashboard':
          this.dashboardSubMenu = (this.dashboardSubMenu) ? false : true;
          return;
      case 'security':
          this.securitySubMenu = (this.securitySubMenu) ? false : true;
          return;
      // case 'profile':
      //     this.profileSubMenu = (this.profileSubMenu) ? false : true;
      //     return;
      case 'admin':
          this.adminSubMenu = (this.adminSubMenu) ? false : true;
          return;
      
      
        

      default:
        return null;
    }

  }

  public showDialog() : void {

    const modalRef = this.modalService.open(SelectOemModalComponent);
  }

  public menuToogleEvent($event){
    

    

    this.menuToogled = this.menuToogled ? false : true;
  }


}