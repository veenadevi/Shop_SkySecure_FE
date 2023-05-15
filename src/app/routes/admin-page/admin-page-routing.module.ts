import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { FeatureUpdateComponent } from './partials/feature-update/feature-update.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
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
