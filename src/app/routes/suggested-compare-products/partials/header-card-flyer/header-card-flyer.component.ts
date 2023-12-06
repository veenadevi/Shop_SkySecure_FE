import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-card-flyer',
  templateUrl: './header-card-flyer.component.html',
  styleUrls: ['./header-card-flyer.component.css']
})
export class HeaderCardFlyerComponent implements OnInit{

  @Input('product')
  public product : any;

  public productItem : any;

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';


  constructor(
    private router : Router,
    
  ){}
  ngOnInit(): void {
    if(this.product && this.product.properties){
      
      this.productItem = this.product.properties;
      console.log("()()()()() In Flyer", this.productItem);
    }
    
  }
  public navigateToProductDetails(product:any){
    this.router.navigate(['/products', product._id]); 
  }
}
