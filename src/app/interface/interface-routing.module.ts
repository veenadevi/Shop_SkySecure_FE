/* Angular Imports */
import { NgModule }                    from '@angular/core';
import {
  Routes,
  RouterModule }                       from '@angular/router';
/* Feature Imports */
import { InterfaceComponent }          from './interface.component';


/**
 * Define Interface Routing Instructions
 */
const INTERFACE_ROUTES: Routes = [

  {
    path: '',
    component: InterfaceComponent,
    children: [
      {
        canActivate: [],
        path: '',
        loadChildren: () => import('../routes/home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        canActivate: [],
        path: 'products',
        loadChildren: () => import('../routes/product-page/product-page.module').then(m=>m.ProductPageModule)
      },
      {
        canActivate: [],
        path: 'cart',
        loadChildren: () => import('../routes/cart-view/cart-view.module').then(m=>m.CartViewModule)
      }
    ]
  }

];


@NgModule({

  imports: [
    RouterModule.forChild(INTERFACE_ROUTES)
  ],

  exports: [
    RouterModule
  ]

})


export class InterfaceRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [
  InterfaceComponent
];
