import { Component } from '@angular/core';
import { LoginService } from 'src/shared/services/login.service';

@Component({
  selector: 'app-sidenav-wrapper',
  templateUrl: './sidenav-wrapper.component.html',
  styleUrls: ['./sidenav-wrapper.component.css']
})
export class SidenavWrapperComponent {

  isExpanded: boolean = false;

  constructor(
    private loginService : LoginService
  ){}


  public logout() {
    this.loginService.logout();
  }

}
