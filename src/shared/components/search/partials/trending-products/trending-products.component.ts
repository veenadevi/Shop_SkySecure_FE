import { Component } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.css']
})
export class TrendingProductsComponent {

  public subscriptions : Subscription[] = [];

  

  constructor( 
    private metadataStore : MetadataStore
  ){}

  public trendingProducts$ = this.metadataStore.productsDetails$
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
    //   console.log("RES ", res);
    // }));
  }

}
