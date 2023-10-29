import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewPageRoutingModule } from './review-page-routing.module';
import { ReviewPageComponent } from './review-page.component';
import { ReviewHomeComponent } from './partials/review-home/review-home.component';
import { ReviewDetailPageComponent } from './partials/review-detail-page/review-detail-page.component';
import { ReviewRatingPageComponent } from './partials/review-rating-page/review-rating-page.component';
import { ReviewFinalPageComponent } from './partials/review-final-page/review-final-page.component';
import { MaterialModule } from 'src/app/material.module';
import { TrendingProductComponent } from './partials/trending-product/trending-product.component';
import { SharedModule } from 'primeng/api';



@NgModule({
  declarations: [
    ReviewPageComponent,
    ReviewHomeComponent,
    ReviewDetailPageComponent,
    ReviewRatingPageComponent,
    ReviewFinalPageComponent,
    TrendingProductComponent,
   

   
  ],
  imports: [
    CommonModule,
    ReviewPageRoutingModule,
    MaterialModule,
    SharedModule,
    
  ],
  exports: [
    MaterialModule,
    SharedModule
  ]
})
export class ReviewPageModule {
 }
