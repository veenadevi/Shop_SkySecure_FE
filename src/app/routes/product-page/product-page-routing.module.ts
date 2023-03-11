import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
//import { HomePgaeComponent } from './home-page.component';
import { ProductPgaeComponent } from './product-page.component';

const routes: Routes = [
  {
    path: 'category/:id',
    component: ProductPgaeComponent
  },
  {
    path: 'sub-category/:id',
    component: ProductPgaeComponent
  },
  {
    path: 'brand/:id',
    component: ProductPgaeComponent
  },
  { path: ':id', 
    component: ProductDetailComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPageRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ ProductPgaeComponent ];
