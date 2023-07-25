import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { FeatureUpdateComponent } from './partials/feature-update/feature-update.component';
import { AdminDashboardComponent } from './partials/admin-dashboard/admin-dashboard.component';
import { AllAccountsComponent } from './partials/all-accounts/all-accounts.component';
import { AccountDetailsComponent } from './partials/account-details/account-details.component';
import { DealsDetailsComponent } from './partials/deals-details/deals-details.component';
import { EstimateDetailsComponent } from './partials/estimate-details/estimate-details.component';
import { AddNewProductComponent } from './partials/add-new-product/add-new-product.component';
import { UploadProductPriceComponent } from './partials/upload-product-price/upload-product-price.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        canActivate: [],
        path: '',
        component : AdminDashboardComponent
      },
      {
        canActivate: [],
        path: 'dashboard',
        component : AdminDashboardComponent
      },
      {
        canActivate: [],
        path: 'accounts',
        component : AllAccountsComponent
      },
      {
        canActivate: [],
        path: 'accounts-details',
        component : AccountDetailsComponent
      },
      {
        canActivate: [],
        path: 'feature-update',
        component : FeatureUpdateComponent
      },
      {
        canActivate: [],
        path: 'deals-details',
        component : DealsDetailsComponent
      },
      {
        canActivate: [],
        path: 'estimate-details',
        component : EstimateDetailsComponent
      },
      {
        canActivate: [],
        path: 'add-new-product',
        component : AddNewProductComponent
      },
      {
        canActivate: [],
        path: 'upload-product-price',
        component : UploadProductPriceComponent
      }
      
      
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ AdminPageComponent ];
