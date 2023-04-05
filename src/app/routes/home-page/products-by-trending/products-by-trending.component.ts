import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { CartStore } from 'src/shared/stores/cart.store';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'products-by-trending',
  templateUrl: './products-by-trending.component.html',
  styleUrls: ['./products-by-trending.component.css']
})
export class ProductsByTrendingComponent {

  private subscriptions : Subscription[] = [];
  public trendingProductsList : any[] = [];

  public staticProductimageUrl = 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg';

  constructor(
    private metadataStore : MetadataStore,
    private cartStore : CartStore,
    private router : Router
    
  ) {

  }

  public trendingProducts$ = this.metadataStore.trendingProducts$
  .pipe(
    map(data => {
      
      if(data){
        //this.loaderService.hide(LoadingType.Full)
       
        return data;
        //return data.splice(0,7);
      }
      else{
        //this.loaderService.hide(LoadingType.Full)
       
        return data;
      }
    }
    )
  )

  public ngOnInit() : void {
    this.setTrendingProductsGrid();
  }

  public setTrendingProductsGrid(){

    this.subscriptions.push(
      this.trendingProducts$.subscribe( response => {
        this.trendingProductsList = response;
      })
    )
    
  }

  
  public requestQuote (product : ProductsDetails) : void {

    
    var existingItems = this.cartStore.getCartItems();
    // if(existingItems && existingItems.usercart.length > 0){
      
    //   existingItems.usercart[0].userCartDetails.push({
    //     "productId": product,
    //     "quantity" : 1
    //   });
    // }
    //this.cartStore.setCartItems(product);
    // this.router.navigate(['/cart']);

    let queryParams = {
      productName : product.name,
      productId : product._id,
      quantity : 1,
    };
    this.router.navigate(['/cart'], {queryParams: queryParams});




  }

}
