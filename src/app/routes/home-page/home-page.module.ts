import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomePageRoutingModule,  ROUTED_COMPONENTS} from './home-page-routing.module';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';





@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    GlobalSearchComponent,
    CarouselComponent,
    ProductsByCategoryComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    NgbModule
  ],
  exports: [
    RouterModule
  ]
})
export class HomePageModule { 

 

  
}
