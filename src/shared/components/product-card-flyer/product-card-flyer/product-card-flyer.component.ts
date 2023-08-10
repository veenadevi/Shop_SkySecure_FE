import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartStore } from 'src/shared/stores/cart.store';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';
import { LoginAlertModalComponent } from '../../login-alert-modal/login-alert-modal.component';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

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
    // console.log("))))))) Data in alst ", value);
 
  }

  @Input() type : any;

  public selectedListForCompare : any[] = [];

  public cachedDataForCheckBox : any = [];

  @Output() listForCompare = new EventEmitter();

  constructor(
    private router : Router,
    private compareProductsStore : CompareProductsStore,
    private authService : MsalService,
    private cartStore : CartStore,
    private modalService : NgbModal,
    private userAccountStore : UserAccountStore
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
        this.router.navigate(['/products/product-variant-detail', product._id]);
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
    
    let tempLen = this.getCompareProductsCount();
    var a = 3;

    if(a === 3){

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
  
          // localStorage.removeItem('product_list_to_compare');
          
          localStorage.setItem('product_list_to_compare', JSON.stringify(cacheData));
  
        }
  
        
  
      }
  
      this.cachedDataForCheckBox = cacheData;
  
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
      //localStorage.setItem('product_list_to_compare', JSON.stringify(cacheData));
      //this.compareProductsStore.setCompareProductsList(this.selectedListForCompare);
      
      this.listForCompare.emit(this.selectedListForCompare);

    }

    else{
      alert("Only 4 products are allowed to compare");
    }


    
  }

  public requestQuote(product){

    //let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    let queryParams;
      
    
    queryParams = {
          productName : product.name,
          productId : product._id,
          quantity : 1,
          price : product.priceList[0].price,
          erpPrice:product.priceList[0].ERPPrice,
          discountRate:product.priceList[0].discountRate,
          priceType:product.priceList[0].priceType,

        };
    /*if(loggedinData.length > 0 ){
      
      var existingItems = this.cartStore.getCartItems();

      this.router.navigate(['/cart'], {queryParams: queryParams});
    }

    else {
      this.viewModal(queryParams);
    }*/

    this.userAccountStore.userDetails$.subscribe(res=>{
      // console.log("()()()() ", res);
      if(res && res.email !== null){
        this.router.navigate(['/cart'], {queryParams: queryParams});
      }
      else{
        this.viewModal(queryParams);
      }
    })
  }

  public viewModal(queryParams) {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
    modalRef.componentInstance.request = queryParams;
  }

  public setCheckBoxes(){

  }


  public getCompareProductsCount(){
    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let combinedData = [...cacheData, ...cacheData2];
    let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];

    //console.log("++++++++++++++++++++++()()()()( ", uniqueElements.length);
    return uniqueElements.length;
    
  }


}
