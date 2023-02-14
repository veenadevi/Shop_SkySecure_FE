import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { SearchResultStore } from 'src/shared/stores/search-results.store';

@Component({
  selector: 'search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent {

  @Input('searchResults')
  public searchResults : ProductsDetails[];

  constructor(
    private searchResultStore : SearchResultStore,
    private router : Router
  ) {}

  public searchResults$ = this.searchResultStore.searchResults$
  .pipe(
    map(data => {
      return data;
    }
    )
  )

  public ngOnInit() : void{
    console.log("Search Results in last page ", this.searchResults);
  }

  public goToProductsPage(){
    this.router.navigate(['/products']);
  }

}
