import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountManagerRoutingModule, ROUTED_COMPONENTS } from './account-manager-routing.module';
import { AccountManagerComponent } from './account-manager.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { AmAccountsListComponent } from './partials/am-accounts-list/am-accounts-list.component';


@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    AccountManagerComponent,
    AmAccountsListComponent
  ],
  imports: [
    CommonModule,
    AccountManagerRoutingModule
  ],
  exports: [
    RouterModule,
    SharedModule,
  ]
})
export class AccountManagerModule { }
