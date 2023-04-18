import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MetadataService } from 'src/shared/services/metadata.service';

@Component({
  selector: 'brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit{


  constructor(
    private route: ActivatedRoute,
    private metaDataSvc : MetadataService
  ){}


  public onPageLoad : boolean = true;

  public subscriptions : Subscription[] = [];

  public bundleSku : any;




  public ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('brandId');
    this.getBrandDetails(productId);
  }


  public getBrandDetails(id){
    console.log("**** Id ,", id);
    id = '63eb236c53c21de2f6841bca';
    this.onPageLoad = false;
    this.subscriptions.push(
       this.metaDataSvc.fetchSingleBrandDetails(id).subscribe( response => {

        console.log(")))))))))) Respo ", response);
        this.bundleSku = response.bundleSku;

        /*let featureList = [];
        if(response.productFeatureList?.length > 0) {
          featureList = response.productFeatureList;
          this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
        }
        else if(response.productVariants.length> 0 ){
          featureList = response.productVariants[response.productVariants.length -1].featureList.slice(0,5);
          this.productSubCategoryId = response.productVariants[0].featureList[0].subCategoryId;
        }
        this.similarProducts = response.productBundles;
        this.product = { ...response.products , featureList : featureList, productFeatureList: response.productFeatureList, productVariants: response.productVariants } ; */
        this.onPageLoad = true;
      })
    );
  }


  public requestQuote(product){

  }
  
}
