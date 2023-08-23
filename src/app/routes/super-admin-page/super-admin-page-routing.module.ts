import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminPageComponent } from './super-admin-page.component';
import { AccountListComponent } from './partials/account-list/account-list.component';

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
    }
    
    
  ]
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SuperAdminPageRoutingModule { }

export const ROUTED_COMPONENTS = [ SuperAdminPageComponent ];
