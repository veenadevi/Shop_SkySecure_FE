import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationHistoryComponent } from './partials/quotation-history/quotation-history.component';
import { UserProfileComponent } from './user-profile.component';
import { ProfileViewComponent } from './partials/profile-view/profile-view.component';
import { QuotationSummaryComponent } from './partials/quotation-history/partials/quotation-summary/quotation-summary.component';

const routes: Routes = [
  {
    path: '',
    // component: UserProfileComponent,
    children: [
      {
        canActivate: [],
        path: 'quotation-history',
        component : QuotationHistoryComponent
      },
      {
        canActivate: [],
        path: 'profile-view',
        component : ProfileViewComponent
      },
      {
        canActivate: [],
        path: 'quotation-summary',
        component : QuotationSummaryComponent
      },
      
    ]
    /*data: {
      title: 'Backlog'
    }*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ UserProfileComponent ];
