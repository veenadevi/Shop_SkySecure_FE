import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
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

  constructor(
    private searchResultStore : SearchResultStore,
    private router : Router,
    private productListService: ProductListService
  ) {}

  public searchResults$ = this.searchResultStore.searchResults$
  .pipe(
    map(data => {
      data = data?.categoryList ?  data?.categoryList : ( data?.subCategoryList ? data?.subCategoryList : data?.products )
      return data;
    }
    )
  )

  public ngOnInit() : void{
    console.log("Search Results in last page ", this.searchResults);
    this.searchResultsProducts = this.searchResults?.products || [];
    this.searchResultsCategoryList = this.searchResults?.categoryList || [];
    this.searchResultsSubCategoryList = this.searchResults?.subCategoryList || [];
    this.searchResultsProductBundleList = this.searchResults?.productBundles || [];
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

  public goToProductBundle() {
    
  }

}
