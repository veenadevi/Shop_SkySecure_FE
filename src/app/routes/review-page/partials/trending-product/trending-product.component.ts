
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { AddItemsToCartService } from 'src/shared/services/global-function-service/add-items-to-cart.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'trending-product',
  templateUrl: './trending-product.component.html',
  styleUrls: ['./trending-product.component.css']
})
export class TrendingProductComponent {

  private subscriptions : Subscription[] = [];
  public trendingProductsList : any[] = [];
  productName
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
       console.log("data",data)
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

  // public setTrendingProductsGrid(){

  //   this.subscriptions.push(
  //     this.trendingProducts$.subscribe( response => {
  //       this.trendingProductsList = response;
  //       console.log("treandig res",this.trendingProductsList)
  //        this.productName = this.trendingProductsList.map((product) => product.name);
  //       console.log("Names:", this.productName);
         
  //     })
  //   )
    
  // }

  public setTrendingProductsGrid() {
    this.subscriptions.push(
      this.trendingProducts$.subscribe(response => {
        this.trendingProductsList = response;
        console.log("trending res", this.trendingProductsList);
        this.productName = this.trendingProductsList.map((product) => product.name);
        console.log("Names:", this.productName);
      })
    );
  }
  selectedProductName: string;

  // Function to set the selected product name
  public selectProduct(productId: string, productName: string) {
    this.selectedProductName = productName; // Set the selected product name
    this.router.navigate([`/review-page/review-detail-page/${productId}`], {
      queryParams: { productName: this.selectedProductName } });
  }


  // public requestQuote (product : ProductsDetails) : void {

    
  //   var existingItems = this.cartStore.getCartItems();
  //   // if(existingItems && existingItems.usercart.length > 0){
      
  //   //   existingItems.usercart[0].userCartDetails.push({
  //   //     "productId": product,
  //   //     "quantity" : 1
  //   //   });
  //   // }
  //   //this.cartStore.setCartItems(product);
  //   // this.router.navigate(['/cart']);

  //   let queryParams = {
  //     productName : product.name,
  //     productId : product._id,
  //     quantity : 1,
  //   };

  //  console.log("queryparam",existingItems)
  //   this.addItemsToCartService.addItemsToCart(queryParams);
  //   //this.router.navigate(['/cart'], {queryParams: queryParams});
  //   //console.log("queryparam",existingItems)
  // }

  // public navigateToProducts(product: any): void {
  //   this.requestQuote(product);
  // }





//   public selectProduct(productId: string) {
//     this.router.navigate([`/review-page/review-detail-page/${productId}`], {
//       queryParams: { productName: this.productName }
//     });
//  }


//  public selectProduct(productId: string, productName: string) {
//   this.router.navigate([`/review-page/review-detail-page/${productId}`], {
//     queryParams: { productName: this.productName }
//   });
//   // this.selectProductName(productName)
// }
}
