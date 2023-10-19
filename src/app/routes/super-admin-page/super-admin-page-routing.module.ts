import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminPageComponent } from './super-admin-page.component';
import { AccountListComponent } from './partials/account-list/account-list.component';
import { MarketplaceuserComponent } from './partials/marketplaceuser/marketplaceuser.component';
import { LeadSummaryComponent } from './partials/lead-summary/lead-summary.component';
import { AssignUsersAndRolesComponent } from './partials/assign-users-and-roles/assign-users-and-roles.component';
import { AddNewChannelPartnerComponent } from './partials/add-new-channel-partner/add-new-channel-partner.component';
import { ViewChannelPartnersListComponent } from './partials/view-channel-partners-list/view-channel-partners-list.component';
import { MyCustomersComponent } from './partials/my-customers/my-customers.component';
import { RoleAssigmentComponent } from './partials/role-assigment/role-assigment.component';

import { ChannelPartnerDetailsComponent } from './partials/view-channel-partners-list/partials/channel-partner-details/channel-partner-details.component';
import { ManageAllChannelsComponent } from './partials/manage-all-channels/manage-all-channels.component'
import { CustomerDetailsViewComponent } from './partials/my-customers/partials/customer-details-view/customer-details-view.component';
const routes: Routes = [{
  path: '',
  component: SuperAdminPageComponent,
  children: [
    // {
    //   canActivate: [],
    //   path: '',
    //   component : AccountListComponent
    // },
    
    {
      canActivate: [],
      path: 'accounts',
      component : AccountListComponent
    },
    {
      canActivate: [],
      path: 'marketplaceuser',
      component : MarketplaceuserComponent
    },
    {
      canActivate: [],
      path: 'lead-summary',
      component : LeadSummaryComponent
    },
    {
      canActivate: [],
      path: 'assign-roles',
      component : AssignUsersAndRolesComponent 
    },
    {
      canActivate: [],
      path: 'add-new-channel-partner',
      component : AddNewChannelPartnerComponent 
    },
    {
      canActivate: [],
      path: 'view-channel-partners-list',
      component : ViewChannelPartnersListComponent 
    },
    {
      canActivate: [],
      path: 'my-customers',
      component : MyCustomersComponent
    },
    {
      canActivate: [], 
      path: 'role-assignment',
      component : RoleAssigmentComponent
    },
    {
      canActivate: [], 
      path: 'manage-all-channel',
      component : ManageAllChannelsComponent
    },
    {
      canActivate: [],
      path: 'customer-view',
      component : CustomerDetailsViewComponent
    },

    
  ]
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SuperAdminPageRoutingModule { }

export const ROUTED_COMPONENTS = [ SuperAdminPageComponent ];
