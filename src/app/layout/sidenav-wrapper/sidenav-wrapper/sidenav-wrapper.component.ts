import { Component, Input } from '@angular/core';
import { LoginService } from 'src/shared/services/login.service';

@Component({
  selector: 'app-sidenav-wrapper',
  templateUrl: './sidenav-wrapper.component.html',
  styleUrls: ['./sidenav-wrapper.component.css']
})
export class SidenavWrapperComponent {

  public userLoggedInFlag = false;
  isExpanded: boolean = false;

  @Input() set userLoggedIn(value: any){
    this.userLoggedInFlag = value;
    console.log("&&&&&&&& ++++++ ", this.userLoggedInFlag);
  }


  public userSubMenu : boolean = false;
  public dashboardSubMenu : boolean = false;
  public securitySubMenu : boolean = false;

  constructor(
    private loginService : LoginService
  ){}


  public logout() {
    this.loginService.logout();
  }


  public menuExpansion(val){

    this.isExpanded = (val) ? false : true;
    if(this.isExpanded === false){
      this.userSubMenu = false;
      this.dashboardSubMenu = false;
      this.securitySubMenu = false;
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

      default:
        return null;
    }

  }

}
