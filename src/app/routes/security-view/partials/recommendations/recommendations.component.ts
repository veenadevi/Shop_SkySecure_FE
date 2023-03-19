import { Component } from '@angular/core';
import { UserGraphLoginService } from 'src/shared/services/user-graph-login.service';

@Component({
  selector: 'recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {

  constructor (
    private userGraphLoginService : UserGraphLoginService
  ){}

  public connectToTenant() : void {
    this.userGraphLoginService.adLogin();
  }

}
