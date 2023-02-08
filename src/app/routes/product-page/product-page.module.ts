import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductPageRoutingModule,  ROUTED_COMPONENTS} from './product-page-routing.module';



@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    NgbModule
  ],
  exports: [
    RouterModule
  ]
})
export class ProductPageModule { }
