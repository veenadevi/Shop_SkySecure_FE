import { Component } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { MicrosoftGraphService } from 'src/shared/services/microsoft-graph.service';
import { UserGraphLoginService } from 'src/shared/services/user-graph-login.service';
import { AdGraphUserStore } from 'src/shared/stores/ad-graph-user.store';

@Component({
  selector: 'recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {

  private subscriptions : Subscription[] = [];
  public userName : string;
  constructor (
    private userGraphLoginService : UserGraphLoginService,
    private adGraphUserStore : AdGraphUserStore,
    private microsoftGraphService : MicrosoftGraphService
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
      this.appRegister(data);

    }))
    

  }

  public appRegister(data) : void {
    //this.microsoftGraphService.msAppRegistration().subscribe();
    this.subscriptions.push(this.microsoftGraphService.msAppRegistration(data).subscribe(res => {
      console.log("****&&&&& Val AT Last", res);
      if(res){
        this.userName = res.userDetails;
      }
    }))
  }

}
