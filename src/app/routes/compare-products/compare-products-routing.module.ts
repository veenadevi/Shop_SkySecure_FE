import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareProductsComponent } from './compare-products.component';

const routes: Routes = [
  {
    path: '',
    component: CompareProductsComponent,
    /*data: {
      title: 'Backlog'
    }*/
    children: [
      // {
      //   path: '',
      //   redirectTo: 'summary'
      // },
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
