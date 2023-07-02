import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';

@Component({
  selector: 'details-compare-products-flyer',
  templateUrl: './details-compare-products-flyer.component.html',
  styleUrls: ['./details-compare-products-flyer.component.css']
})
export class DetailsCompareProductsFlyerComponent {

  @Input() set compareProductsList (value: any[]){
    
  }

  public itemJson;

  public productList : any;

  public productList$ = this.compareProductsStore.compareProductsList$
  .pipe(
    map(data => {
      console.log("++++++++ List in Paetials ", data);
      if(data){
        this.productList = [...this.productList, ...data];
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
    this.setProductList();
    //this.setEmptyItem();
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

  public setProductList(){
    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    this.productList = cacheData;
    console.log("******** Item to be removed ", this.productList);
  }

  public removeSelectedItem($event){
    console.log("******** Item to be removed ", $event);
    this.productList = this.productList.filter(function(item) {
      return item._id != $event;
    });
    this.compareProductsStore.setCompareProductsList(this.productList);
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productList));
  }

  public navigateToCompareProducts(){
    //this.router.navigate(['/compare-products']);
  }
}
