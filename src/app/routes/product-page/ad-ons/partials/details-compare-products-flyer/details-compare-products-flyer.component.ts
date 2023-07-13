import { Component, Input } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';

@Component({
  selector: 'details-compare-products-flyer',
  templateUrl: './details-compare-products-flyer.component.html',
  styleUrls: ['./details-compare-products-flyer.component.css']
})
export class DetailsCompareProductsFlyerComponent {

  @Input() set compareProductsList (value: any[]){
    
  }

  private subscriptions : Subscription[] = [];

  public itemJson;

  public productList : any;

  public productList$ = this.compareProductsStore.compareProductsList$
  .pipe(
    map(data => {
      
      this.productList = [];
      if(data){
        this.productList = [...this.productList, ...data];

        //return data;
      }
      else{
        
        //return data;
      }
      let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
      this.productList = [...this.productList, ...cacheData];
      console.log("++++++++ List in Paetials ", this.productList);
      let uniqueElements = [...new Map(this.productList.map(item => [item['_id'], item])).values()];
      this.productList = uniqueElements;
      return data;
    }
    )
  )

  constructor(
    private compareProductsStore : CompareProductsStore
  ){}

  public ngOnInit(): void {
    
    this.subscriptions.push(
      this.productList$.subscribe(res=>{
        res;
      })
    )
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
