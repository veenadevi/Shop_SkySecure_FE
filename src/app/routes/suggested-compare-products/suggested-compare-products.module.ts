import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SuggestedCompareProductsRoutingModule, ROUTED_COMPONENTS } from './suggested-compare-products-routing.module';
import { SuggestedCompareProductsComponent } from './suggested-compare-products.component';
import { SuggestedCompareProductsResultComponent } from './suggested-compare-products-result/suggested-compare-products-result.component';
import { HeaderCardFlyerComponent } from './partials/header-card-flyer/header-card-flyer.component';
import { EmptyHeaderCardFlyerComponent } from './partials/empty-header-card-flyer/empty-header-card-flyer.component';

// import { CompareProductsRoutingModule, ROUTED_COMPONENTS } from './compare-products-routing.module';
// import { CompareProductsComponent } from './compare-products.component';
// import { CompareProductsResultComponent } from './compare-products-result/compare-products-result.component';
// import { CompareProductsHomeComponent } from './compare-products-home/compare-products-home.component';
// import { HeaderCardFlyerComponent } from './partials/header-card-flyer/header-card-flyer.component';
// import { EmptyHeaderCardFlyerComponent } from './partials/empty-header-card-flyer/empty-header-card-flyer.component';


@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    SuggestedCompareProductsComponent,
    SuggestedCompareProductsResultComponent,
    //CompareProductsHomeComponent,
    HeaderCardFlyerComponent,
    EmptyHeaderCardFlyerComponent,
    
  ],
  imports: [
    CommonModule,
    SuggestedCompareProductsRoutingModule,
    NgbModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    SharedModule
  ]
})
export class SuggestedCompareProductsModule { }
