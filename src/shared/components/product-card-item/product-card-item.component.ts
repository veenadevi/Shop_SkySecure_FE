import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'product-card-item',
  templateUrl: './product-card-item.component.html',
  styleUrls: ['./product-card-item.component.css']
})
export class ProductCardItemComponent implements OnInit{

  @Input('productList')
  public productList : any[];

  @Input('routePath')
  public routePath : string;

  constructor(
    private router: Router
  ){}


  public ngOnInit(): void {
  }


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
