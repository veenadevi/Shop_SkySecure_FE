import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CartViewRoutingModule ,  ROUTED_COMPONENTS} from './cart-view-routing.module';
import { CartItemsComponent } from './partials/cart-items/cart-items.component';
import { CartEmptyComponent } from './partials/cart-empty/cart-empty.component';
import { CartSubmitComponent } from './partials/cart-submit/cart-submit.component';





@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    CartItemsComponent,
    CartEmptyComponent,
    CartSubmitComponent
  ],
  imports: [
    CommonModule,
    CartViewRoutingModule,
    NgbModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    SharedModule
  ]
})
export class CartViewModule { 
  
}
