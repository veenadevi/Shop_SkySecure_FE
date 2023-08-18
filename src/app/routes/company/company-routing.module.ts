/* Angular Imports */

import { NgModule }from '@angular/core';

import { Routes, RouterModule }from '@angular/router';
import { CompanyComponent } from './company.component';
import { RefundComponent } from './partials/refund/refund.component';
import { TermsComponent } from './partials/terms/terms.component';
import { PrivacyComponent } from './partials/privacy/privacy.component';

/* Feature Imports */

/**

* Define Interface Routing Instructions

*/

const INTERFACE_ROUTES: Routes = [

  {

    path: '',

    component:CompanyComponent,
    children: [
        {
          canActivate: [],
          path: 'refund',
          component : RefundComponent
        },
        {
            canActivate: [],
            path: 'terms',
            component : TermsComponent
          },
          {
            canActivate: [],
            path: 'privacy',
            component : PrivacyComponent
          },
    ]

  },

 

];

 

 

@NgModule({

 

  imports: [

    RouterModule.forChild(INTERFACE_ROUTES)

  ],

 

  exports: [

    RouterModule

  ],

  providers:[]

 

})

 

 

export class CompanyRoutingModule { }

 

/* Export Feature Components */

export const ROUTED_COMPONENTS = [

    CompanyComponent

];

 

