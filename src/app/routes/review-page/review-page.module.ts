import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewPageRoutingModule } from './review-page-routing.module';
import { ReviewPageComponent } from './review-page.component';
import { ReviewHomeComponent } from './partials/review-home/review-home.component';
import { ReviewDetailPageComponent } from './partials/review-detail-page/review-detail-page.component';
import { ReviewRatingPageComponent } from './partials/review-rating-page/review-rating-page.component';



@NgModule({
  declarations: [
    ReviewPageComponent,
    ReviewHomeComponent,
    ReviewDetailPageComponent,
    ReviewRatingPageComponent,
   
  ],
  imports: [
    CommonModule,
    ReviewPageRoutingModule
  ]
})
export class ReviewPageModule { }
