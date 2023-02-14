import { Component } from '@angular/core';

@Component({
  selector: 'search-box',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  public isOpen = false;

  public onSearchClicked() {
    console.log("Show");
    this.isOpen = true;
  }

  public onFocusOutEvent(event: any){
    console.log(event.target.value);
    this.isOpen = false;
  }

}
