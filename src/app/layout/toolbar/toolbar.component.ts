import { Component } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { LoaderService } from 'src/shared/services/loader.service';
import { MetadataService } from 'src/shared/services/metadata.service';
import { LoadingType } from 'src/shared/constants/loading-type.enum';
import { CatrgoryResponse } from 'src/shared/models/interface/response/category-response';
import { CategoryDetails } from 'src/shared/models/interface/partials/category-details';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { Router , NavigationExtras} from '@angular/router';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { OEMDetails } from 'src/shared/models/interface/partials/oem-details';
import { OEMResponse } from 'src/shared/models/interface/response/oem-response';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { ProductListService } from 'src/shared/services/product-list-page.service';
import { MatMenu } from '@angular/material/menu';
import { CartService } from 'src/shared/services/cart.service';
import { HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(
    private metaDataSvc : MetadataService,
    private loaderService : LoaderService,
    private cartService : CartService,
    private metadataStore : MetadataStore,
    private userAccountStore : UserAccountStore,
    private router : Router,
    private productListService: ProductListService
  ){}

  private subscriptions: Subscription[] = [];

  public categories : CategoryDetails[] = [];

  public softwareCategories : CategoryDetails[] = [];

  public hardwareCategories : CategoryDetails[] = [];

  public oemList : OEMDetails[]=[];


  private getCategories(): CategoryDetails[]{
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchCategory().subscribe( response => {
        this.metadataStore.setCategoryDetails(response.categorys);
        this.categories = response.categorys;
        this.softwareCategories = response.categorys;
        this.hardwareCategories = null;
        // this.categories = response.categorys.splice(0,10);
        // this.softwareCategories = response.categorys.splice(0,10);
        // this.hardwareCategories = response.categorys.splice(0, 10, 15);
      })
      
    );
    return categoryResponse;
  }


  private getOEMs(): OEMDetails[]{
    let OEMResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchOEM().subscribe( response => {
        this.metadataStore.setOEMDetails(response.oems);
        this.oemList = response.oems.splice(0,10);
        
      })
      
    );
    return OEMResponse;
  }
  private getProducts(): ProductsDetails[]{
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchProducts().subscribe( response => {
        this.metadataStore.setProductsDetails(response.products);
      })
      
    );
    return categoryResponse;
  }

  private getTrendingProducts() : void {
    console.log("*****(((((( )))))) Called in ",);
    this.subscriptions.push(
      this.metaDataSvc.fetchTrendingProducts().subscribe( response => {
        console.log("***** Trending products ", response.products);
        this.metadataStore.setTrendingProducts(response.products);
        //this.metadataStore.setProductsDetails(response.products);
      })
      
    );
  }
  


  public ngOnInit() : void {

    this.getCategories();
    this.getProducts();
    this.getOEMs();
    this.getTrendingProducts();
    //this.getCartId();
  }


  public goToProductsPage() {
    this.router.navigate(['/products']);
  }

  public goToProductsPageWithCategorySelection(category) {
    this.productListService.setCategoryIdSelection(category._id);
    this.router.navigate([`/products/category/${category._id}`]);
  }

  public goToProductsPageWithSubCategorySelection(category) {
    this.productListService.setCategoryIdSelection(category._id);
    this.router.navigate([`/products/sub-category/${category._id}`]);
  }

  goToProductsPageByBrand(oem) {
    this.router.navigate([`/products/brand/${oem._id}`]);
  }

}