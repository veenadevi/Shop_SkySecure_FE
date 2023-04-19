import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'feature-list-table',
  templateUrl: './feature-list-table.component.html',
  styleUrls: ['./feature-list-table.component.css']
})
export class FeatureListTableComponent implements OnInit{

  @Input('product')
  public product : any;

  public productVarients : any[] = [];

  ngOnInit(): void {
    console.log("***** This ", this.product);

    this.setProductVarients(this.product.productVariants)
  }

  productVariants
  public setProductVarients(productVarients){
    this.productVariants = productVarients;
  }
  

}
