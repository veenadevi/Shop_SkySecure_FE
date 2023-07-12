import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { CompareProductsRoutingModule, ROUTED_COMPONENTS } from './compare-products-routing.module';
import { CompareProductsComponent } from './compare-products.component';






@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    CompareProductsComponent,
    
  ],
  imports: [
    CommonModule,
    CompareProductsRoutingModule,
    NgbModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    SharedModule
  ]
})
export class CompareProductsModule { 
  
}