import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { ProductListService } from 'src/shared/services/product-list-page.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { SearchResultStore } from 'src/shared/stores/search-results.store';

@Component({
  selector: 'search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent {

  @Input('searchResults')
  public searchResults : any;

  searchResultsProducts : ProductsDetails[] = [];
  searchResultsCategoryList : any[] = [];
  searchResultsSubCategoryList : any[] = [];
  searchResultsProductBundleList : any[] = [];

  private subscriptions : Subscription[] = [];

  constructor(
    private searchResultStore : SearchResultStore,
    private router : Router,
    private productListService: ProductListService
  ) {}

  public searchResults$ = this.searchResultStore.searchResults$
  .pipe(
    map(data => {

      let tempProducts  = this.setProductsData(data?.products || []);
      let tempProductsVarients  = this.setProductVariantsData(data?.productVariants || []);

      let tempProductBundleVariantsData = this.setProductBundleVariantsData(data?.productBundleVariants || []);
      let tempBundlesData = this.setBundlesData(data?.productBundles || []);

      this.searchResultsProducts = [...tempProducts , ...tempProductsVarients];
      //this.searchResultsProducts = data?.products || [];
      this.searchResultsCategoryList = data?.categoryList || [];
      this.searchResultsSubCategoryList = data?.subCategoryList || [];

      this.searchResultsSubCategoryList = this.searchResultsSubCategoryList.filter(c => c.products.length>0);

      this.searchResultsProductBundleList = [...tempProductBundleVariantsData , ...tempBundlesData];
      //this.searchResultsProductBundleList = data?.productBundles || [];

      return data;
    }
    )
  )

  public ngOnInit() : void{

    this.subscriptions.push(this.searchResults$.subscribe());
    // console.log("Search Results in last page ", this.searchResults);
    // this.searchResultsProducts = this.searchResults?.products || [];
    // this.searchResultsCategoryList = this.searchResults?.categoryList || [];
    // this.searchResultsSubCategoryList = this.searchResults?.subCategoryList || [];
    // this.searchResultsProductBundleList = this.searchResults?.productBundles || [];
  }

  public goToProductsPage(item){
    this.router.navigate([`/products/${item._id}`]);
  }

  public goToProductsPageWithCategorySelection(category) {
    this.productListService.setCategoryIdSelection(category._id);
    this.router.navigate([`/products/category/${category._id}`]);
  }

  public goToProductsPageWithSubCategorySelection(category,subCategory) {
    this.productListService.setSubCategoryIdSelection(category.categoryId, subCategory._id);
    this.router.navigate([`/products/sub-category/${category._id}-${subCategory._id}`], { state: { category , subCategory} });
  }

  public goToProductBundle(item) {
    //this.router.navigate([`/products/category/${category._id}`]);
    this.router.navigate(['/products/brand-detail', item._id]);
  }


  public navigateToProductDetails(product:any){
       

    switch (product.productType) {
      case 'products':
        this.router.navigate(['/products', product._id]);
        return;

      case 'productVariants':
        this.router.navigate(['/products/product-variant-detail', product._id]);
        return;
        
      case 'productBundles':
        this.router.navigate(['/products/product-bundle-detail', product._id]);
        return;
      
      case 'productBundleVariants':
        this.router.navigate(['/products/product-bundle-varaint-detail', product._id]);
        return;

      default:
        return null;
    }
    
  } 


  /**
   * Set Products Data
   */

  public setProductsData(data){

    if(data && data.length>0){
      data.forEach(element => {
          element.productType = 'products';
          element.bannerLogo = (element.bannerLogo && element.bannerLogo !== null) ? element.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['navigationId'] = element._id;
      });
    }

    return data;
  }

  /**
   * Set Product Variants Data
   */

  public setProductVariantsData(data){

    if(data && data.length>0){
      data.forEach(element => {
          element.productType = 'productVariants';
          element.bannerLogo = (element.product && element.product.bannerLogo) ? element.product.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.product && element.product.subCategories && element.product.subCategories.length > 0) ? element.product.subCategories[0].name : "";
          element['navigationId'] = element.productId;
      });
    }

    return data;
  }

  /**
   * Set Product Bundle Variants Data
   */

  public setProductBundleVariantsData(data){

    if(data && data.length>0){
      data.forEach(element => {
          element.productType = 'productBundleVariants';
          element.bannerLogo = (element.bannerLogo && element.bannerLogo !== null) ? element.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['navigationId'] = element.productsFamilyId;
      });
    }

    return data;
  }

  /**
   * Set Product Bundles Data
   */

  public setBundlesData(data){

    if(data && data.length>0){
      data.forEach(element => {
          element.productType = 'productBundles';
          element.bannerLogo = (element.bannerLogo && element.bannerLogo !== null) ? element.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['navigationId'] = element._id;
      });
    }

    return data;
  }

}
