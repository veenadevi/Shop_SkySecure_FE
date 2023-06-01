import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'brand-card-flyer',
  templateUrl: './brand-card-flyer.component.html',
  styleUrls: ['./brand-card-flyer.component.css']
})
export class BrandCardFlyerComponent implements OnInit{

  @Input('item')
  public item : any;

  constructor(
    private router : Router
  ){}

  ngOnInit(): void {
    console.log("*** ++++ ****, ", this.item);
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
