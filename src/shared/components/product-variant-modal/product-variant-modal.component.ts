import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-variant-modal',
  templateUrl: './product-variant-modal.component.html',
  styleUrls: ['./product-variant-modal.component.css']
})
export class ProductVariantModalComponent {

  @Input() productVariant : any;

  public requiredAddOnsList : any[] = [];
  constructor(
    public activeModal: NgbActiveModal,
    private router : Router
    ) { }

  public ngOnInit() : void {
    console.log("+++++++ Varient ", this.productVariant);
    this.setAddOns(this.productVariant.requiredAddOns)
    
  }

  public setAddOns(requiredAddOns) {

    this.requiredAddOnsList = [...requiredAddOns.requiredBundles , ...requiredAddOns.requiredProductVariants]
    
    if(this.requiredAddOnsList.length > 0){
      this.requiredAddOnsList.forEach(element => {
        element['checked'] = true;
      });
    }

    


  }

  public requestQuote(){
    console.log("**** +++++++ ,", this.requiredAddOnsList);
    let queryParams;
    if(!this.productVariant.isAddOn){
      queryParams = {
        productName : this.productVariant.name,
        productId : this.productVariant._id,
        quantity : 1,
      };
      
    }

    else{

      let finalProducts = this.requiredAddOnsList.filter(data => (data.checked === true))
      console.log("**** Final Products", finalProducts);

      if(finalProducts.length <= 0) {
        // All Products
        queryParams = {
          productName : this.productVariant.name,
          productId : this.productVariant._id,
          quantity : 1,
        };
        //this.router.navigate(['/cart'], {queryParams: queryParams});

      }

      else{
        queryParams = {
          // productList : JSON.stringify(this.requiredAddOnsList),
          // parentProduct :  JSON.stringify(this.productVariant)
          productVariant : JSON.stringify(this.productVariant)
        }
      }

    }

    this.activeModal.close();
    this.router.navigate(['/cart'], {queryParams: queryParams});

  }

  public closeModal(){
    this.activeModal.close();
  }

  ngOnDestroy() {
    
  }
}
