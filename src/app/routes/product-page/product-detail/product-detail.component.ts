import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MetadataService } from 'src/shared/services/metadata.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  products = [];

  private subscriptions: Subscription[] = [];
  public product : any = {};
  public onProductLoad = true;
  public productSubCategoryId : String;

  private getProductDetails(productId: string): void {
    this.onProductLoad = false;
    this.subscriptions.push(
       this.metaDataSvc.fetchSingleProductDetails(productId).subscribe( response => {
        let featureList = [];
        if(response.productFeatureList?.length > 0) {
          featureList = response.productFeatureList;
          this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
        }
        else if(response.productVariants.length> 0 ){
          featureList = response.productVariants[response.productVariants.length -1].featureList.slice(0,5);
          this.productSubCategoryId = response.productVariants[0].featureList[0].subCategoryId;
        }
        console.log("+++productSubCategoryId+++++",this.productSubCategoryId);
        if(this.productSubCategoryId) {
          this.getSimilerProducts(this.productSubCategoryId);
        }
        this.product = { ...response.products , featureList : featureList, productFeatureList: response.productFeatureList, productVariants: response.productVariants } ;
        this.onProductLoad = true;
      })
    );
  }

  private getSimilerProducts(subCategoryId: String) {
    this.subscriptions.push(
      this.metaDataSvc.fetchAllProductsBySubCategoryIds([subCategoryId]).subscribe(response => {
        console.log("___fetchAllProductsBySubCategoryIds________", response);
        this.products = response.products.map((data: any) => {
          return {
            name: data.name,
            solutionLink: data.name,
            imageUrl: 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg',
            description: data.description
          }
        })
        console.log("___PRODUCTS RESPONSE_____",this.products);
      })
    );
  }

  constructor(
    private metaDataSvc : MetadataService,
    private route: ActivatedRoute
  ){}

  public ngOnInit() : void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProductDetails(productId);
  }
}
