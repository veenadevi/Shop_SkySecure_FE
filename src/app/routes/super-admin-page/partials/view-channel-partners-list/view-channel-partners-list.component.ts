import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';
@Component({
  selector: 'view-channel-partners-list',
  templateUrl: './view-channel-partners-list.component.html',
  styleUrls: ['./view-channel-partners-list.component.css']
})
export class ViewChannelPartnersListComponent implements OnInit{



  public subscription : Subscription[] = [];

  public channelPartnerList : any[] = [];


  constructor(
    private superAdminService : SuperAdminService,
    private adminPageService : AdminPageService,
    private spinner: NgxSpinnerService,
    private router : Router,
    private toaster : ToasterNotificationService
  ){}


  public ngOnInit(): void {
    this.spinner.show();
    this.getAllChannelPartners();
  }

  public getAllChannelPartners(){

    this.subscription.push(
      this.superAdminService.getAllChannelPartners().subscribe(res=>{
        this.spinner.hide();
        console.log("_+_+_+_+_+_ APIs Result ", res);
        this.channelPartnerList = res.channelPartners;
      })
    )
  }


  public getChannelPartnerDetails(id){

    this.router.navigate(['admin-pages/channel-partner-details',id]);

    console.log("navigate to details page===",id)

  }

}