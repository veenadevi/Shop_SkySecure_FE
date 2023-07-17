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
import { SidenavWrapperComponent } from './sidenav-wrapper/sidenav-wrapper/sidenav-wrapper.component';
import { SharedModule } from 'primeng/api';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    PrimeNgModule,
    
    

  ],

  declarations: [
    HeaderComponent,
    ToolbarComponent,
    FooterComponent,
    UserPanelComponent,
    SidenavWrapperComponent,
    
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
    SharedModule,

    HeaderComponent,
    ToolbarComponent,
    FooterComponent,
    UserPanelComponent,
    SidenavWrapperComponent
  ]

})

export class LayoutModule { }
