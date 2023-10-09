import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelPartnerComponent } from './channel-partner.component';
import { LeadListComponent } from './partials/lead-list/lead-list.component';


import { LeadSummaryComponent } from './partials/lead-summary/lead-summary.component';
import { InviteChannelPartnerComponent } from './partials/invite-channel-partner/invite-channel-partner.component';
import { CpuserLeadListComponent } from './partials/cpuser-lead-list/cpuser-lead-list.component';

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
      path: 'lead-summary',
      component : LeadSummaryComponent
    },
    {
      canActivate: [],
      path:'invite-channel-partner',
      component:InviteChannelPartnerComponent
    },
    {
      canActivate: [],
      path:'leadsfromMyChannel',
      component:CpuserLeadListComponent
    }
  ]
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChannelPartnerRoutingModule { }

export const ROUTED_COMPONENTS = [ ChannelPartnerComponent ];
