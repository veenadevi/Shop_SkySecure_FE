import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'product-card-flyer',
  templateUrl: './product-card-flyer.component.html',
  styleUrls: ['./product-card-flyer.component.css']
})
export class ProductCardFlyerComponent implements OnInit{



  @Input() products : Array<any> = [];

  @Input() type : any;

  constructor(
    private router : Router
  ){}


  ngOnInit(): void {
    

  }

  public navigateToProductDetails(product:any){
    
    /*if(this.routePath === 'productBundles'){
      this.router.navigate(['/products/brand-detail', product._id]);
    }
    else{
      this.router.navigate(['/products', product._id]);
    }*/
    this.router.navigate(['/products', product._id]);
  }

  public onFilterChange($event){
    console.log("******* ^^^^^ +++ Event", $event.target.checked);
  }


}
