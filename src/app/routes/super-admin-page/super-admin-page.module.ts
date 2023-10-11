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
import { MyCustomersComponent } from './partials/my-customers/my-customers.component';
import { ChannelPartnerDetailsComponent } from './partials/view-channel-partners-list/partials/channel-partner-details/channel-partner-details.component';
import { RoleAssigmentComponent } from './partials/role-assigment/role-assigment.component';
<<<<<<< Updated upstream
import { ManagaeAllAdminComponent } from './partials/managae-all-admin/managae-all-admin.component';
=======
// import { ManagaeAllAdminComponent } from './partials/manage-all-admin/managae-all-admin.component';
import { ManageAllChannelsComponent } from './partials/manage-all-channels/manage-all-channels.component';
>>>>>>> Stashed changes



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
    ViewChannelPartnersListComponent,
    MyCustomersComponent,
    ChannelPartnerDetailsComponent, 
    RoleAssigmentComponent, 
     ManageAllChannelsComponent
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
