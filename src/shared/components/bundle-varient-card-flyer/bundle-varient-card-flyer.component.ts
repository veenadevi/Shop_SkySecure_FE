import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bundle-varient-card-flyer',
  templateUrl: './bundle-varient-card-flyer.component.html',
  styleUrls: ['./bundle-varient-card-flyer.component.css']
})
export class BundleVarientCardFlyerComponent implements OnInit{

  @Input('product')
  public product : any;
  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';

  ngOnInit(): void {
    // console.log("+++++++++ Val ", this.product);
  }

}
