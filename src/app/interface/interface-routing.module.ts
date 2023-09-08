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
      {
        canActivate: [],
        path: 'portal-admin-page',
        loadChildren: () => import('../routes/admin-page/admin-page.module').then(m=>m.AdminPageModule)
      },
      {
        canActivate: [],
        path: 'compare-products',
        loadChildren: () => import('../routes/compare-products/compare-products.module').then(m=>m.CompareProductsModule)
      },
      {
        canActivate: [],
        path: 'suggested-compare-products',
        loadChildren: () => import('../routes/suggested-compare-products/suggested-compare-products.module').then(m=>m.SuggestedCompareProductsModule)
      },
      {
        canActivate: [],
        path: 'company',
        loadChildren: () => import('../routes/company/company.module').then(m=>m.CompanyModule)
      },
      {
        canActivate: [],
        path: 'admin-pages',
        loadChildren: () => import('../routes/super-admin-page/super-admin-page.module').then(m=>m.SuperAdminPageModule)
      },
      {
        canActivate: [],
        path: 'account-manager',
        loadChildren: () => import('../routes/account-manager/account-manager.module').then(m=>m.AccountManagerModule)
      },
      {
        canActivate: [],
        path: 'review-page',
        loadChildren: () => import('../routes/review-page/review-page.module').then(m=>m.ReviewPageModule)
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
