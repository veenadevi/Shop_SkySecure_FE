import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-card-flyer',
  templateUrl: './product-card-flyer.component.html',
  styleUrls: ['./product-card-flyer.component.css']
})
export class ProductCardFlyerComponent implements OnInit{



  @Input() products : Array<any> = [];

  @Input() type : any;


  ngOnInit(): void {
    
    console.log("**** **SAmpel ", this.products);
    console.log("**** **SAmpel Type", this.type);
  }


}
