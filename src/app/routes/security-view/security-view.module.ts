import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 
import { MaterialModule } from 'src/app/material.module';
import { PrimeNgModule } from 'src/app/prime-ng.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RecommendationsComponent } from './partials/recommendations/recommendations.component';
import { SecurityViewRoutingModule, ROUTED_COMPONENTS } from './security-view-routing.module';
import { SegmentationComponent } from './partials/recommendations/partials/segmentation/segmentation.component';
import { ActivityDetailsTableComponent } from './partials/recommendations/partials/activity-details-table/activity-details-table.component';
import { EmptyRecommViewComponent } from './partials/empty-recomm-view/empty-recomm-view.component';



@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    RecommendationsComponent,
    SegmentationComponent,
    ActivityDetailsTableComponent,
    EmptyRecommViewComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    SecurityViewRoutingModule,
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
export class SecurityViewModule { }
