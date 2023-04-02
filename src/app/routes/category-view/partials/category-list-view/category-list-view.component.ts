import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductListService } from 'src/shared/services/product-list-page.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'category-list-view',
  templateUrl: './category-list-view.component.html',
  styleUrls: ['./category-list-view.component.css']
})
export class CategoryListViewComponent implements OnInit{

  constructor(
    private metadataStore : MetadataStore,
    private productListService : ProductListService,
    private router : Router
  ){

  }

  public categories$ = this.metadataStore.categoryDetails$
  .pipe(
    map(data => {
      if(data){
        return data;
      }
      else{
        return data;
      }
    }
    )
  )

  ngOnInit(): void {
    
  }

  public goToProductsPageWithSubCategorySelection(category,subCategory) {
    this.productListService.setSubCategoryIdSelection(category._id, subCategory._id);
    this.router.navigate([`/products/sub-category/${category._id}-${subCategory._id}`], { state: { category , subCategory} });
  }

}
