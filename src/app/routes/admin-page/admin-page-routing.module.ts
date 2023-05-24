import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { FeatureUpdateComponent } from './partials/feature-update/feature-update.component';
import { AdminDashboardComponent } from './partials/admin-dashboard/admin-dashboard.component';

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
