import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { SuperAdminPageRoutingModule,ROUTED_COMPONENTS } from './super-admin-page-routing.module';
import { SuperAdminPageComponent } from './super-admin-page.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountListComponent } from './partials/account-list/account-list.component';
import { MarketplaceuserComponent } from './partials/marketplaceuser/marketplaceuser.component';
import { LeadSummaryComponent } from './partials/lead-summary/lead-summary.component';
import { ProductsTableComponent } from './partials/lead-summary/partials/products-table/products-table.component';
import { ProductsListTableComponent } from './partials/lead-summary/partials/products-list-table/products-list-table.component';
import { AssignUsersAndRolesComponent } from './partials/assign-users-and-roles/assign-users-and-roles.component';
import { AddNewChannelPartnerComponent } from './partials/add-new-channel-partner/add-new-channel-partner.component';
import { ViewChannelPartnersListComponent } from './partials/view-channel-partners-list/view-channel-partners-list.component';


@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    SuperAdminPageComponent,
    AccountListComponent,
    MarketplaceuserComponent,
    LeadSummaryComponent,
    ProductsTableComponent,
    ProductsListTableComponent,
    AssignUsersAndRolesComponent,
    AddNewChannelPartnerComponent,
    ViewChannelPartnersListComponent
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
