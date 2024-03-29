import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CategoryViewRoutingModule, ROUTED_COMPONENTS } from './category-view-routing.module';
import { CategoryListViewComponent } from './partials/category-list-view/category-list-view.component';






@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    CategoryListViewComponent,
    
  ],
  imports: [
    CommonModule,
    CategoryViewRoutingModule,
    NgbModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    SharedModule
  ]
})
export class CategoryViewModule { 
  
}
