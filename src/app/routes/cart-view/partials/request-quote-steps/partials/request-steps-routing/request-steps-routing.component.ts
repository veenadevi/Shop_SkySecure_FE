import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'request-steps-routing',
  templateUrl: './request-steps-routing.component.html',
  styleUrls: ['./request-steps-routing.component.css'],
  providers: [MessageService]
})
export class RequestStepsRoutingComponent {


  public steps : any;

  constructor(
    public router: Router
  ){}

  ngOnInit() {
    this.steps = [
        {
            label: 'GST Details',
            routerLink: 'gstDetails'
        },
        {
            label: 'Business Details',
            routerLink: 'businessDetails'
        },
        {
            label: 'Overview',
            routerLink: 'overview'
        }
    ];

    
}

}
