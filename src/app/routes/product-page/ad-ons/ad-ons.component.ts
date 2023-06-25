import { Component, Input } from '@angular/core';

@Component({
  selector: 'ad-ons',
  templateUrl: './ad-ons.component.html',
  styleUrls: ['./ad-ons.component.css']
})
export class AdOnsComponent {

  public compareProductsList : any[];

  @Input() set productsList (value: any[]){
    console.log("++++++++ List in AdOns ", value);
    this.compareProductsList = value;
  }

}
