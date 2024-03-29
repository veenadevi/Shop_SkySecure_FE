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
import { ProductsByTrendingComponent } from './products-by-trending/products-by-trending.component';
import { MaterialModule } from 'src/app/material.module';
import { PrimeNgModule } from 'src/app/prime-ng.module';
import { VideoCarouselComponent } from './video-carousel/video-carousel.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GetFreeCallModalComponent } from 'src/shared/components/modals/get-free-call-modal/get-free-call-modal.component';

@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    GlobalSearchComponent,
    CarouselComponent,
    ProductsByCategoryComponent,
    ProductsByBrandComponent,
    ProductsByTrendingComponent,
    VideoCarouselComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    NgbModule,
    SharedModule,
    MaterialModule,
    PrimeNgModule
  ],
  exports: [
    RouterModule,
    SharedModule,
    MaterialModule,
    PrimeNgModule
  ]
})
export class HomePageModule { 
  constructor(
  
    private modalService : NgbModal,
 
  ){}
 
  public viewModal2(queryParams) {
    const modalRef = this.modalService.open(GetFreeCallModalComponent);
    modalRef.componentInstance.request = queryParams;
  }
  public showDialog(){
    const modalRef = this.modalService.open(GetFreeCallModalComponent);
  }

  showBasicDialog() {
    //this.displayBasic = true;
    this.viewModal2(null);
  }
 
  
}
