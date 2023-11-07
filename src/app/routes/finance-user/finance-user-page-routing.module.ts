import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FinanceUserPageComponent } from './finance-user-page.component';
import { LeadsComponent } from './partials/leads/leads.component';

const routes: Routes = [{
  path: '',
  component: FinanceUserPageComponent,
  children: [
 
    
    {
      canActivate: [],
      path: 'leads',
      component : LeadsComponent
    },
   

    
  ]
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FinanceUserPageRoutingModule { }

export const ROUTED_COMPONENTS = [ FinanceUserPageComponent ];
