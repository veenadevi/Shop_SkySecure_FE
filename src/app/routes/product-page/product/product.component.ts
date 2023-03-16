import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { LoginService } from 'src/shared/services/login.service';
import { CartStore } from 'src/shared/stores/cart.store';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() products : Array<any> = [];

  constructor ( 
    private authService : MsalService,
    private loginService : LoginService,
    private cartStore : CartStore,
    private router : Router
  ){

  }


  public requestQuote (product : ProductsDetails) : void {

    
    var existingItems = this.cartStore.getCartItems();
    if(existingItems && existingItems.usercart.length > 0){
      
      existingItems.usercart[0].userCartDetails.push({
        "productId": product,
        "quantity" : 1
      });
    }
    //this.cartStore.setCartItems(product);
    //this.router.navigate(['/cart']);




  }
  
}
