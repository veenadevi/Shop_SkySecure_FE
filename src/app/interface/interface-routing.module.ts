/* Angular Imports */
import { NgModule }                    from '@angular/core';
import {
  Routes,
  RouterModule }                       from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
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
      },
      {
        canActivate: [],
        path: 'user-profile',
        loadChildren: () => import('../routes/user-profile/user-profile.module').then(m=>m.UserProfileModule)
      },
      {
        canActivate: [],
        path: 'security-view',
        loadChildren: () => import('../routes/security-view/security-view.module').then(m=>m.SecurityViewModule)
      },
      {
        canActivate: [],
        path: 'category-view',
        loadChildren: () => import('../routes/category-view/category-view.module').then(m=>m.CategoryViewModule)
      },
      {
        canActivate: [],
        path: 'licence-catalogue',
        loadChildren: () => import('../routes/licence-catalogue/licence-catalogue.module').then(m=>m.LicenceCatalogueModule)
      },
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
