import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';

@Component({
  selector: 'product-card-flyer',
  templateUrl: './product-card-flyer.component.html',
  styleUrls: ['./product-card-flyer.component.css']
})
export class ProductCardFlyerComponent implements OnInit{



  //@Input() products : Array<any> = [];

  public productsList : any[] = [];

  @Input() set products(value : any){
    this.productsList = value;
    console.log("))))))) Data in alst ", value);
 
  }

  @Input() type : any;

  public selectedListForCompare : any[] = [];

  @Output() listForCompare = new EventEmitter();

  constructor(
    private router : Router,
    private compareProductsStore : CompareProductsStore
  ){}


  ngOnInit(): void {
    
    
  }

  public navigateToProductDetails(product:any){
    
    /*if(this.routePath === 'productBundles'){
      this.router.navigate(['/products/brand-detail', product._id]);
    }
    else{
      this.router.navigate(['/products', product._id]);
    }*/

    
    switch (product.type) {
      case 'product':
        this.router.navigate(['/products', product._id]);
        return;

      case 'productVariants':
        this.router.navigate(['/products', product._id]);
        return;
        
      case 'productBundles':
        this.router.navigate(['/products/product-bundle-detail', product._id]);
        return;
      
      case 'productBundleVariants':
        this.router.navigate(['/products/product-bundle-varaint-detail', product._id]);
        return;

      default:
        return null;
    }
    
  }

  public onFilterChange($event, item){
    
    

    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');

    if(cacheData && cacheData.length>0){
      let indexToUpdate = cacheData.findIndex(element => element._id === item._id);
      if(indexToUpdate !== -1){
        
        if('checked' in cacheData){
          cacheData[indexToUpdate].checked = $event.target.checked;
        }
        else{
          cacheData[indexToUpdate]['checked'] = $event.target.checked;
        }

        localStorage.setItem('product_list_to_compare', JSON.stringify(cacheData));

      }

      

    }

    if($event.target.checked){
      this.selectedListForCompare.push(item);
      
      
    }
    else{
      /*let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
      if(cacheData && cacheData.length>0){
        //let indexToUpdate = cacheData.findIndex(element => element._id === item._id);
        var indexToUpdate = cacheData.findIndex(element=> element._id === item._id);
        
        
        if(indexToUpdate !== -1){
          
          
          cacheData = cacheData.splice(indexToUpdate, 1);
          
          
          localStorage.setItem('product_list_to_compare', JSON.stringify(cacheData));
          let ss = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
          
        }
      }*/
      this.selectedListForCompare = this.selectedListForCompare.filter(element => element._id != item._id);
    }
     
    

    /*let cacheData = this.compareProductsStore.getCompareProductsList();
    let cumulativeList = [];
    if(cacheData && cacheData.length>0){
      cumulativeList = [...this.selectedListForCompare , ...cacheData];
      cumulativeList = cumulativeList.filter(element => element._id != item._id);
    }
    else{
      cumulativeList = this.selectedListForCompare;
    }
    this.compareProductsStore.setCompareProductsList(cumulativeList);*/
    
    this.listForCompare.emit(this.selectedListForCompare);
    
  }


}
