import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FinanceUserPageRoutingModule, ROUTED_COMPONENTS } from './finance-user-page-routing.module';
import { FinanceUserPageComponent } from './finance-user-page.component';
import { LeadsComponent } from './partials/leads/leads.component';






@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    FinanceUserPageComponent,
    LeadsComponent,
 
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    FinanceUserPageRoutingModule
  ],
  
  exports: [
    RouterModule,
    SharedModule,
  ]
})
export class FinanceUserPageModule { }
