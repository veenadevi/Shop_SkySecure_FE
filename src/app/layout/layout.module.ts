/*
 * Angular Imports
 */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule }                         from '@angular/core';
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
import { HeaderSerachBarComponent } from './header/header-serach-bar/header-serach-bar.component';
import { SearchbarPopularCategoryComponent } from './header/header-serach-bar/partials/searchbar-popular-category/searchbar-popular-category.component';
import { SearchbarRecentlySearchedComponent } from './header/header-serach-bar/partials/searchbar-recently-searched/searchbar-recently-searched.component';
import { SearchbarSearchListComponent } from './header/header-serach-bar/partials/searchbar-search-list/searchbar-search-list.component';
import { SearchbarTrendingProductsComponent } from './header/header-serach-bar/partials/searchbar-trending-products/searchbar-trending-products.component';
import { ResponsiveToolbarComponent } from './responsive-toolbar/responsive-toolbar.component';
import { NotificationDropdownComponent } from './header/partials/notification-dropdown/notification-dropdown.component';


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
    HeaderSerachBarComponent,
    SearchbarPopularCategoryComponent,
    SearchbarRecentlySearchedComponent,
    SearchbarSearchListComponent,
    SearchbarTrendingProductsComponent,
    ResponsiveToolbarComponent,
    NotificationDropdownComponent,

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
    SidenavWrapperComponent,
    HeaderSerachBarComponent,
    ResponsiveToolbarComponent,
  ]

})

export class LayoutModule { }
