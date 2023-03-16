import { Component } from '@angular/core';
import { map, forkJoin, Subscription, switchMap } from 'rxjs';
import { UserCartRequestModel } from 'src/shared/models/concrete/user-cart.model';
import { CartService } from 'src/shared/services/cart.service';
import { GlobalSearchService } from 'src/shared/services/global-search.service';
import { CartStore } from 'src/shared/stores/cart.store';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent {
  private subscriptions : Subscription[] = [];

  public cartItems : any;

  constructor(
    private globalSearch : GlobalSearchService,
    private cartStore : CartStore,
    private cartService : CartService
  ) {}

public cartData : any[] = [];
  public cartItems$ = this.cartStore.cartItems$
  .pipe(
    map(data => {
      if(data){
        this.cartData = data.usercart[0].userCartDetails;
        return this.cartData;
      }
      else{
        return data;
      }
    }
    )
  )

  public ngOnInit() : void {


    /** 
     * FUnction call to set and get Cart Items
     */

    this.getCartItems();


    this.fetchCategoryMock();

  }

  public fetchCategoryMock() : void{
    
    this.subscriptions.push(
      this.globalSearch.fetchCartMock().subscribe( response => {
        this.cartItems = response.category;
      })
      
    );
  
  }

  public getCartItems() : void {

    let cartRefId = this.cartStore.getCartRefreneceId();
    let re = new UserCartRequestModel({
      userId : "1001",
      createdBy : "ADMIN",
      products : [{
          "productId":"6408c67ebc262d784813b71f",
          "quantity" :4
      }
      ]
    });

    if(cartRefId !== '' || cartRefId !== null){
      re.cart_ref_id = cartRefId;
    }


    this.cartService.addCartItems(re)
        .pipe(
          //Use switchMap to call another API(s)
          switchMap((dataFromServiceOne) => {
            //Lets map so to an observable of API call
            const allObs$ = this.cartService.getCartItems(null);

            //forkJoin will wait for the response to come for all of the observables
            return forkJoin(allObs$);
          })
        ).subscribe((forkJoinResponse) => {
          //forkJoinResponse will be an array of responses for each of the this.serviceTwo.getAllServiceTwoData CALL
          //Do whatever you want to do with this array
        
        });
    // productService.GetAllProducts()
    // .switchMap(
    //   products => forkJoin(products.map(product => productService.DeleteProduct(product)))
    // )
    // .switchMap(() => productService.GetCategories())
    // .switchMap(
    //   categories => forkJoin(categories.map(category => productService.DeleteCategory(category)))
    // )
    // .subscribe(() => console.log('done'))
    //   

  }

  public quantityEdit(i, opr) : void {


    if(opr === 'plus'){
      this.cartData[i].quantity = this.cartData[i].quantity + 1;
    }
    else if(opr === 'minus'){
      this.cartData[i].quantity = this.cartData[i].quantity - 1;
    }
  }

}
