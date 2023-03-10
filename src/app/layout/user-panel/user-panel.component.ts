import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit{

  public navExpanded : boolean = false;

    public ngOnInit(): void {
      this.navExpanded = true;
    }
}
