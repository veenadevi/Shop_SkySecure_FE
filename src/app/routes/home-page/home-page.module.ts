import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomePageRoutingModule,  ROUTED_COMPONENTS} from './home-page-routing.module';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { ProductsByBrandComponent } from './products-by-brand/products-by-brand.component';





@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    GlobalSearchComponent,
    CarouselComponent,
    ProductsByCategoryComponent,
    ProductsByBrandComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    NgbModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    SharedModule
  ]
})
export class HomePageModule { 

 

  
}
