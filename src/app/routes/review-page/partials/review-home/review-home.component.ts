import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalSearchService } from 'src/shared/services/global-search.service';
import { SearchResultStore } from 'src/shared/stores/search-results.store';

@Component({
  selector: 'app-review-home',
  templateUrl: './review-home.component.html',
  styleUrls: ['./review-home.component.css']
})
export class ReviewHomeComponent {
  searchKey: string = "";
  productList : Array<any> = []
  constructor(
    private globalSearchSvc: GlobalSearchService,
    private router : Router
  ) { }


  onSearchInputChange(event: any) {
    this.searchKey = event.target.value;
    this.getSearchResults(this.searchKey);
  }

  public getSearchResults(searchKey: string) {
    this.globalSearchSvc.fetchSearchResults(searchKey).subscribe(res => {
      this.productList = res.products;
    });
  }

  public selectProduct(productId: string) {
     this.router.navigate([`/review-page/review-detail-page/${productId}`]);
  }

}
