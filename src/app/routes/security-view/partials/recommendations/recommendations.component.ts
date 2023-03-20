import { Component } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { UserGraphLoginService } from 'src/shared/services/user-graph-login.service';
import { AdGraphUserStore } from 'src/shared/stores/ad-graph-user.store';

@Component({
  selector: 'recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {

  private subscriptions : Subscription[] = [];
  constructor (
    private userGraphLoginService : UserGraphLoginService,
    private adGraphUserStore : AdGraphUserStore,
  ){}

  public adUserDetails$ = this.adGraphUserStore.adUserDetails$
  .pipe(
    map(data => {
      if(data){
        console.log("*********$$$$$$$$$$$$$ Login Response ", data);
        return data;
      }
      else{
        return data;
      }
    }
    )
  )

  public connectToTenant() : void {
    this.userGraphLoginService.adLogin();
    this.subscriptions.push(this.adUserDetails$.subscribe(data => {
      console.log("*********$$$$$$$$$$$$$ Inside subs", data);
    }))
    

  }

}
