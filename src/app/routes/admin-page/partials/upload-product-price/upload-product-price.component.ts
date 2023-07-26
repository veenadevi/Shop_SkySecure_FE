import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, filter, Subscription, switchMap, forkJoin } from 'rxjs';
import { MetadataService } from 'src/shared/services/metadata.service';
import { LoaderService } from 'src/shared/services/loader.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { HttpClient } from '@angular/common/http';

import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';

@Component({
  selector: 'app-upload-product-price',
  templateUrl: './upload-product-price.component.html',
  styleUrls: ['./upload-product-price.component.css']
})
export class UploadProductPriceComponent implements OnInit  {
  public subscriptions : Subscription[] = [];
  public uplodedData : any;
  public totalProducts:Number
  public totalProductVariants:Number
  public totalProductBundle:Number
  public totalProductBundleVariants:Number

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private metaDataSvc: MetadataService,
    private metadataStore: MetadataStore,
    private http: HttpClient,

    private adminPageService : AdminPageService
  ){
   
  }

  @ViewChild('fileInput') el: ElementRef;
 
  ngOnInit(): void {
  //  throw new Error('Method not implemented.');
  this.totalProducts=0;
  this.totalProductVariants=0;
  this.totalProductBundle=0;
  this.totalProductBundleVariants=0;
  }



  public updateProductPrice(event: any){
    this.subscriptions.push(
      this.adminPageService.uploadFile(event).subscribe(res=>{
        // console.log("***** Res", res);
        this.uplodedData = res.total;
        // console.log("this.uplodedData  "+this.uplodedData.products)

        this.totalProducts=(this.uplodedData.products && this.uplodedData.products!== null)?this.uplodedData.products:0
        this.totalProductVariants=(this.uplodedData.productsVariants && this.uplodedData.productsVariants!== null)?this.uplodedData.productsVariants:0
        this.totalProductBundle=(this.uplodedData.productFamily && this.uplodedData.productFamily!== null)?this.uplodedData.productFamily:0
        this.totalProductBundleVariants=(this.uplodedData.productFamilyVariants && this.uplodedData.productFamilyVariants!== null)?this.uplodedData.productFamilyVariants:0
      })
    )
  }

  // uploadFile(event: any) {
  //   console.log("__TEST__", event);
  //   const formData: FormData = new FormData();
  //   formData.append('file', event.target.files[0], event.target.files[0].name);

  //   this.http.post('http://localhost:8002/api/bulk/update-pricing', formData)
  //     .subscribe(
  //       (response: any) => {
  //         console.log('Upload successful', response);
         
  //         // Handle the response from the server
  //       },
  //       error => {
  //         console.error('Upload error:', error);
  //         // Handle the error response
  //       }
  //     );
  // }

}
