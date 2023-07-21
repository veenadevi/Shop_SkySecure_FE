/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './components/card-item/card-item.component';
import { SearchComponent } from './components/search/search.component';
import { MaterialModule } from 'src/app/material.module';
import { PrimeNgModule } from 'src/app/prime-ng.module';
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
import { SelectOemModalComponent } from './components/modals/select-oem-modal/select-oem-modal.component';
import { BundleCardFlyerComponent } from './components/bundle-card-flyer/bundle-card-flyer.component';
import { RecommendationSelectModalComponent } from './components/modals/recommendation-select-modal/recommendation-select-modal.component';
import { ProductCardFlyerComponent } from './components/product-card-flyer/product-card-flyer/product-card-flyer.component';
import { SearchableFilterComponent } from './components/searchable-filter/searchable-filter.component';
import { CustomSearchComponent } from './components/searchable-filter/custom-search/custom-search.component';
import { SearchableSubCategoryFilterComponent } from './components/searchable-filter/searchable-sub-category-filter/searchable-sub-category-filter.component';
import { CompareProductItemFlyerComponent } from './components/compare-product-item-flyer/compare-product-item-flyer.component';
import { ContactUsFlyerComponent } from './components/contact-us-flyer/contact-us-flyer.component';
import { WriteReviewFlyerComponent } from './components/write-review-flyer/write-review-flyer.component';
import { GetFreeCallModalComponent } from './components/modals/get-free-call-modal/get-free-call-modal.component';
import { ContactUsFlyerHorizontalComponent } from './components/contact-us-flyer-horizontal/contact-us-flyer-horizontal.component';
import { SafeUrlPipe } from './pipes/safeUrlPipe';



@NgModule({

  imports: [
    CommonModule,
    MaterialModule,
    PrimeNgModule
    
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
    CompanyPromptModalComponent,
    SelectOemModalComponent,
    BundleCardFlyerComponent,
    RecommendationSelectModalComponent,
    ProductCardFlyerComponent,
    SearchableFilterComponent,
    CustomSearchComponent,
    SearchableSubCategoryFilterComponent,
    CompareProductItemFlyerComponent,
    ContactUsFlyerComponent,
    WriteReviewFlyerComponent,
    GetFreeCallModalComponent,
    ContactUsFlyerHorizontalComponent,
    SafeUrlPipe
  ],

  providers: [
    
  ],

  entryComponents: [
    
  ],

  exports: [
    CommonModule,
    MaterialModule,
    PrimeNgModule,
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
    CompanyPromptModalComponent,
    SelectOemModalComponent,
    BundleCardFlyerComponent,
    RecommendationSelectModalComponent,
    ProductCardFlyerComponent,
    SearchableFilterComponent,
    CustomSearchComponent,
    SearchableSubCategoryFilterComponent,
    CompareProductItemFlyerComponent,
    ContactUsFlyerComponent,
    WriteReviewFlyerComponent,
    GetFreeCallModalComponent,
    ContactUsFlyerHorizontalComponent,
    SafeUrlPipe
  ],
  

})

export class SharedModule { }
