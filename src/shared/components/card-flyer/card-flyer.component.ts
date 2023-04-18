import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'card-flyer',
  templateUrl: './card-flyer.component.html',
  styleUrls: ['./card-flyer.component.css']
})
export class CardFlyerComponent {

  @Input('product')
  public product : any;

  @Input('routePath')
  public routePath : string;

  constructor(
    private router: Router
  ){}

  public requestQuote(product:any){

    let queryParams = {
      productName : product.name,
      productId : product._id,
      quantity : 1,
    };
    this.router.navigate(['/cart'], {queryParams: queryParams});
  }

  public navigateToProductDetails(product:any){
    
    this.router.navigate(['/products', product._id]);
  }

}
