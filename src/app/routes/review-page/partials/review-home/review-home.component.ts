import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalSearchService } from 'src/shared/services/global-search.service';
import { SearchResultStore } from 'src/shared/stores/search-results.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { map,Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
    private router : Router,
    private userAccountStore : UserAccountStore,
  ) { }


  onSearchInputChange(event: any) {
    this.searchKey = event.target.value;
    if(this.searchKey.length>4){
      this.getSearchResults(this.searchKey);
    }
   
  }

  // public getSearchResults(searchKey: string) {
  //   this.globalSearchSvc.fetchSearchResults(searchKey).subscribe(res => {
  //     this.productList = res.products;
  //     console.log("this.productList",this.productList);
  //     const productNames = this.productList.map(product => product.name); 
  //     // console.log("productNames",productNames);
  //     return this.userAccountStore.userDetails$;
  //   });
    
  // }




  public getSearchResults(searchKey: string) {
    this.globalSearchSvc.fetchSearchResults(searchKey).pipe(
      switchMap((res) => {
        this.productList = res.products;
        console.log("this.productList", this.productList);
        const productNames = this.productList.map((product) => product.name);

        // Call the userDetails method and switch to its observable
        return this.userAccountStore.userDetails$;
      })
    ).subscribe((userDetails) => {
      // Work with the user details here
      console.log("User Details:", userDetails);
    });
  }

   
  public selectProduct(productId: string, productName: string) {
    this.router.navigate([`/review-page/review-detail-page/${productId}`], {
      queryParams: { productName: productName }
    });
    // this.selectProductName(productName)
  }
  // public selectProductName( productName: string) {
  //   console.log("productNames",productName);
  // }
  
  
 
}
