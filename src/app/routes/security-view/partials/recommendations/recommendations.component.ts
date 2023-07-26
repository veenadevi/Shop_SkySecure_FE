import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
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
  public pageReloading : boolean;
  public segmentationsList : any;
  public oemName : any;
  public tenantName : string;


  constructor (
    private userGraphLoginService : UserGraphLoginService,
    private adGraphUserStore : AdGraphUserStore,
    private microsoftGraphService : MicrosoftGraphService,
    private userAccountStore : UserAccountStore,
    private route : ActivatedRoute,
    private router : Router
  ){
        this.subscriptions.push(router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.pageReloading = !router.navigated;
          //this.pageReloading = 'y';
          
        }
        else{
          //this.pageReloading = 'n';
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
        //this.checkConnectionStatus();
        //return data;
      }
    }
    )
  )

  public connectToTenant() : void {
    this.userGraphLoginService.adLogin();
    this.subscriptions.push(this.adUserDetails$.subscribe(data => {
      this.appRegister(data);
      this.connectionStatus = 'Y';
      this.getAllSegmentations();

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
    
    let params = this.route.snapshot.queryParamMap;

    this.oemName = params.get('oemName');

    //this.subscriptions.push(this.userProfileDetails$.subscribe());
    console.log("+++++++++ Page Reloading ",this.pageReloading);
    if(this.pageReloading === false){
      this.checkConnectionStatus();
    }
    else{
      this.checkConnectionStatus();
      console.log("+++++++++ Inside here ");
      this.userProfileDetails$.subscribe(data=> {
        //this.checkConnectionStatus();
      })
    }
    
    
    
  }

  public checkConnectionStatus() : void {

    // this.connectionStatus = 'Y';
    // this.microsoftGraphService.getAllSegmentations().subscribe(response => {
    //   console.log("*******^^^^  got Respons ", response);
    //   this.segmentationsList = response;
    //  });

    this.microsoftGraphService.getConnectionStatus().subscribe( res => {
     this.connectionStatus = res.connection.connectionStatus ? 'Y' : 'N';
     //this.connectionStatus = 'Y'
     //this.getAllSegmentations();
     if(this.connectionStatus){
      this.tenantName = res.connection.userAccessDetails.name;
      this.userGraphLoginService.getRefreshIDTokenByAccessToken(res);
      this.getAllSegmentations();
     }
    });
 
   }


   public getAllSegmentations(){
    this.microsoftGraphService.getAllSegmentations().subscribe(response => {
      this.segmentationsList = response;
     });
   }




}
