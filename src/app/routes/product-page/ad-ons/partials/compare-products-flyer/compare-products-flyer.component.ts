import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';

@Component({
  selector: 'compare-products-flyer',
  templateUrl: './compare-products-flyer.component.html',
  styleUrls: ['./compare-products-flyer.component.css']
})
export class CompareProductsFlyerComponent implements OnInit{



  @Input() set compareProductsList (value: any[]){
    
  }

  public productList : any[] = [];

  public itemJson;

  public productList$ = this.compareProductsStore.compareProductsList$
  .pipe(
    map(data => {
      console.log("++++++++ List in Paetials ", data);
      if(data){
        this.productList = data;
        return data;
      }
      else{
        
        return data;
      }
    }
    )
  )

  constructor(
    private compareProductsStore : CompareProductsStore
  ){}

  public ngOnInit(): void {
    console.log("++++++++ List in Last Page ");
    this.setEmptyItem();
  }

  public setEmptyItem(): void{
    this.itemJson = {
      bannerLogo: null,
      bannerTextColor: null,
      bannerURL: null,
      imageURL: null,
      name: null,
      _id: 'none'
    }
  }
  

}
