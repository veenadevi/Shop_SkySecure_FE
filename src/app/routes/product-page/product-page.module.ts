import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductPageRoutingModule,  ROUTED_COMPONENTS} from './product-page-routing.module';
import { ProductComponent } from './product/product.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';
import { FormsModule } from '@angular/forms';
import { CategoryViewComponent } from './category-view/category-view.component';
@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    ProductComponent,
    ProductDetailComponent,
    MultiSelectDropdownComponent,
    CategoryViewComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    NgbModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    NgMultiSelectDropDownModule
  ],
  exports: [
    RouterModule
  ]
})
export class ProductPageModule { }
