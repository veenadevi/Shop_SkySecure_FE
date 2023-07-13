import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
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
  private subscriptions : Subscription[] = [];

  public itemJson;

  public productList$ = this.compareProductsStore.compareProductsList$
  .pipe(
    map(data => {
      console.log("++++++++ List in Paetials ", data);
      if(data){
        this.productList = data;
        let uniqueElements = [...new Map(this.productList.map(item => [item['_id'], item])).values()];
        //this.productList = [...this.productList, ...data];
        this.productList = uniqueElements;
        return data;
      }
      else{
        
        return data;
      }
      /*let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
      console.log("++++++++ List in Paetials Cache Data", cacheData);

      this.productList = [...this.productList, ...cacheData];
      console.log("++++++++ List in Paetials Peoduct Data", this.productList);
      
      let uniqueElements = [...new Map(this.productList.map(item => [item['_id'], item])).values()];
      this.productList = uniqueElements;
      return data;*/
    }
    )
  )

  constructor(
    private compareProductsStore : CompareProductsStore,
    private router : Router
  ){}

  public ngOnInit(): void {
    console.log("++++++++ List in Last Page ");
    console.log("++++++++++++++  Item in On Init ", JSON.parse(localStorage.getItem('product_list_to_compare')));
    this.subscriptions.push(

      this.productList$.subscribe(res=>{

        res;

      })

    )
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
    console.log("******** Item to be removed ", this.productList);
    this.compareProductsStore.setCompareProductsList(this.productList);
    localStorage.removeItem('product_list_to_compare');
    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productList));
    console.log("******** Item after removed ", JSON.parse(localStorage.getItem('product_list_to_compare')));
  }

  public navigateToCompareProducts(){
    this.router.navigate(['/compare-products']);
  }
  

}
