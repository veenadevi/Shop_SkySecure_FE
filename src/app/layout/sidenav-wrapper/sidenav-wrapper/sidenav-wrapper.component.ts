import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectOemModalComponent } from 'src/shared/components/modals/select-oem-modal/select-oem-modal.component';
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
  public profileSubMenu : boolean = false;

  constructor(
    private loginService : LoginService,
    private router : Router,
    private modalService : NgbModal
  ){}


  public logout() {
    this.loginService.logout();
  }


  public menuExpansion(val, navVal){

    this.isExpanded = (val) ? false : true;
    

    if(navVal === 'security'){
      this.securitySubMenu = true;
    }
    if(navVal === 'profile'){
      this.profileSubMenu = true;
    }

    if(this.isExpanded === false){
      this.userSubMenu = false;
      this.dashboardSubMenu = false;
      this.securitySubMenu = false;
      this.profileSubMenu = false;
    }


  }

  public navAction(val, navVal){
    switch (navVal) {
      case 'user':
          //this.userSubMenu = (this.userSubMenu) ? false : true;
          this.isExpanded = this.isExpanded ? false : true;
          return;
      case 'dashboard':
          this.dashboardSubMenu = (this.dashboardSubMenu) ? false : true;
          return;
      case 'shop':
          this.router.navigate(['/']);
          return;
      case 'recommendations':
        this.showDialog();
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
      case 'profile':
          this.profileSubMenu = (this.profileSubMenu) ? false : true;
          return;
      
        

      default:
        return null;
    }

  }

  public showDialog() : void {

    const modalRef = this.modalService.open(SelectOemModalComponent);
  }

}
