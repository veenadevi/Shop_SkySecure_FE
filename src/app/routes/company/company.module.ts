import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ROUTED_COMPONENTS, CompanyRoutingModule } from './company-routing.module';
import { RefundComponent } from './partials/refund/refund.component';
import { TermsComponent } from './partials/terms/terms.component';
import { PrivacyComponent } from './partials/privacy/privacy.component';




@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    RefundComponent,
    TermsComponent,
    PrivacyComponent,
  
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    CompanyRoutingModule
  ],
  exports: [
    RouterModule,
    SharedModule,
    RefundComponent,
    TermsComponent,
    PrivacyComponent,
  
  ]
})
export class CompanyModule { }
