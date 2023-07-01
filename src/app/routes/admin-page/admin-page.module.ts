import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPageRoutingModule, ROUTED_COMPONENTS } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { FeatureUpdateComponent } from './partials/feature-update/feature-update.component';
import { AdminDashboardComponent } from './partials/admin-dashboard/admin-dashboard.component';
import { AllAccountsComponent } from './partials/all-accounts/all-accounts.component';
import { AccountDetailsComponent } from './partials/account-details/account-details.component';
import { DealsDetailsComponent } from './partials/deals-details/deals-details.component';
import { EstimateDetailsComponent } from './partials/estimate-details/estimate-details.component';




@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    AdminPageComponent,
    FeatureUpdateComponent,
    AdminDashboardComponent,
    AllAccountsComponent,
    AccountDetailsComponent,
    DealsDetailsComponent,
    EstimateDetailsComponent,
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
