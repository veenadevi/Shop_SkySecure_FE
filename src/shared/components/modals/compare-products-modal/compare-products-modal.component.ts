import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';


@Component({
  selector: 'app-compare-products-modal',
  templateUrl: './compare-products-modal.component.html',
  styleUrls: ['./compare-products-modal.component.css']
})
export class CompareProductsModalComponent {

  @Input() set compareProductsList (value: any[]){
    
  }

  private subscriptions : Subscription[] = [];

  public itemJson;

  public productList : any;

  /*public productList$ = this.compareProductsStore.compareProductsList2$
  .pipe(
    map(data => {
      
      this.productList = [];
      if(data){
        this.productList = data;
        

        let cachedData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
        //let cachedData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
        let cachedData2 = [];
        let combinedData = [...this.productList, ...cachedData, ...cachedData2];
        let uniqueElements2 = [...new Map(combinedData.map(item => [item['_id'], item])).values()];
        this.productList = uniqueElements2;
        console.log("====total ite  in model==", this.productList)
        return data;
        
      }
      else{
        
        return data;
      }
      
    }
    )
  ) */

  public productList$ = this.compareProductsStore.compareProductsList$
  .pipe(
    map(data => {
      
      this.productList = [];

      if(data){
        this.productList = data;

        let cachedProductsToCompare = JSON.parse(localStorage.getItem('compare_products_list') || '[]');
        
        this.productList = cachedProductsToCompare;
        return data;
        
      }
      else{
        
        return data;
      }
      
    }
    )
  )

  constructor(
    private compareProductsStore : CompareProductsStore,
    private router:Router,
    public activeModal: NgbActiveModal,

  ){}

  public closeModal(){
    this.activeModal.close();
  }

  public ngOnInit(): void {
    
    this.subscriptions.push(
      this.productList$.subscribe(res=>{
        res;
  
      })
    )
    
    this.setEmptyItem();
    //this.setProductList();
   
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
    //let cachedData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let cachedData2 = [];
    let combinedData = [ ...cacheData, ...cachedData2];
    let uniqueElements2 = [...new Map(combinedData.map(item => [item['_id'], item])).values()];
    this.productList = uniqueElements2;
    // console.log("******** Item to be removed ", this.productList);
  }

 /* public removeSelectedItem($event){
    console.log("******** Item to be removed Before", $event);
    this.productList = this.productList.filter(function(item) {
      return item._id != $event;
    });

    localStorage.setItem('product_list_to_compare', JSON.stringify(this.productList));
    //localStorage.setItem('product_list_to_compare2', JSON.stringify(this.productList));
    this.compareProductsStore.setCompareProductsList(this.productList);
    this.compareProductsStore.setCompareProductsList2(this.productList);
    // localStorage.removeItem('product_list_to_compare');

    console.log("******** Item to be removed ", this.productList);
    this.compareProductsStore.setProductsCheckedList(this.productList);
    
  }*/

  public removeSelectedItem($event){
    
    this.productList = this.productList.filter(function(item) {
      return item._id != $event;
    }); 
    localStorage.setItem('compare_products_list', JSON.stringify(this.productList)); 
    this.compareProductsStore.setCompareProductsList(this.productList);

  
    
    this.compareProductsStore.setProductsCheckedList(this.productList);
    
  }

  public navigateToCompareProducts(){
    this.router.navigate(['/compare-products/results']);
    this.activeModal.close();
  }
}
