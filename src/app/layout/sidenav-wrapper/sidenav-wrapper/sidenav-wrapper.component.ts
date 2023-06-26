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

  constructor(
    private loginService : LoginService
  ){}


  public logout() {
    this.loginService.logout();
  }

}
