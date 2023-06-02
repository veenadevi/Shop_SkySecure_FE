import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductVariantModalComponent } from '../product-variant-modal/product-variant-modal.component';
import { LoginAlertModalComponent } from '../login-alert-modal/login-alert-modal.component';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'feature-list-table',
  templateUrl: './feature-list-table.component.html',
  styleUrls: ['./feature-list-table.component.css']
})
export class FeatureListTableComponent implements OnInit{

  @Input('product')
  public product : any;

  public productVarients : any[] = [];

  public featureList : any[] = [];

  public onLoad = true;

  constructor(
    private modalService : NgbModal,
    private modalServiceBundle : NgbModal,
    private authService : MsalService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.onLoad = false;
    console.log("****++++++++ After calc", this.product);

    this.setProductVarients(this.product);
    this.setFeatureList(this.product.featureList);
  }

  public setProductVarients(product){
    this.productVarients = product.productVariants;

    this.featureList = product.featureList;
    let featureListByProductVariants = product.featureListByProductVariants;

    for(let i=0;i<this.productVarients.length;i++){
      this.productVarients[i]['featureListArray'] = [];
      for(let j=0;j<featureListByProductVariants.length;j++){
        if(featureListByProductVariants[j].productVariantId === this.productVarients[i]._id){
          this.productVarients[i].featureListArray.push(featureListByProductVariants[j]._id);
        }

      }
    }

    console.log("****++++++++ After calc ", this.productVarients);
    this.productVarients;
    this.onLoad = true;
    
  }

  public setFeatureList(featureList){
    this.featureList = featureList;
  }

  public requestQuote(item){


    if(!item.isAddOn){
      this.addQuote(item);
    }

    else{
      let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com"));

      if(loggedinData.length > 0 ){
        const modalRef = this.modalServiceBundle.open(ProductVariantModalComponent);
        modalRef.componentInstance.productVariant = item;
      }

      else{
        this.viewModal();
      }

    }
    
  }

  public addQuote(productVariant){
    console.log("&&&&&&&&& +++++++ ", productVariant);
    let queryParams;
    // if(!productVariant.isAddOn){
      queryParams = {
        productName : productVariant.name,
        productId : productVariant._id,
        quantity : 1,
        price : (productVariant && productVariant.priceList.length>0) ?  productVariant.priceList[0].price : ''
      };
      
    //}

 

    
    this.router.navigate(['/cart'], {queryParams: queryParams});

  }

  public viewModal() {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
  }

  public onNavigateTo(link){
    const url = link;
    if(link){
      window.open(url, "'"+link+"'");
    }
    
  }
  

}
