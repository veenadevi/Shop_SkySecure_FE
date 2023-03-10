import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalSearchService } from 'src/shared/services/global-search.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent {
  private subscriptions : Subscription[] = [];

  public cartItems : any;

  constructor(
    private globalSearch : GlobalSearchService
  ) {}


  public ngOnInit() : void {
    this.fetchCategoryMock();
  }

  public fetchCategoryMock() : void{
    
    this.subscriptions.push(
      this.globalSearch.fetchCartMock().subscribe( response => {
        console.log("*** res ", response.category);
        this.cartItems = response.category;
      })
      
    );
  
  }

}
