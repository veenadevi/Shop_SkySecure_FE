import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';

@Component({
  selector: 'view-channel-partners-list',
  templateUrl: './view-channel-partners-list.component.html',
  styleUrls: ['./view-channel-partners-list.component.css']
})
export class ViewChannelPartnersListComponent implements OnInit{



  public subscription : Subscription[] = [];

  public channelPrtnerList : any[] = [];


  constructor(
    private superAdminService : SuperAdminService,
    private spinner: NgxSpinnerService,
    private router : Router,
  ){}


  public ngOnInit(): void {
    this.spinner.show();
    this.setTableData();
  }

  public setTableData(){

    this.subscription.push(
      this.superAdminService.getAllChannelPartners().subscribe(res=>{
        this.spinner.hide();
        this.channelPrtnerList = res.channelPartners;
      })
    )
  }

  public getChannelPartnerDetails(account){

    let acc = JSON.stringify(account);
    let queryParams ={
      account : acc,

    }
    console.log("navigate to details page===",account)

    this.router.navigate(['user/channel-partner'], {queryParams: queryParams});

   // this.router.navigate(['/admin-page/accounts-details'], {queryParams: queryParams});
  }

}
