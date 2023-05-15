import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPageRoutingModule, ROUTED_COMPONENTS } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { FeatureUpdateComponent } from './partials/feature-update/feature-update.component';




@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    AdminPageComponent,
    FeatureUpdateComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    AdminPageRoutingModule
  ],
  exports: [
    RouterModule,
    SharedModule,
  ]
})
export class AdminPageModule { }
