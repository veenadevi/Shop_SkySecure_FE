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
import { CompareProductsModalComponent } from './components/modals/compare-products-modal/compare-products-modal.component';
import { CustomBreadCrumbComponent } from './components/custom-bread-crumb/custom-bread-crumb.component';
import { BundleVarientCardFlyerComponent } from './components/bundle-varient-card-flyer/bundle-varient-card-flyer.component';
import { AddCompareProductModalComponent } from './components/modals/add-compare-product-modal/add-compare-product-modal.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SearchForCompareProductComponent } from './components/modals/add-compare-product-modal/partials/search-for-compare-product/search-for-compare-product.component';
import { CompareProductsPopularCategoryComponent } from './components/modals/add-compare-product-modal/partials/search-for-compare-product/partiaals/compare-products-popular-category/compare-products-popular-category.component';
import { CompareProductsRecentlySearchedComponent } from './components/modals/add-compare-product-modal/partials/search-for-compare-product/partiaals/compare-products-recently-searched/compare-products-recently-searched.component';
import { CompareProductsTrendingProductsComponent } from './components/modals/add-compare-product-modal/partials/search-for-compare-product/partiaals/compare-products-trending-products/compare-products-trending-products.component';
import { CompareProductsSearchListComponent } from './components/modals/add-compare-product-modal/partials/search-for-compare-product/partiaals/compare-products-search-list/compare-products-search-list.component';
import { BundleMindmapComponent } from './components/bundle-mindmap/bundle-mindmap.component';
import { GstPromptModalComponent } from './components/modals/gst-prompt-modal/gst-prompt-modal.component';
import { AssignLeadsModalComponent } from './components/modals/assign-leads-modal/assign-leads-modal.component';
import { DateFormatPipe } from './pipes/dateFormat';
// import { TermsConditionModalComponent } from './models/terms-condition-modal/terms-condition-modal.component';
import { TermsConditionModalComponent } from './components/modals/terms-condition-modal/terms-condition-modal.component';
import { SuggestedCompareCardFlyerComponent } from './components/suggested-compare-card-flyer/suggested-compare-card-flyer.component';
import { AssignLeadsAmModalComponent } from './components/modals/assign-leads-am-modal/assign-leads-am-modal.component';
import { TimeFormatPipe } from './pipes/timeFormat';
import { GetReasonModalComponent } from './components/modals/get-reason-modal/get-reason-modal.component';
import { ReassignModalComponent } from './components/modals/reassign-modal/reassign-modal.component';
import { UploadpoModalComponent } from './components/modals/uploadpo-modal/uploadpo-modal.component';
import { InvoiceDueDateModalComponent } from './components/modals/invoice-due-date-modal/invoice-due-date-modal.component';
import { CustomerReviewComponent } from './components/customer-review/customer-review.component';
import { VideoReviewComponent } from './components/video-review/video-review.component';
import { ProductReviewAverageComponent } from './components/product-review-average/product-review-average.component';
import { CpReassignModalComponent } from './components/modals/cp-reassign-modal/cp-reassign-modal.component';



@NgModule({

  imports: [
    CommonModule,
    MaterialModule,
    PrimeNgModule,
    LayoutModule
    
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
    SafeUrlPipe,
    DateFormatPipe,
    TimeFormatPipe,
    CompareProductsModalComponent,
    CustomBreadCrumbComponent,
    BundleVarientCardFlyerComponent,
    AddCompareProductModalComponent,
    SearchForCompareProductComponent,
    CompareProductsPopularCategoryComponent,
    CompareProductsRecentlySearchedComponent,
    CompareProductsTrendingProductsComponent,
    CompareProductsSearchListComponent,
    BundleMindmapComponent,
    GstPromptModalComponent,
    AssignLeadsModalComponent,
    // TermsConditionModalComponent,
    SuggestedCompareCardFlyerComponent,
    AssignLeadsAmModalComponent,
    GetReasonModalComponent,
    ReassignModalComponent,
    UploadpoModalComponent,
    InvoiceDueDateModalComponent,
    CustomerReviewComponent,
    VideoReviewComponent,
    ProductReviewAverageComponent,
    CpReassignModalComponent
   
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
    SafeUrlPipe,
    DateFormatPipe,
    TimeFormatPipe,
    CompareProductsModalComponent,
    CustomBreadCrumbComponent,
    BundleVarientCardFlyerComponent,
    AddCompareProductModalComponent,
    SearchForCompareProductComponent,
    CompareProductsPopularCategoryComponent,
    CompareProductsRecentlySearchedComponent,
    CompareProductsTrendingProductsComponent,
    CompareProductsSearchListComponent,
    BundleMindmapComponent,
    GstPromptModalComponent,
    SuggestedCompareCardFlyerComponent,
    CustomerReviewComponent,
    VideoReviewComponent,
    ProductReviewAverageComponent,
  ],
  

})

export class SharedModule { }
