import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, map } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{


  private subscriptions : Subscription[] = [];

  public totalAccounts : string;

  constructor(
    private spinnerService : NgxSpinnerService,
    private adminPageService : AdminPageService
  ){}

  public dashboardData$ = this.adminPageService.getDashboardData()
  .pipe(
    map(data => {
      this.spinnerService.show();
      if(data){
        this.spinnerService.hide();
        return data;
        
      }
      else{
        this.spinnerService.hide();
        return data;
      }
    }
    )
  )

  ngOnInit(): void {
    
    
    /*this.subscriptions.push(
      
      this.adminPageService.getDashboardData().subscribe( response => {
        console.log("***** +++++ , dashboard Data ", response);
        //this.spinnerService.hide();
      })
    )*/
  }


}
