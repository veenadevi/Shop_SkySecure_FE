import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { LoginService } from 'src/shared/services/login-service';

@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})

export class UserPanelComponent implements OnInit{

  @Input('isExpanded')
  public isExpanded : any;


  
  public navExpanded : boolean = false;

  constructor(
    private loginService: LoginService
  ){}

    public ngOnInit(): void {
      //this.navExpanded = false;
      //this.navExpanded = this.isExpanded;
    }

    public logout() {
      this.loginService.logout();
    }

    ngOnChanges(changes: SimpleChanges) {
        
      
        this.navExpanded = changes.isExpanded.currentValue;
        console.log("**** Changed" , this.isExpanded);
      
      
      // You can also use categoryId.previousValue and 
      // categoryId.firstChange for comparing old and new values
      
  }
}
