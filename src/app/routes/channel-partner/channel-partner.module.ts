import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelPartnerComponent } from './channel-partner.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { LeadListComponent } from './partials/lead-list/lead-list.component';
import { LeadSummaryComponent } from './partials/lead-summary/lead-summary.component'; 
import { ChannelPartnerRoutingModule ,ROUTED_COMPONENTS} from './channel-partner-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductListTableComponent } from './partials/lead-summary/partials/product-list-table/product-list-table.component';
import { InviteChannelPartnerComponent } from './partials/invite-channel-partner/invite-channel-partner.component';



@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    ChannelPartnerComponent,
    LeadListComponent,
    LeadSummaryComponent,
    ProductListTableComponent,
    InviteChannelPartnerComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    ChannelPartnerRoutingModule
  ],
  
  exports: [
    RouterModule,
    SharedModule,
  ]
})
export class ChannelPartnerModule { }
