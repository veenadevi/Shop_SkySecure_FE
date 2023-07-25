/* Angular Imports */
import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { RouterModule }                   from '@angular/router';
import { MaterialModule } from '../material.module';
import { PrimeNgModule } from '../prime-ng.module';
import { SharedModule } from 'src/shared/shared.module';



/* Feature Imports */


/* Feature Imports */
import {
  InterfaceRoutingModule,
  ROUTED_COMPONENTS
}                                         from './interface-routing.module';

import { LayoutModule  } from '../layout/layout.module';

/**
 * All entry level dependencies must be declared at this level
 */

@NgModule({

  imports: [
    CommonModule,
    InterfaceRoutingModule,
    SharedModule,
    LayoutModule,
    MaterialModule,
    PrimeNgModule,
    
  ],

  declarations: [
    ROUTED_COMPONENTS,
  ],

  providers: [],

  entryComponents: [
    /* Entry Components */
  ],

  exports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    RouterModule,
    MaterialModule,
    PrimeNgModule,
    /*MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,*/
  ]

})

export class InterfaceModule { }