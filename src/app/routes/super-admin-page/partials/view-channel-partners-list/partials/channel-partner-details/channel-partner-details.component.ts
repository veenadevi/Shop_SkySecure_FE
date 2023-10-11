import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
@Component({
  selector: 'channel-partner-details',
  templateUrl: './channel-partner-details.component.html',
  styleUrls: ['./channel-partner-details.component.css']
})
export class ChannelPartnerDetailsComponent implements  OnInit{


  private subscription : Subscription[] = [];

  constructor(
    private router : Router,
    private superAdminService : SuperAdminService
  ){}




  ngOnInit(): void {

    this.getDetails();
    
  }


  public getDetails(){
    let id = "6524f47927b4d40053d34101";
    this.subscription.push(
      this.superAdminService.getChannelPartnerDetails(id).subscribe(res=>{
        console.log("_+_+_+_ Res", res);
      })
    )
  }



}
