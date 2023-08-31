import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagerComponent } from './account-manager.component';
import { AmAccountsListComponent } from './partials/am-accounts-list/am-accounts-list.component';


const routes: Routes = [{
  path: '',
  component: AccountManagerComponent,
  children: [
    {
      canActivate: [],
      path: 'accounts',
      component : AmAccountsListComponent
    }
    
    
  ]
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagerRoutingModule { }

export const ROUTED_COMPONENTS = [ AccountManagerComponent ];
