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

  public navigateTo(id){
    this.router.navigate(['/products', id]);
    // this.router.navigate(['/products/brand-detail', id]);
  }

  public getColor(val){
    return val.toLowerCase();
  }
  
}
