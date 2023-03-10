import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from './cart-view.component';

const routes: Routes = [
  {
    path: '',
    component: CartViewComponent,
    /*data: {
      title: 'Backlog'
    }*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartViewRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ CartViewComponent ];
