import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'compare-product-item-flyer',
  templateUrl: './compare-product-item-flyer.component.html',
  styleUrls: ['./compare-product-item-flyer.component.css']
})
export class CompareProductItemFlyerComponent {

  @Input('item')
  public item : any;

  public defaultLogo = "../../../assets/icons/AddProductIcon.svg" ;

  constructor(
    private router : Router
  ){
    
  }

  ngOnInit(): void {

    console.log("******* ^^^^ ABCD", this.item);
  }

  public navigateTo(item){
    
    if(item.prdType === 'bundle'){
      this.router.navigate(['/products/brand-detail', item.navigationId]);
    }
    else{
      this.router.navigate(['/products', item.navigationId]);
    }
    // this.router.navigate(['/products/brand-detail', id]);
  }

  public getColor(val){
    if(val){
      return val.toLowerCase();
    }
    else{
      return 'Black'
    }
  }
  
}
