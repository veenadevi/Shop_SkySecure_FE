/*
 * Angular Imports
 */
import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';
import { MaterialModule }                   from '../material.module';

/*
 * Package Imports
 */

import { HeaderComponent } from './header/header.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatToolbar } from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
    

  ],

  declarations: [
    HeaderComponent,
    ToolbarComponent,
    FooterComponent,
    
  ],

  providers: [

  ],

  entryComponents: [
  ],

  exports: [
    RouterModule,
    MaterialModule,


    HeaderComponent,
    ToolbarComponent,
    FooterComponent
  ]

})

export class LayoutModule { }
