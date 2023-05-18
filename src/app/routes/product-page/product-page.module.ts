import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductPageRoutingModule,  ROUTED_COMPONENTS} from './product-page-routing.module';
import { ProductComponent } from './product/product.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';
import { FormsModule } from '@angular/forms';
import { SimilarProductsComponent } from './similar-products/similar-products.component';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';




@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    ProductComponent,
    ProductDetailComponent,
    MultiSelectDropdownComponent,
    SimilarProductsComponent,
    BrandDetailComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    NgbModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    SharedModule,
  ],
  exports: [
    RouterModule,
    SharedModule
  ]
})
export class ProductPageModule { }
