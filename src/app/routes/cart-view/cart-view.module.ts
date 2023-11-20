import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CartViewRoutingModule ,  ROUTED_COMPONENTS} from './cart-view-routing.module';
import { CartItemsComponent } from './partials/cart-items/cart-items.component';
import { CartEmptyComponent } from './partials/cart-empty/cart-empty.component';
import { CartSubmitComponent } from './partials/cart-submit/cart-submit.component';
import { PaymentGatewayResponseComponent } from './partials/payment-gateway-response/payment-gateway-response.component';
import { RequestQuoteStepsComponent } from './partials/request-quote-steps/request-quote-steps.component';
import { RequestStepsRoutingComponent } from './partials/request-quote-steps/partials/request-steps-routing/request-steps-routing.component';
import { GstDetailsComponent } from './partials/request-quote-steps/partials/gst-details/gst-details.component';
import { BusinessDetailsComponent } from './partials/request-quote-steps/partials/business-details/business-details.component';
import { OverviewComponent } from './partials/request-quote-steps/partials/overview/overview.component';





@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    CartItemsComponent,
    CartEmptyComponent,
    CartSubmitComponent,
    PaymentGatewayResponseComponent,
    RequestQuoteStepsComponent,
    RequestStepsRoutingComponent,
    GstDetailsComponent,
    BusinessDetailsComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    CartViewRoutingModule,
    NgbModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    SharedModule,
    CommonModule
  ]
})
export class CartViewModule { 
  
}
