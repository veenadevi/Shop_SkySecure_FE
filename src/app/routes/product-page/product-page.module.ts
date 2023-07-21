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
import { BrandBundleComponent } from './brand-detail/partials/brand-bundle/brand-bundle.component';
import { BrandFeaturesComponent } from './brand-detail/partials/brand-features/brand-features.component';
import { BrandCardFlyerComponent } from './brand-detail/partials/brand-card-flyer/brand-card-flyer.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { AdOnsComponent } from './ad-ons/ad-ons.component';
import { CompareProductsFlyerComponent } from './ad-ons/partials/compare-products-flyer/compare-products-flyer.component';
import { CompareProductItemFlyerComponent } from '../../../shared/components/compare-product-item-flyer/compare-product-item-flyer.component';
import { MaterialModule } from 'src/app/material.module';
import { PrimeNgModule } from 'src/app/prime-ng.module';
import { ProductBundleDetailComponent } from './product-bundle-detail/product-bundle-detail.component';
import { ProductBundleVariantDetailComponent } from './product-bundle-variant-detail/product-bundle-variant-detail.component';

import { ProductDetailsVariantByIdComponent } from './product/product-details-variant-by-id/product-details-variant-by-id.component';
import { DetailsCompareProductsFlyerComponent } from './ad-ons/partials/details-compare-products-flyer/details-compare-products-flyer.component';
import { SafeUrlPipe } from 'src/shared/pipes/safeUrlPipe';




@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    ProductComponent,
    ProductDetailComponent,
    MultiSelectDropdownComponent,
    SimilarProductsComponent,
    BrandDetailComponent,
    BrandBundleComponent,
    BrandFeaturesComponent,
    BrandCardFlyerComponent,
    ProductFilterComponent,
    AdOnsComponent,
    CompareProductsFlyerComponent,
    ProductBundleDetailComponent,
    ProductBundleVariantDetailComponent,
    ProductDetailsVariantByIdComponent,
    DetailsCompareProductsFlyerComponent,
    SafeUrlPipe
    
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
    MaterialModule,
    PrimeNgModule
    
    
  ],
  exports: [
    RouterModule,
    SharedModule,
    MaterialModule,
    PrimeNgModule
    
  ]
})
export class ProductPageModule { }
