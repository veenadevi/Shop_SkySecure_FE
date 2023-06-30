import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'contact-us-flyer',
  templateUrl: './contact-us-flyer.component.html',
  styleUrls: ['./contact-us-flyer.component.css']
})
export class ContactUsFlyerComponent {


  public displayBasic: boolean; 


  constructor(
    private primengConfig: PrimeNGConfig
    ) {}

    ngOnInit() {
      this.primengConfig.ripple = true;
    }
    
    showBasicDialog() {
      this.displayBasic = true;
    }

}
