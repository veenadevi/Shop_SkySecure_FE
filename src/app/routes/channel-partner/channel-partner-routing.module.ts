import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelPartnerComponent } from './channel-partner.component';
import { LeadListComponent } from './partials/lead-list/lead-list.component';

import { LeadSummaryComponent } from './partials/lead-summary/lead-summary.component';

const routes: Routes = [{
  path: '',
  component: ChannelPartnerComponent,
  children: [
    // {
    //   canActivate: [],
    //   path: '',
    //   component : AccountListComponent
    // },
    
    {
      canActivate: [],
      path: 'mychannelLeads',
      component : LeadListComponent
    },
   
    {
      canActivate: [],
      path: 'mychannel-lead-summary',
      component : LeadSummaryComponent
    }
    
  ]
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChannelPartnerRoutingModule { }

export const ROUTED_COMPONENTS = [ ChannelPartnerComponent ];
