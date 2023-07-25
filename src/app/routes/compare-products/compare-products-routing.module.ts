import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareProductsComponent } from './compare-products.component';
import { CompareProductsResultComponent } from './compare-products-result/compare-products-result.component';
import { CompareProductsHomeComponent } from './compare-products-home/compare-products-home.component';

const routes: Routes = [
  {
    path: '',
    component: CompareProductsComponent,
    /*data: {
      title: 'Backlog'
    }*/
    children: [
      {
        path: '',
        component: CompareProductsHomeComponent,
      },
      {
        path: 'results',
        component: CompareProductsResultComponent,
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompareProductsRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ CompareProductsComponent ];
