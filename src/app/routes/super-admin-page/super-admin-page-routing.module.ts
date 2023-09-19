import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminPageComponent } from './super-admin-page.component';
import { AccountListComponent } from './partials/account-list/account-list.component';
import { MarketplaceuserComponent } from './partials/marketplaceuser/marketplaceuser.component';
import { LeadSummaryComponent } from './partials/lead-summary/lead-summary.component';
import { AssignUsersAndRolesComponent } from './partials/assign-users-and-roles/assign-users-and-roles.component';


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
    }
    
  ]
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SuperAdminPageRoutingModule { }

export const ROUTED_COMPONENTS = [ SuperAdminPageComponent ];
