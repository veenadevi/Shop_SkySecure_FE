import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { CartService } from 'src/shared/services/cart.service';
import { HttpResponseBase } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private productListService: ProductListService,
    private spinnerService : NgxSpinnerService
  ){}

  private subscriptions: Subscription[] = [];

  public categories : CategoryDetails[] = [];

  public softwareCategories : CategoryDetails[] = [];

  public hardwareCategories : CategoryDetails[] = [];

  public oemList : OEMDetails[]=[];

  public compareProducts : any[] = [];

  public offers : any[] = [];

  //public menuToogleVal : boolean = false;

  @ViewChild('matMenuTrigger') matMenuTrigger: MatMenuTrigger;
  
  @ViewChild('categoriesMenu') categoriesMenu : MatMenuTrigger;

  @Output() menuToogleEvent = new EventEmitter();
  
  public userLoggedIn : boolean = false;

  public userDetails$ = this.userAccountStore.userDetails$
  .pipe(
    map(data => {
      if(data){
        
        this.userLoggedIn = true;
        return data;
      }
      else{
        
        this.userLoggedIn = false;
        return data;
      }
    }
    )
  )


  private getCategories(): CategoryDetails[]{
    this.spinnerService.show();
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
    this.spinnerService.hide();
    return categoryResponse;
  }


  private getOEMs(): OEMDetails[]{
    this.spinnerService.show();
    let OEMResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchOEM().subscribe( response => {
        this.metadataStore.setOEMDetails(response.oems);
        this.oemList = response.oems;
        this.spinnerService.hide();
      })
      
    );
    return OEMResponse;
  }
  private getProducts(): ProductsDetails[]{
    this.spinnerService.show();
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchProducts().subscribe( response => {
        this.metadataStore.setProductsDetails(response.products);
      })
      
    );
    this.spinnerService.hide();
    return categoryResponse;
  }

  private getTrendingProducts() : void {
    this.spinnerService.show();
    this.subscriptions.push(
      this.metaDataSvc.fetchTrendingProducts().subscribe( response => {
        this.metadataStore.setTrendingProducts(response.products);
        this.spinnerService.hide();
        //this.metadataStore.setProductsDetails(response.products);
      })
      
    );
  }

  openMenuList(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
} 
  
closeMenuList(menuTrigger: MatMenuTrigger) {
  menuTrigger.closeMenu();

}


  public ngOnInit() : void {

    
      
    
    this.getCategories();
    this.getProducts();
    this.getOEMs();
    this.getTrendingProducts();
    this.userDetails$.subscribe();
    //this.getCartId();
  }


  public goToProductsPage() {
    this.router.navigate(['/products']);
  }

  public goToProductsPageWithCategorySelection(category) {
    this.matMenuTrigger.closeMenu();
    this.categoriesMenu.closeMenu();
    this.productListService.setCategoryIdSelection(category._id);
    this.router.navigate([`/products/category/${category._id}`]);
  }

  public goToProductsPageWithSubCategorySelection(category,subCategory) {
    this.productListService.setSubCategoryIdSelection(category._id, subCategory._id);
    this.router.navigate([`/products/sub-category/${category._id}-${subCategory._id}`], { state: { category , subCategory} });
  }

  goToProductsPageByBrand(oem) {
    this.productListService.setBrandIdSelection(oem._id);
    this.router.navigate([`/products/brand/${oem._id}`]);
  }
  

  public openMenu(menuTrigger: MatMenuTrigger){
    menuTrigger.openMenu();
  }

  public closeMenu(menuTrigger: MatMenuTrigger){
    menuTrigger.closeMenu();
  }

  public menuToogled(){
    this.menuToogleEvent.emit('clicked');
  }

  

}