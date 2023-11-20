import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from './cart-view.component';
import { CartEmptyComponent } from './partials/cart-empty/cart-empty.component';
import { CartItemsComponent } from './partials/cart-items/cart-items.component';
import { CartSubmitComponent } from './partials/cart-submit/cart-submit.component';
import { MsalGuard } from '@azure/msal-angular';
import { PaymentGatewayResponseComponent } from './partials/payment-gateway-response/payment-gateway-response.component';
import { RequestQuoteStepsComponent } from './partials/request-quote-steps/request-quote-steps.component';

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
        component : CartItemsComponent,
        canActivate : []
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
      {
        path: 'payment-status/:id',
        component : PaymentGatewayResponseComponent,
        canActivate : []
      },
      {
        path : 'request-quote',
        component : RequestQuoteStepsComponent,
        canActivate : []
      }
  
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
