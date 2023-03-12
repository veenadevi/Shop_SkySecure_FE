import { Component } from '@angular/core';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { MsalService } from '@azure/msal-angular';
import { map, Subscription } from 'rxjs';
import { silentRequest } from '../auth-config';
import { b2cPolicies } from '../../app/auth-config';
import { SsoSilentRequest } from '@azure/msal-browser';
import { UserProfileService } from 'src/shared/services/user-profile.service';


@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent {

  public subscriptions : Subscription[] = [];

  public userLoggedIn : boolean = false;

  public isExapnded : boolean = false;

  constructor(
    private userAccountStore : UserAccountStore,
    private authService : MsalService,
    private userProfileService : UserProfileService 
  ){

  }

  public userDetails$ = this.userAccountStore.userAccountDetails$
  .pipe(
    map(data => {
      if(data){
        return data;
      }
      else{
        return data;
      }
    }
    )
  )

  public ngOnInit() : void {
    this.subscriptions.push(this.userDetails$.subscribe(res => {
      this.userLoggedIn = this.authService.instance.getAllAccounts().length > 0;
    }));
  }

  public exapndCollapse () {

   this.isExapnded = this.isExapnded ? false : true;
  }
  

  

}
