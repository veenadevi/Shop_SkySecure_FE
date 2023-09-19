import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';

@Component({
  selector: 'details-compare-products-flyer',
  templateUrl: './details-compare-products-flyer.component.html',
  styleUrls: ['./details-compare-products-flyer.component.css']
})
export class DetailsCompareProductsFlyerComponent {

  public productSuggestionList:any[]=[];

  @Input() set compareProductsList (value: any[]){

    this.productSuggestionList=value;
    
  }

  private subscriptions : Subscription[] = [];

  public itemJson;

  public productList : any;

  public productList$ = this.compareProductsStore.compareProductsList2$
  .pipe(
    map(data => {
      
      this.productList = [];
      if(data){
        this.productList = data;
        /*this.productList = [...this.productList, ...data];
        let uniqueElements = [...new Map(this.productList.map(item => [item['_id'], item])).values()];
        this.productList = uniqueElements;*/

        let cachedData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
        //let cachedData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
        let cachedData2 = [];
        let combinedData = [...this.productList, ...cachedData, ...cachedData2];
        let uniqueElements2 = [...new Map(combinedData.map(item => [item['_id'], item])).values()];
        this.productList = uniqueElements2;
        return data;
        
      }
      else{
        
        return data;
      }
      /*let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
      this.productList = [...this.productList, ...cacheData];
      console.log("++++++++ List in Paetials ", this.productList);
      let uniqueElements = [...new Map(this.productList.map(item => [item['_id'], item])).values()];
      this.productList = uniqueElements;
      return data;*/
    }
    )
  )

  constructor(
    private compareProductsStore : CompareProductsStore,
    private router:Router
  ){}

  public ngOnInit(): void {
    
    this.subscriptions.push(
      this.productList$.subscribe(res=>{
        res;
      })
    )

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

    console.log("setting suggestion product ===",this.productSuggestionList)
    // let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    // //let cachedData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    // let cachedData2 = [];
    // let combinedData = [ ...cacheData, ...cachedData2];
    // let uniqueElements2 = [...new Map(combinedData.map(item => [item['_id'], item])).values()];
    this.productList = this.productSuggestionList;

  }

  public removeSelectedItem($event){
    
    this.productList = this.productList.filter(function(item) {
      return item._id != $event;
    });

    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productList));
    //localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productList));
    this.compareProductsStore.setCompareProductsList2(this.productList);
    
    
  }

  public navigateToCompareProducts(){
    //this.router.navigate(['/compare-products/results']);
    //this.router.navigate(['/suggested-compare-products']);
    
    var productsIds = this.productList.map((data)=> data._id);

    let dataId = productsIds;
    console.log("passing comapre product ",dataId)

    this.router.navigate(['/suggested-compare-products/results'], { state: { dataIds: dataId } });

    
    
  }
}
