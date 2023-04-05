import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { map, Subscription } from 'rxjs';
import { LoaderService } from 'src/shared/services/loader.service';

import { MetadataService } from 'src/shared/services/metadata.service';
import { ProductListService } from 'src/shared/services/product-list-page.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';

import { LoadingType } from '../../../../shared//constants/loading-type.enum'; 

@Component({
  selector: 'products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent {

  private subscriptions : Subscription[] = [];


  /** Mock Data Var */
  public mockCategories : any[] = [];

  public categories : any[] = [];


  /** Constructor */
  constructor(
    private router: Router,
    private metadataSvc : MetadataService,
    private metadataStore : MetadataStore,
    private productListService : ProductListService,
    private loaderService : LoaderService,
    private spinner : NgxSpinnerService
    ) {
}

  public categories$ = this.metadataStore.categoryDetails$
  .pipe(
    map(data => {
      this.loaderService.show(LoadingType.Full);
      if(data && data.length >7){
        //this.loaderService.hide(LoadingType.Full)
        return data;
        //return data.splice(0,7);
      }
      else{
        //this.loaderService.hide(LoadingType.Full)
        return data;
      }
    }
    )
  )


  public goToProductsPage(){
    this.router.navigate(['/products']);
  }

  public ngOnInit() : void {
    this.setCategoriesGrid();
  }

  public setCategoriesGrid(){

    this.subscriptions.push(
      this.categories$.subscribe( response => {
        this.categories = response.slice(0,7);
      })
    )
    

  }

  public goToProductsPageWithCategorySelection(category) {
    this.productListService.setCategoryIdSelection(category._id);
    this.router.navigate([`/products/category/${category._id}`]);
  }

}
