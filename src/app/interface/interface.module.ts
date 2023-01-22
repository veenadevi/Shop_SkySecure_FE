/* Angular Imports */
import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { RouterModule }                   from '@angular/router';
import { MaterialModule } from '../material.module';


/** Angular Material Imports */
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    LayoutModule,
    MaterialModule
  ],

  declarations: [
    ROUTED_COMPONENTS,
  ],

  providers: [],

  entryComponents: [
    /* Entry Components */
  ],

  exports: [
    RouterModule,
    MaterialModule
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