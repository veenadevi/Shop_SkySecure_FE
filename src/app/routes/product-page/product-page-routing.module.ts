import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
//import { HomePgaeComponent } from './home-page.component';
import { ProductPgaeComponent } from './product-page.component';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';
import { ProductBundleDetailComponent } from './product-bundle-detail/product-bundle-detail.component';
import { ProductBundleVariantDetailComponent } from './product-bundle-variant-detail/product-bundle-variant-detail.component';

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
  },
  { path: 'product-bundle-detail/:id', 
    component: ProductBundleDetailComponent 
  },
  { path: 'product-bundle-varaint-detail/:id', 
    component: ProductBundleVariantDetailComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPageRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ ProductPgaeComponent ];
