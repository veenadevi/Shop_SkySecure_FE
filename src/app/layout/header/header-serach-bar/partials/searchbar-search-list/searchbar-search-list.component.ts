import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { ProductListService } from 'src/shared/services/product-list-page.service';
import { SearchResultStore } from 'src/shared/stores/search-results.store';

@Component({
  selector: 'searchbar-search-list',
  templateUrl: './searchbar-search-list.component.html',
  styleUrls: ['./searchbar-search-list.component.css']
})
export class SearchbarSearchListComponent {

  @Input('searchResults')
  public searchResults : any;
  @Input() inputText: string;
  @Input() hasPerformedSearch: boolean = false;
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
      // this.searchResultsProducts = data?.products || [];
      // this.searchResultsCategoryList = data?.categoryList || [];
      // this.searchResultsSubCategoryList = data?.subCategoryList || [];
      // this.searchResultsProductBundleList = data?.productBundles || [];
      let tempProducts  = this.setProductsData(data?.products || []);
      let tempProductsVarients  = this.setProductVariantsData(data?.productVariants || []);


      let tempProductBundleVariantsData = this.setProductBundleVariantsData(data?.productBundleVariants || []);
      let tempBundlesData = this.setBundlesData(data?.productBundles || []);

      //let tempSubCat2Products = data?.subCategory2List || [];


      //let tempSubCat2Products = this.setProductsData(data?.subCategory2List[0]?.products || []);

      let tempSubCat2Products = [];

      if(data && data.subCategory2List && data.subCategory2List.length>0){
        tempSubCat2Products = this.setProductsData(data.subCategory2List[0]?.products || []);
      }
     

      this.searchResultsProducts = [...tempProducts, ...tempSubCat2Products, ...tempProductsVarients];
      this.searchResultsCategoryList = data?.categoryList || [];
      this.searchResultsSubCategoryList = data?.subCategoryList || [];

      this.searchResultsSubCategoryList = this.searchResultsSubCategoryList.filter(c => c.products.length>0);


      this.searchResultsProductBundleList = [...tempProductBundleVariantsData , ...tempBundlesData];
      
      //this.searchResultsProductBundleList = data?.productBundles || [];
      console.log("Data",data,"searchResultsProducts",this.searchResultsProducts);
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

    console.log("+_+_+_+__ ()()( ", product.type);

    switch (product.productType) {
      case 'products':
        //this.router.navigate(['/products', product._id]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/products', product._id]));
        return;

      case 'productVariants':
        //this.router.navigate(['/products/product-variant-detail', product._id]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/products/product-variant-detail', product._id]));
        return;
        
      case 'productBundles':
        //this.router.navigate(['/products/product-bundle-detail', product._id]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/products/product-bundle-detail', product._id]));
        return;
      
      case 'productBundleVariants':
        //this.router.navigate(['/products/product-bundle-varaint-detail', product._id]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/products/product-bundle-varaint-detail', product._id]));
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

