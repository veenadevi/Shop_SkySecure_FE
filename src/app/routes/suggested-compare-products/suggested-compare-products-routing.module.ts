import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestedCompareProductsComponent } from './suggested-compare-products.component';
import { SuggestedCompareProductsResultComponent } from './suggested-compare-products-result/suggested-compare-products-result.component';



const routes: Routes = [
  {
    path: '',
    component: SuggestedCompareProductsComponent,
    /*data: {
      title: 'Backlog'
    }*/
    children: [
      // {
      //   path: '',
      //   component: CompareProductsHomeComponent,
      // },
      {
        path: '',
        component: SuggestedCompareProductsResultComponent,
      },
      {
        path: 'results',
        component: SuggestedCompareProductsResultComponent,
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestedCompareProductsRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ SuggestedCompareProductsComponent ];
