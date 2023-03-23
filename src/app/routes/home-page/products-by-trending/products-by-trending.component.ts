import { Component } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'products-by-trending',
  templateUrl: './products-by-trending.component.html',
  styleUrls: ['./products-by-trending.component.css']
})
export class ProductsByTrendingComponent {

  private subscriptions : Subscription[] = [];
  public trendingProductsList : any[] = [];

  public staticProductimageUrl = 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg';

  constructor(
    private metadataStore : MetadataStore,
    
  ) {

  }

  public trendingProducts$ = this.metadataStore.trendingProducts$
  .pipe(
    map(data => {
      
      if(data){
        //this.loaderService.hide(LoadingType.Full)
        console.log("((((()))))))))))******* data.length", data);
        return data;
        //return data.splice(0,7);
      }
      else{
        //this.loaderService.hide(LoadingType.Full)
        console.log("((((()))))))))))******* data.length", data);
        return data;
      }
    }
    )
  )

  public ngOnInit() : void {
    this.setTrendingProductsGrid();
  }

  public setTrendingProductsGrid(){

    this.subscriptions.push(
      this.trendingProducts$.subscribe( response => {
        this.trendingProductsList = response;
      })
    )
    // this.subscriptions.push(
    //   this.metadataSvc.fetchCategoryMock().subscribe( response => {
    //     console.log("*** res ", response.category);
    //     this.mockCategories = response.category;
    //   })
      
    // );

  }

  public requestQuote(product) {

  }

}
