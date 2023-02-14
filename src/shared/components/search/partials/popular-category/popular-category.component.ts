import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, filter, Subscription } from 'rxjs';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'popular-category',
  templateUrl: './popular-category.component.html',
  styleUrls: ['./popular-category.component.css']
})
export class PopularCategoryComponent {

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
    //   console.log("RES ", res);
    // }));
  }

  public goToProductsPage(){
    this.router.navigate(['/products']);
  }

}
