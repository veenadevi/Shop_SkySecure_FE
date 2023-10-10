import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { AddItemsToCartService } from 'src/shared/services/global-function-service/add-items-to-cart.service';
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

  public staticProductimageUrl = 'https://csg1003200209655332.blob.core.windows.net/images/1681727933-Microsofticon.png';

  constructor(
    private metadataStore : MetadataStore,
    private cartStore : CartStore,
    private router : Router,
    private addItemsToCartService : AddItemsToCartService
    
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

   
    this.addItemsToCartService.addItemsToCart(queryParams);
    //this.router.navigate(['/cart'], {queryParams: queryParams});




  }

  public navigateToProducts(product: any): void {
    this.requestQuote(product);
  }

  public navigateToCart(cart : any) {
  }

  public navigateToProductDetails(product:any){
    //['/products', product._id]
  }
  

}
