import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { CartStore } from 'src/shared/stores/cart.store';

@Component({
  selector: 'brand-bundle',
  templateUrl: './brand-bundle.component.html',
  styleUrls: ['./brand-bundle.component.css']
})
export class BrandBundleComponent implements OnInit{


  @Input('productVarientData')
  public productVarientData : any;

  public products : any[] = [];

  public features : any[] = [];

  public productVarients : any[] = [];

  public productFamilyVariants : any[] = [];

  public productFamily : any;

  public headerText : string;

  public cardItems : any[] = [];

  public cardProductItems : any[] = [];

  public cardProductVarientsItems : any[] = [];

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';


  public alternateUrl = 'https://csg1003200209655332.blob.core.windows.net/images/1685514191-MicrosoftGreyBackground.jpg';


  constructor(
    private authService : MsalService,
    private cartStore : CartStore,
    private router : Router,
    private modalService : NgbModal
  ){}

  ngOnInit(): void {
    this.productFamily = this.productVarientData.productFamily;
    this.productFamilyVariants = this.productVarientData.productFamilyVariants;
    this.productVarients = this.productVarientData.productVarients;
    this.products = this.productVarientData.products;

    if(this.productFamilyVariants && this.productFamilyVariants.length>0){
      
      this.setProductFamilyVarient();
    }
    else{
      this.setSingleVarient();
    }
    
  }

  public setSingleVarient(){
    this.headerText = this.productFamily.name ? this.productFamily.name : '';

    this.productVarients.forEach(element => {
        element['logo'] = element.products.bannerLogo ? element.products.bannerLogo : this.alternateLogo;
        element['textClr'] = element.products.bannerTextColor ? element.products.bannerTextColor : 'Black';
        element['bgImg'] = element.products.bannerURL ? element.products.bannerURL : this.alternateUrl;
        element['prdType'] = ['bundle'];
        element['navigationId'] = element.productId;
    });
    this.products.forEach(element => {
      element['logo'] = element.bannerLogo ? element.bannerLogo : this.alternateLogo;
      element['textClr'] = element.bannerTextColor ? element.bannerTextColor : 'Black';
      element['bgImg'] = element.bannerURL ? element.bannerURL : this.alternateUrl;
      element['prdType'] = ['product'];
      element['navigationId'] = element._id;
    });
    this.cardItems = [...this.products , ...this.productVarients];
  }

  public setProductFamilyVarient(){




    this.productFamilyVariants.forEach( element => {
      console.log("****** ++++++++ _________ ", element);
        if(element.productsVariants && element.productsVariants.length>0){
          element.productsVariants.forEach(element => {
            element['logo'] = element.product.bannerLogo ? element.product.bannerLogo : this.alternateLogo;
            element['textClr'] = element.product.bannerTextColor ? element.product.bannerTextColor : 'Black';
            element['bgImg'] = element.product.bannerURL ? element.product.bannerURL : this.alternateUrl;
            element['prdType'] = ['bundle'];
            element['navigationId'] = element.productId;

          });
        }
        if(element.products && element.products.length>0){
          element.products.forEach(element => {
            element['logo'] = element.bannerLogo ? element.bannerLogo : this.alternateLogo;
            element['textClr'] = element.bannerTextColor ? element.bannerTextColor : 'Black';
            element['bgImg'] = element.bannerURL ? element.bannerURL : this.alternateUrl;
            element['prdType'] = ['product'];
            element['navigationId'] = element._id;
          });
        }
        
        
      }
    )
    
    // this.productVarients.forEach(element => {
    //   element['logo'] = element.products.bannerLogo ? element.products.bannerLogo : this.alternateLogo;
    //   element['textClr'] = element.products.bannerTextColor ? element.products.bannerTextColor : 'Black';
    //   element['bgImg'] = element.products.bannerURL ? element.products.bannerURL : '';
    // });
    // this.products.forEach(element => {
    //   element['logo'] = element.bannerLogo ? element.bannerLogo : this.alternateLogo;
    //   element['textClr'] = element.bannerTextColor ? element.bannerTextColor : 'Black';
    //   element['bgImg'] = element.bannerURL ? element.bannerURL : '';
    // });

    // this.cardProductItems = this.products;
    // this.cardProductVarientsItems = this.productVarients;
  }

  public requestQuote(product){

    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    if(loggedinData.length > 0 ){
      
      var existingItems = this.cartStore.getCartItems();
      let queryParams;
      
      if(product.priceList && product.priceList.length>0){
        queryParams = {
          productName : product.name,
          productId : product._id,
          quantity : 1,
          price : product.priceList[0].price,
        };
      }
      else{
        queryParams = {
          productName : product.name,
          productId : product._id,
          quantity : 1,
          price : ''
        };
      }
      /*if(product.productsVariants){
        
        queryParams = {
          productName : product.productVariants[0].name,
          productId : product.productVariants[0]._id,
          quantity : 1,
          price : product.productVariants[0].priceList[0].price,
        };
      }
      else{
        console.log("*********** ++++++++ product No product Var", product);
        if(product.priceList && product.priceList.length>0){
          queryParams = {
            productName : product.name,
            productId : product._id,
            quantity : 1,
            price : product.priceList[0].price,
          };
        }
        else{
          queryParams = {
            productName : product.name,
            productId : product._id,
            quantity : 1,
            price : ''
          };
        }
        
      }*/
      
      console.log("*********** ++++++++ product Prd VAR", queryParams);
      this.router.navigate(['/cart'], {queryParams: queryParams});
    }

    else {
      this.viewModal();
    }
  }

  public viewModal() {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
  }

}
