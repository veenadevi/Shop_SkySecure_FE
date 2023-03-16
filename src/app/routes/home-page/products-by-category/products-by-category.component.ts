import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';

import { MetadataService } from 'src/shared/services/metadata.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';

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
    private metadataStore : MetadataStore
    ) {
}

  public categories$ = this.metadataStore.categoryDetails$
  .pipe(
    map(data => {
      if(data && data.length >7){
        return data;
        //return data.splice(0,7);
      }
      else{
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
        this.categories = response.slice(0,6);
      })
    )
    // this.subscriptions.push(
    //   this.metadataSvc.fetchCategoryMock().subscribe( response => {
    //     console.log("*** res ", response.category);
    //     this.mockCategories = response.category;
    //   })
      
    // );

  }

}
