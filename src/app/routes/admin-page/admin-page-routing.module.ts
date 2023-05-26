import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { FeatureUpdateComponent } from './partials/feature-update/feature-update.component';
import { AdminDashboardComponent } from './partials/admin-dashboard/admin-dashboard.component';
import { AllAccountsComponent } from './partials/all-accounts/all-accounts.component';
import { AccountDetailsComponent } from './partials/account-details/account-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        canActivate: [],
        path: '',
        component : AdminDashboardComponent
      },
      {
        canActivate: [],
        path: 'dashboard',
        component : AdminDashboardComponent
      },
      {
        canActivate: [],
        path: 'accounts',
        component : AllAccountsComponent
      },
      {
        canActivate: [],
        path: 'accounts-details',
        component : AccountDetailsComponent
      },
      {
        canActivate: [],
        path: 'feature-update',
        component : FeatureUpdateComponent
      },
      
      
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ AdminPageComponent ];
