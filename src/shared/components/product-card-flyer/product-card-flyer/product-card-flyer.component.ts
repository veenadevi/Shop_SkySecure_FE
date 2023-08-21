import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartStore } from 'src/shared/stores/cart.store';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';
import { LoginAlertModalComponent } from '../../login-alert-modal/login-alert-modal.component';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';

@Component({
  selector: 'product-card-flyer',
  templateUrl: './product-card-flyer.component.html',
  styleUrls: ['./product-card-flyer.component.css']
})
export class ProductCardFlyerComponent implements OnInit{

 



  discountRate: number =120; 
  monthlyPrice: number = this.discountRate / 12;
  isMonthly: boolean = false;
  priceValue:any;
  priceType:any;

  showMonthlyPrice(i:any) {
    // this.isMonthly = true;
    this.priceValue = this.productsList[i].priceList[0].price;
    this.priceType = this.productsList[i].priceList[0].priceType;
    this.productsList[i].priceList[0].priceType = "Month";
    this.productsList[i].priceList[0].price = this.productsList[i].priceList[0].price/12
  }

  showDiscountRate(i: any) {
    // this.isMonthly = false;
    this.productsList[i].priceList[0].priceType=this.priceType;

    this.productsList[i].priceList[0].price = this.priceValue;
  }
  // originalAmount: number = 100;
  // modifiedAmountValue: number = 150;
  // isHovered: boolean = false;



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
    private userAccountStore : UserAccountStore,
    private toaster : ToasterNotificationService
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
    //let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');


    let cacheData1 = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let combinedData = [...cacheData1, ...cacheData2];
    let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];


    let cacheData =uniqueElements;

    if(tempLen<4){
      console.log("legth is less than 4")

    


      if(cacheData && cacheData.length>0){
        console.log("cacheData legth "+cacheData.length)
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
      console.log("cacheData legth  is o fresh data "+cacheData.length)
  
      this.cachedDataForCheckBox = cacheData;
  
      if($event.target.checked){
        this.selectedListForCompare.push(item);
        this.toaster.showSuccess("The product has been included for comparison.",'')
      }
      else{
        this.toaster.showWarning("The product has been excluded from the comparison",'')
        
        console.log("***(()()( ", this.cachedDataForCheckBox);
        this.selectedListForCompare = this.cachedDataForCheckBox.filter(element => element._id != item._id);
        localStorage.setItem('product_list_to_compare', JSON.stringify(this.selectedListForCompare));
        localStorage.setItem('product_list_to_compare2', JSON.stringify(this.selectedListForCompare));
        console.log("***(()()( ", this.selectedListForCompare);
      }
       
      
  
    
      
      this.listForCompare.emit(this.selectedListForCompare);

    }

    else{
   

      if($event.target.checked){
        item.checked = false;
        this.toaster.showWarning("You can add only 4 products to compare",'')
      }
      else{

        console.log("came to remove when data is 4")
  
        let indexToUpdate = cacheData.findIndex(element => element._id === item._id);
        cacheData[indexToUpdate]['checked'] = $event.target.checked;
     
        this.toaster.showWarning("The product has been excluded from the comparison.",'')
        // if(item.checked){
        //   item.checked = false;
        // }
        // else{
        //   item['checked'] = false;
        // }
        
        
        this.selectedListForCompare = this.selectedListForCompare.filter(element => element._id != item._id);
        localStorage.setItem('product_list_to_compare', JSON.stringify(cacheData));
        localStorage.setItem('product_list_to_compare2', JSON.stringify(cacheData));
        //localStorage.setItem('product_list_to_compare2', JSON.stringify(this.selectedListForCompare));
        // console.log("()()()()( +++++ ", this.selectedListForCompare);
        // console.log("()()()()( +++++ Cached", cacheData);
        this.listForCompare.emit(this.selectedListForCompare);
      // localStorage.removeItem('product_list_to_compare');
      
       

      
      }
   
    
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
