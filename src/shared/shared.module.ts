/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './components/card-item/card-item.component';
import { SearchComponent } from './components/search/search.component';
import { MaterialModule } from 'src/app/material.module';
import { PopularCategoryComponent } from './components/search/partials/popular-category/popular-category.component';
import { TrendingProductsComponent } from './components/search/partials/trending-products/trending-products.component';
import { RecentlySearchedComponent } from './components/search/partials/recently-searched/recently-searched.component';
import { SearchListComponent } from './components/search/partials/search-list/search-list.component';
import { ProductCardItemComponent } from './components/product-card-item/product-card-item.component';
import { CardFlyerComponent } from './components/card-flyer/card-flyer.component';
import { FeatureListTableComponent } from './components/feature-list-table/feature-list-table.component';
import { MultiSelectDropdownComponent } from './components/multi-select-dropdown/multi-select-dropdown.component';
import { ProductVariantModalComponent } from './components/product-variant-modal/product-variant-modal.component';
import { LoginAlertModalComponent } from './components/login-alert-modal/login-alert-modal.component';
import { CompanyPromptModalComponent } from './components/modals/company-prompt-modal/company-prompt-modal.component';


@NgModule({

  imports: [
    CommonModule,
    MaterialModule
    
  ],

  declarations: [
    CardItemComponent,
    SearchComponent,
    PopularCategoryComponent,
    TrendingProductsComponent,
    RecentlySearchedComponent,
    SearchListComponent,
    ProductCardItemComponent,
    CardFlyerComponent,
    FeatureListTableComponent,
    MultiSelectDropdownComponent,
    ProductVariantModalComponent,
    LoginAlertModalComponent,
    CompanyPromptModalComponent
  ],

  providers: [
    
  ],

  entryComponents: [
    
  ],

  exports: [
    CommonModule,
    MaterialModule,
    CardItemComponent,
    SearchComponent,
    PopularCategoryComponent,
    TrendingProductsComponent,
    RecentlySearchedComponent,
    ProductCardItemComponent,
    CardFlyerComponent,
    FeatureListTableComponent,
    MultiSelectDropdownComponent,
    ProductVariantModalComponent,
    LoginAlertModalComponent,
    CompanyPromptModalComponent
  ],
  

})

export class SharedModule { }
