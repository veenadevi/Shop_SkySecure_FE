import { Component } from '@angular/core';
import { HomePageService } from '../../../shared/services/home-page.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePgaeComponent {

  constructor(
    private homePageService: HomePageService
  ){}

  public ngOnInit() : void {
    console.log("GOT Here");
    this.homePageService.fetchData();
  }

}