import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/shared/services/login-service';

@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit{


  public navExpanded : boolean = false;

  constructor(
    private loginService: LoginService
  ){}

    public ngOnInit(): void {
      this.navExpanded = true;
    }

    public logout() {
      this.loginService.logout();
    }
}
