import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { LoginService } from 'src/shared/services/login.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})

export class UserPanelComponent implements OnInit{

  @Input('isExpanded')
  public isExpanded : any;


  
  public navExpanded : boolean = false;

  constructor(
    private loginService: LoginService,
    private userAccountStore : UserAccountStore
  ){}


  public userProfileDetails$ = this.userAccountStore.userProfileDetails$
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

    public ngOnInit(): void {
      
    }

    public logout() {
      this.loginService.logout();
    }

    ngOnChanges(changes: SimpleChanges) {
        
      
      this.navExpanded = true;
        //this.navExpanded = changes.isExpanded.currentValue;
      
      
      // You can also use categoryId.previousValue and 
      // categoryId.firstChange for comparing old and new values
      
  }
}
