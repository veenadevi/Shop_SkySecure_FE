import { Component, Input } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { MicrosoftGraphService } from 'src/shared/services/microsoft-graph.service';
import { UserGraphLoginService } from 'src/shared/services/user-graph-login.service';
import { AdGraphUserStore } from 'src/shared/stores/ad-graph-user.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {

  @Input('connectionStatus')
  public connectionStatus: string;

  private subscriptions : Subscription[] = [];
  public userName : string;
  public pageReloading : boolean = false;
  public segmentationsList : any;
  constructor (
    private userGraphLoginService : UserGraphLoginService,
    private adGraphUserStore : AdGraphUserStore,
    private microsoftGraphService : MicrosoftGraphService,
    private userAccountStore : UserAccountStore,
    private router : Router
  ){
      console.log("**** Being called");
        this.subscriptions.push(router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.pageReloading = !router.navigated;
          console.log("(((((((( page ",this.pageReloading)
        }
    }));
  }

  public adUserDetails$ = this.adGraphUserStore.adUserDetails$
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

  public userProfileDetails$ = this.userAccountStore.userProfileDetails$
  .pipe(
    map(data => {
      if(data){
        this.checkConnectionStatus();
        //return data;
      }
      else{
        this.checkConnectionStatus();
        //return data;
      }
    }
    )
  )

  public connectToTenant() : void {
    this.userGraphLoginService.adLogin();
    this.subscriptions.push(this.adUserDetails$.subscribe(data => {
      this.appRegister(data);

    }))
    

  }

  public appRegister(data) : void {
    //this.microsoftGraphService.msAppRegistration().subscribe();
    this.subscriptions.push(this.microsoftGraphService.msAppRegistration(data).subscribe(res => {
      
      if(res){
        this.userName = res.userDetails;
      }
    }))
  }

  public getRefreshToken() : void {
    this.userGraphLoginService.getRefreshToken();
  }

  // public getId(){
  //   this.userGraphLoginService.getRefreshIDTokenByAccessToken();
  // }


  ngOnInit(): void {
    
    //this.subscriptions.push(this.userProfileDetails$.subscribe());
    this.checkConnectionStatus();
    // setTimeout(()=>{                           
    //   this.checkConnectionStatus();
    // }, 2000);
    
  }

  public checkConnectionStatus() : void {

    // this.connectionStatus = 'Y';
    // this.microsoftGraphService.getAllSegmentations().subscribe(response => {
    //   console.log("*******^^^^  got Respons ", response);
    //   this.segmentationsList = response;
    //  });

    this.microsoftGraphService.getConnectionStatus().subscribe( res => {
     this.connectionStatus = res.connection.connectionStatus ? 'Y' : 'N';
     this.microsoftGraphService.getAllSegmentations().subscribe(response => {
      console.log("*******^^^^  got Respons ", response);
      this.segmentationsList = response;
     });
     if(this.connectionStatus){
      this.userGraphLoginService.getRefreshIDTokenByAccessToken(res);
     }
    });
 
   }

//    subscription: Subscription;
// pageReloading: boolean = false;

// constructor(private router: Router){
//     this.subscription = router.events.subscribe((event) => {
//         if (event instanceof NavigationStart) {
//           this.pageReloading = !router.navigated;
//           console.log(this.pageReloading)
//         }
//     });
// }




}
