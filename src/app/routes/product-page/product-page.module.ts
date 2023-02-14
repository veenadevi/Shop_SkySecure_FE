import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductPageRoutingModule,  ROUTED_COMPONENTS} from './product-page-routing.module';
import { ProductComponent } from './product/product.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    NgbModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    RouterModule
  ]
})
export class ProductPageModule { }
