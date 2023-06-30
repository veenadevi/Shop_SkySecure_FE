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
      name: 'sample',
      _id: null
    }
  }

  public removeSelectedItem($event){
    console.log("******** Item to be removed ", $event);
    this.productList = this.productList.filter(function(item) {
      return item._id != $event;
    });
    this.compareProductsStore.setCompareProductsList(this.productList);
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productList));
  }
  

}
