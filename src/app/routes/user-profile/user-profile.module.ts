import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuotationHistoryComponent } from './partials/quotation-history/quotation-history.component';
import { ROUTED_COMPONENTS, UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileViewComponent } from './partials/profile-view/profile-view.component';
import { QuotationSummaryComponent } from './partials/quotation-history/partials/quotation-summary/quotation-summary.component';
import { ProductListTableComponent } from './partials/quotation-history/partials/product-list-table/product-list-table.component';



@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    QuotationHistoryComponent,
    ProfileViewComponent,
    QuotationSummaryComponent,
    ProductListTableComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    UserProfileRoutingModule
  ],
  exports: [
    RouterModule,
    SharedModule,
    ProfileViewComponent
  ]
})
export class UserProfileModule { }
