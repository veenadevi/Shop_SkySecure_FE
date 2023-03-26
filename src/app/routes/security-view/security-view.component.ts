import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { MicrosoftGraphService } from 'src/shared/services/microsoft-graph.service';

@Component({
  selector: 'security-view',
  templateUrl: './security-view.component.html',
  styleUrls: ['./security-view.component.css']
})
export class SecurityViewComponent implements OnInit{


  public connectionStatus: string = null;
  constructor(
    private microsoftGraphService : MicrosoftGraphService
  ){

  }
  
  

  ngOnInit(): void {
    //this.checkConnectionStatus();
  }

  public checkConnectionStatus() : void {

   this.microsoftGraphService.getConnectionStatus().subscribe( res => {
    this.connectionStatus = res.connection.connectionStatus ? 'Y' : 'N';
   });

  }

  

}
