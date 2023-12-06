import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartStore } from 'src/shared/stores/cart.store';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';
import { LoginAlertModalComponent } from '../../login-alert-modal/login-alert-modal.component';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';
import { AddItemsToCartService } from 'src/shared/services/global-function-service/add-items-to-cart.service';
 
@Component({
  selector: 'product-card-flyer',
  templateUrl: './product-card-flyer.component.html',
  styleUrls: ['./product-card-flyer.component.css']
})
export class ProductCardFlyerComponent implements OnInit{

 



  discountRate: number =120; 
  // monthlyPrice: number = this.discountRate ;
  isMonthly: boolean = true;
  priceValue:any;
  priceType:any;
  mrpPriceType : any;
 
  
  

data:any;
  showYearlyPrice(i:any) {
   
    this.isMonthly = true; 


    this.productsList[i].displayPrice= this.productsList[i].priceList[0].price
    this.productsList[i].displayERPPrice= this.productsList[i].priceList[0].ERPPrice
    this.productsList[i].displayPriceType= this.productsList[i].priceList[0].priceType
    this.productsList[i].displayDiscount= this.productsList[i].priceList[0].discountRate

    // this.productsList[i].displayPrice1= this.productsList[i].priceList[1].price
    // this.productsList[i].displayERPPrice1= this.productsList[i].priceList[1].ERPPrice
    // this.productsList[i].displayPriceType1= this.productsList[i].priceList[1].priceType
    // this.productsList[i].displayDiscount1= this.productsList[i].priceList[1].discountRate

    this.productsList[i].displayPrice= this.productsList[i].priceList[2].price
    this.productsList[i].displayERPPrice= this.productsList[i].priceList[2].ERPPrice
    this.productsList[i].displayPriceType= this.productsList[i].priceList[2].priceType
    this.productsList[i].displayDiscount= this.productsList[i].priceList[2].discountRate

  }

  showDiscountRate(i: any) { 
    this.isMonthly = false;
    this.productsList[i].displayPrice= this.productsList[i].priceList[1].price
    this.productsList[i].displayERPPrice= this.productsList[i].priceList[1].ERPPrice
    this.productsList[i].displayPriceType= this.productsList[i].priceList[1].priceType
    this.productsList[i].displayDiscount= this.productsList[i].priceList[1].discountRate

    // this.productsList[i].displayPrice= this.productsList[i].priceList[0].price
    // this.productsList[i].displayERPPrice= this.productsList[i].priceList[0].ERPPrice
    // this.productsList[i].displayPriceType= this.productsList[i].priceList[0].priceType
    // this.productsList[i].displayDiscount= this.productsList[i].priceList[0].discountRate

    this.productsList[i].displayPrice= this.productsList[i].priceList[2].price
    this.productsList[i].displayERPPrice= this.productsList[i].priceList[2].ERPPrice
    this.productsList[i].displayPriceType= this.productsList[i].priceList[2].priceType
    this.productsList[i].displayDiscount= this.productsList[i].priceList[2].discountRate

  //  this.data=this.productsList[i]
  }
  // originalAmount: number = 100;
  // modifiedAmountValue: number = 150;
  // isHovered: boolean = false;



  //@Input() products : Array<any> = [];

public productsList : any[] = [];
public whatsAppMessage:string

  @Input() set products(value : any){

    this.productsList = value;
    //this.mrpPriceType = this.productsList[0].priceList[0].priceType;

    this.productsList.forEach(element => {

      element.displayPrice=element.priceList[1].price
      element.displayERPPrice=element.priceList[1].ERPPrice
      element.displayPriceType=element.priceList[1].priceType
      element.displayDiscount=element.priceList[1].discountRate
        //element.priceList[2].priceType = "Month";

        /*element.displayPrice=element.priceList[2].price
        element.displayERPPrice=element.priceList[2].ERPPrice
        element.displayPriceType=element.priceList[2].priceType
        element.displayDiscount=element.priceList[2].discountRate*/

      //   element.displayPrice=element.priceList[0].price
      // element.displayERPPrice=element.priceList[0].ERPPrice
      // element.displayPriceType=element.priceList[0].priceType
      // element.displayDiscount=element.priceList[0].discountRate
    });
 
  }

  @Input() type : any;

  public selectedListForCompare : any[] = [];

  public cachedDataForCheckBox : any = [];

  @Output() listForCompare = new EventEmitter();

  constructor(
    private router : Router,
    private route:ActivatedRoute,
    private compareProductsStore : CompareProductsStore,
    private authService : MsalService,
    private cartStore : CartStore,
    private modalService : NgbModal,
    private userAccountStore : UserAccountStore,
    private toaster : ToasterNotificationService,
    private addItemsToCartService : AddItemsToCartService,
    

    
  ){}


  ngOnInit(): void {
    
    // this.productsList[i].displayPrice= this.productsList[i].priceList[1].price
    // this.productsList[i].displayERPPrice= this.productsList[i].priceList[1].ERPPrice
    // this.productsList[i].displayPriceType= this.productsList[i].priceList[1].priceType
    // this.productsList[i].displayDiscount= this.productsList[i].priceList[1].discountRate
  //localStorage.removeItem('compare_products_list');
  this.whatsAppMessage="Hello! I've contacted you through your website 'Skysecure MarketPlace." 
    
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
 
  public addToCompare($event, item, i){
    
    if ($event.target.checked) {
      this.handleAddToCompare(item,$event);
    } else {
      this.handleRemoveFromCompare(item);
    }
  }
  
  private handleAddToCompare(item,$event) {
    const cachedProductsToCompare = this.getCachedProductsToCompare();
    const compareProductsListLen = cachedProductsToCompare.length;
  console.log("cachedProductsToCompare ", cachedProductsToCompare,"compareProductsListLen ",compareProductsListLen )
  
    if (compareProductsListLen < 4) {
      if (!this.isItemInCompareList(item, cachedProductsToCompare)) {
        this.addItemToCompareList(item, cachedProductsToCompare);
        this.toaster.showSuccess("The Product has been included for comaprision",'')
      } else {
        // this.showWarningMessage("Product already added for Compare");
        this.toaster.showWarning("Product already added for Compare",'')
      } 
    } else {
      if(compareProductsListLen<=4){
        // Uncheck the checkbox
         // item.checked = true;
       //  this.toaster.showWarning("You can add only 4 products to compare", '');
         this.uncheckCheckboxAndShowWarning($event);
       }  
    }
    
  }
 
  
  
  private handleRemoveFromCompare(item) {
    const cachedProductsToCompare = this.getCachedProductsToCompare();
    if (this.isItemInCompareList(item, cachedProductsToCompare)) {
      this.removeItemFromCompareList(item, cachedProductsToCompare);
    }
  }
  
  private getCachedProductsToCompare() {
    return JSON.parse(localStorage.getItem('compare_products_list') || '[]');
  }
  
  private isItemInCompareList(item, compareList) {
    return compareList.some(el => el._id === item._id);
  }
  
  private addItemToCompareList(item, compareList) {
    item.checked = true;
    compareList.push(item);
    localStorage.setItem('compare_products_list', JSON.stringify(compareList));
    this.compareProductsStore.setCompareProductsList(compareList);
  }
  
  private removeItemFromCompareList(item, compareList) {
    const index = compareList.findIndex(el => el._id === item._id);
    if (index >= 0) {
      item.checked = false;
      compareList.splice(index, 1);
      localStorage.setItem('compare_products_list', JSON.stringify(compareList));
      this.compareProductsStore.setCompareProductsList(compareList);
    }
  }
  
  private showWarningMessage(message) {
    this.toaster.showWarning(message, '');
  }
  
  private uncheckCheckboxAndShowWarning(  event) {
    event.target.checked = false;
    // this.toaster.showWarning(message, '');
    this.toaster.showWarning("You can add only 4 products to compare", '');
  }
  
  


  

  public onFilterChange($event, item){
    
    let tempLen = this.getCompareProductsCount();
    var a = 3;
    //let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');


    let cacheData1 = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    //let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let cacheData2 = [];
    let combinedData = [...cacheData1, ...cacheData2];
    let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];


    let cacheData =uniqueElements;

    if(tempLen<4){
      

    


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
  
      let tempData = [];
      if($event.target.checked){
        
        this.selectedListForCompare.push(item);
        tempData.push(item);
        
        
        this.toaster.showSuccess("The product has been included for comparison.",'')
      }
      else{
        this.toaster.showWarning("The product has been excluded from the comparison",'')
        
     
        this.selectedListForCompare = this.cachedDataForCheckBox.filter(element => element._id != item._id);
        tempData = this.cachedDataForCheckBox.filter(element => element._id != item._id);
        localStorage.setItem('product_list_to_compare', JSON.stringify(tempData));
        //localStorage.setItem('product_list_to_compare', JSON.stringify(this.selectedListForCompare));
        //localStorage.setItem('product_list_to_compare2', JSON.stringify(this.selectedListForCompare));
       
      }
       
      
  
    
      
      //this.listForCompare.emit(this.selectedListForCompare);
      this.listForCompare.emit(tempData);

    }

    else{
   

      let tempData= [];
      if($event.target.checked){
        item.checked = false;
        this.toaster.showWarning("You can add only 4 products to compare",'')
      }
      else{

     
  
        let indexToUpdate = cacheData.findIndex(element => element._id === item._id);
        cacheData[indexToUpdate]['checked'] = $event.target.checked;
     
        this.toaster.showWarning("The product has been excluded from the comparison.",'')
        // if(item.checked){
        //   item.checked = false;
        // }
        // else{
        //   item['checked'] = false;
        // }
        
        tempData = tempData.filter(element => element._id != item._id);
        this.selectedListForCompare = this.selectedListForCompare.filter(element => element._id != item._id);
        localStorage.setItem('product_list_to_compare', JSON.stringify(cacheData));
        //localStorage.setItem('product_list_to_compare2', JSON.stringify(cacheData));
        
        //this.listForCompare.emit(this.selectedListForCompare);
        this.listForCompare.emit(tempData);
      
       

      
      }
   
    
    }


    
  }

  public requestQuote(product){

    //let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    var queryParams;

    
    queryParams = {
          productName : product.name,
          productId : product._id,
          quantity : 1,
          price : product.priceList[0].price,
          erpPrice:product.priceList[0].ERPPrice,
          discountRate:product.priceList[0].discountRate,
          priceType:product.priceList[0].priceType,
          distributorPrice:product.priceList[0].distributorPrice,
          priceList : product.priceList

        };
  

    let encodedVal = localStorage.getItem('XXXXaccess__tokenXXXX');
    if (encodedVal !== null) {

    
      this.addItemsToCartService.addItemsToCart(queryParams);
    }
    else{

      var currentRouteName = this.route.snapshot.data.title;
      currentRouteName='/products/'+this.route.snapshot.url[0].path+'/'+ this.route.snapshot.url[1].path

      console.log("===calign after log  gain==========",this.route.snapshot)

      console.log("===routing==========",currentRouteName)

      queryParams.priceList = JSON.stringify(queryParams.priceList);
      this.router.navigate(['login'], {queryParams:{...queryParams,currentRouteName:currentRouteName}})

    
    
    }
    /*this.userAccountStore.userDetails$.subscribe(res=>{
      
      if(res && res.email !== null){
        console.log("++++_______ Came Here If PRDCARDFL");
        this.addItemsToCartService.addItemsToCart(queryParams);
        //this.router.navigate(['/cart'], {queryParams: queryParams});
      }
      else{
        this.viewModal(queryParams);
      }
    })*/
  }

  public viewModal(queryParams) {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
    modalRef.componentInstance.request = queryParams;
  }

  public setCheckBoxes(){

  }


  public getCompareProductsCount(){
    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
   //let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
   let cacheData2=[]
    let combinedData = [...cacheData, ...cacheData2];
    let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];

  
    return uniqueElements.length;
    
  }


  public getProductsCount(){
    let cachedProductsToCompare = JSON.parse(localStorage.getItem('compare_products_list') || '[]');
    
    return cachedProductsToCompare;
  }


}
