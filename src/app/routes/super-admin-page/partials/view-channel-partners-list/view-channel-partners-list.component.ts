import { Component, OnInit } from '@angular/core';
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
    private spinner: NgxSpinnerService
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

}
