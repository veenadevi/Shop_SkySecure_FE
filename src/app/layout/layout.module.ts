/*
 * Angular Imports
 */
import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';
/*
 * Package Imports
 */

import { HeaderComponent } from './header/header.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
  ],

  declarations: [
    HeaderComponent,
    
  ],

  providers: [

  ],

  entryComponents: [
  ],

  exports: [
    RouterModule,
    HeaderComponent
  ]

})

export class LayoutModule { }
