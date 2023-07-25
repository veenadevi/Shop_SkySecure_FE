import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'searchbar-popular-category',
  templateUrl: './searchbar-popular-category.component.html',
  styleUrls: ['./searchbar-popular-category.component.css']
})
export class SearchbarPopularCategoryComponent {

  public subscriptions : Subscription[] = [];

  

  constructor( 
    private metadataStore : MetadataStore,
    private router : Router
  ){}

  public popularCategory$ = this.metadataStore.categoryDetails$
    .pipe(
      map(data => {
        if(data && data.length > 10){
          return data.splice(0,7);
        }
        else{
          return data;
        }
      }
      )
    )


  public ngOnInit(){
    
    // this.subscriptions.push(this.popularCategory$.subscribe(res => {
   
    // }));
  }

  public goToProductsPageWithCategorySelection(category) {
    this.router.navigate([`/products/category/${category._id}`]);
  }
}

