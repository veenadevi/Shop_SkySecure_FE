import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageRoutingModule,  ROUTED_COMPONENTS} from './home-page-routing.module';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { CarouselComponent } from './carousel/carousel.component';



@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    GlobalSearchComponent,
    CarouselComponent
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
