import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageRoutingModule } from './home-page-routing.module';
import { GlobalSearchComponent } from './global-search/global-search.component';


@NgModule({
  declarations: [
    GlobalSearchComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class HomePageModule { }
