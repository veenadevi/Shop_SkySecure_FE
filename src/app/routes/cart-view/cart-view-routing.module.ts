import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from './cart-view.component';
import { CartEmptyComponent } from './partials/cart-empty/cart-empty.component';
import { CartItemsComponent } from './partials/cart-items/cart-items.component';
import { CartSubmitComponent } from './partials/cart-submit/cart-submit.component';

const routes: Routes = [
  {
    path: '',
    component: CartViewComponent,
    /*data: {
      title: 'Backlog'
    }*/
    children: [
      // {
      //   path: '',
      //   redirectTo: 'summary'
      // },
      {
        path: '',
        component : CartItemsComponent
      },
      {
        path: 'cart-empty',
        component: CartEmptyComponent,
        data: {
          title: 'Cart Empty'
        }
      },
      {
        path: 'cart-submit',
        component: CartSubmitComponent,
        data: {
          title: 'Cart Submitted'
        }
      },
  
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartViewRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ CartViewComponent ];
