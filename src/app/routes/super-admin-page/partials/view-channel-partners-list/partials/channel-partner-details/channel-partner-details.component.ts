import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterState, Route } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
@Component({
  selector: 'channel-partner-details',
  templateUrl: './channel-partner-details.component.html',
  styleUrls: ['./channel-partner-details.component.css']
})
export class ChannelPartnerDetailsComponent implements  OnInit{

  private subscriptions : Subscription[] = [];

  public channelPartnerDetailedList : any;
  public channelPartnerAccountManager : any;
  public channelPartnerAdmin: any;
  public channelPartnerMaster: any;

  constructor(
    private router : Router,
    private superAdminService : SuperAdminService,
    public route : ActivatedRoute,
  ){}




  ngOnInit(): void {
    let params = this.route.snapshot.queryParamMap;

    if(params.has('channelId')){
      this.channelPartnerDetails(params.get('channelId'));
    }
    else{
      return;
    }
  }


  // public getDetails(){
  //   let id = "6524f47927b4d40053d34101";
  //   this.subscription.push(
  //     this.superAdminService.getChannelPartnerDetails(id).subscribe(res=>{
  //       console.log("_+_+_+_ Res", res);
  //     })
  //   )
  // }


  public channelPartnerDetails(id) {
    this.subscriptions.push(
      this.superAdminService.getMyChannelPartnerList(id).subscribe(res=>{
        this.channelPartnerDetailedList = res;
        this.channelPartnerAdmin = this.channelPartnerDetailedList.adminUsers,
        this.channelPartnerMaster = this.channelPartnerDetailedList.channelPartnerMaster,
        this.channelPartnerAccountManager = this.channelPartnerDetailedList.channelParterAccountManager
      })
    )
    console.log("channelPartnerDetailedList_+_+_+_+_+_+_+_ Res", this.channelPartnerDetailedList);
  }


}
