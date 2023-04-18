import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
//import { HomePgaeComponent } from './home-page.component';
import { ProductPgaeComponent } from './product-page.component';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';

const routes: Routes = [
  {
    path: 'category/:categoryId',
    component: ProductPgaeComponent
  },
  {
    path: 'sub-category/:subcategoryId',
    component: ProductPgaeComponent
  },
  {
    path: 'brand/:brandId',
    component: ProductPgaeComponent
  },
  { path: ':id', 
    component: ProductDetailComponent 
  },
  {
    path:'brand-detail/:brandId',
    component: BrandDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPageRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ ProductPgaeComponent ];
