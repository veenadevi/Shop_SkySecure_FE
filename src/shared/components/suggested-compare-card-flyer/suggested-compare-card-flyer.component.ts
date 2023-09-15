import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'suggested-compare-card-flyer',
  templateUrl: './suggested-compare-card-flyer.component.html',
  styleUrls: ['./suggested-compare-card-flyer.component.css']
})
export class SuggestedCompareCardFlyerComponent {

  @Input('item')
  public item : any;

  @Output() removableItem = new EventEmitter();

  public productItem ;

  // @Input() set item(val) {
  //   this.productItem = val;
  // }

  public defaultLogo = "../../../assets/icons/AddProductIcon.svg" ;

  constructor(
    private router : Router
  ){
    
  }

  ngOnInit(): void {

    // console.log("******* ^^^^ ABCD", this.productItem);
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

  public removeItem(itemId){
    this.removableItem.emit(itemId);
  }
  
}
