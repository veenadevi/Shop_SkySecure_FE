/*
 * Angular Imports
 */
import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';
import { MaterialModule }                   from '../material.module';
import { PrimeNgModule }                    from '../prime-ng.module';

/*
 * Package Imports
 */

import { HeaderComponent } from './header/header.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatToolbar } from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { UserPanelComponent } from './user-panel/user-panel.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PrimeNgModule
    

  ],

  declarations: [
    HeaderComponent,
    ToolbarComponent,
    FooterComponent,
    UserPanelComponent,
    
  ],

  providers: [

  ],

  entryComponents: [
  ],

  exports: [
    RouterModule,
    MaterialModule,
    PrimeNgModule,
    CommonModule,

    HeaderComponent,
    ToolbarComponent,
    FooterComponent,
    UserPanelComponent
  ]

})

export class LayoutModule { }
