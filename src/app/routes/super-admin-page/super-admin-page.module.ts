import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { SuperAdminPageRoutingModule,ROUTED_COMPONENTS } from './super-admin-page-routing.module';
import { SuperAdminPageComponent } from './super-admin-page.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountListComponent } from './partials/account-list/account-list.component';
import { MarketplaceuserComponent } from './partials/marketplaceuser/marketplaceuser.component';


@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    SuperAdminPageComponent,
    AccountListComponent,
    MarketplaceuserComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    SuperAdminPageRoutingModule
  ],
  exports: [
    RouterModule,
    SharedModule,
  ]
})
export class SuperAdminPageModule { }
