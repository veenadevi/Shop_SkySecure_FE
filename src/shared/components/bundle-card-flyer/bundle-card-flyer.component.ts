import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bundle-card-flyer',
  templateUrl: './bundle-card-flyer.component.html',
  styleUrls: ['./bundle-card-flyer.component.css']
})
export class BundleCardFlyerComponent implements OnInit{

  @Input('productItem')
  public productItem : any;

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';




  ngOnInit(): void {
    // console.log("+++++++++ Val ", this.productItem);
  }
}
