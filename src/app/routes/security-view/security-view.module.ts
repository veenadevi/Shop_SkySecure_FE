import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RecommendationsComponent } from './partials/recommendations/recommendations.component';
import { SecurityViewRoutingModule, ROUTED_COMPONENTS } from './security-view-routing.module';
import { SegmentationComponent } from './partials/recommendations/partials/segmentation/segmentation.component';



@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    RecommendationsComponent,
    SegmentationComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    SecurityViewRoutingModule
  ],
  exports: [
    RouterModule,
    SharedModule
  ]
})
export class SecurityViewModule { }
