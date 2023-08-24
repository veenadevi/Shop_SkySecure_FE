import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { SuperAdminStore } from 'src/shared/stores/super-admin.store';

@Component({
  selector: 'app-assign-leads-modal',
  templateUrl: './assign-leads-modal.component.html',
  styleUrls: ['./assign-leads-modal.component.css']
})
export class AssignLeadsModalComponent implements OnInit{

  public groupedCities : any;

  public crmUsersList : any;

  selectedCity: string | undefined;

  selectedUser : any;

  private subscriptions : Subscription[] = [];

  public closingDate : Date | undefined;

  constructor(
    private superAdminService : SuperAdminService,
    private superAdminStore : SuperAdminStore
  ){
    this.groupedCities = [
      {
          label: 'Germany',
          value: 'de',
          items: [
              { label: 'Berlin', value: 'Berlin' },
              { label: 'Frankfurt', value: 'Frankfurt' },
              { label: 'Hamburg', value: 'Hamburg' },
              { label: 'Munich', value: 'Munich' }
          ]
      },
      {
          label: 'USA',
          value: 'us',
          items: [
              { label: 'Chicago', value: 'Chicago' },
              { label: 'Los Angeles', value: 'Los Angeles' },
              { label: 'New York', value: 'New York' },
              { label: 'San Francisco', value: 'San Francisco' }
          ]
      },
      {
          label: 'Japan',
          value: 'jp',
          items: [
              { label: 'Kyoto', value: 'Kyoto' },
              { label: 'Osaka', value: 'Osaka' },
              { label: 'Tokyo', value: 'Tokyo' },
              { label: 'Yokohama', value: 'Yokohama' }
          ]
      }
  ];
  }

   // Cart Click

   public crmUsers$ = this.superAdminStore.crmUsers$
   .pipe(
     map(data => {
       if(data){
        //console.log("_+_+_+_+_+_+ In Ser", data);
         return data;
         
       }
       else{
         return data;
       }
     }
     )
   )

  ngOnInit(): void {
    this.getAllCRMUsers();
  }

  public getAllCRMUsers(){
    this.subscriptions.push(
      this.crmUsers$.subscribe(res=>{
        
        this.crmUsersList = res;
        
        //this.selectedUser = res[0];
      })
    )
  }

  public submit(){
    console.log("++_+_+_+_+_+_+_+ _Data here", this.closingDate);
  }

  public onChange(event){
    console.log("++_+_+_+_+_+_+_+ _Data here", event.value);
  }
}
