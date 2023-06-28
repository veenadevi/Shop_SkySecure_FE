import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  productImages=[];
  products = [];
  links = ['#description', '#feature', '#specification','#reviews', '#compProd', '#bundles','#simProd'];
  titles = ['Description', 'Features', 'Specification','Reviews','compare produscts','Bundles','Similar Products'];
  activeLink = this.links[0];
  myColor = '';

  @ViewChild('descriptionRef') descriptionRef!: ElementRef;
  @ViewChild('featureRef') featureRef!: ElementRef;
  @ViewChild('specificationRef') specificationRef!: ElementRef;
  @ViewChild('reviewsRef') reviewsRef!: ElementRef;
  @ViewChild('compProdRef') compProdRef!: ElementRef;
  @ViewChild('bundlesRef') bundlesRef!: ElementRef;
  @ViewChild('simProdRef') simProdRef!: ElementRef;
  @ViewChild('section2Ref') section2Ref!: ElementRef;

  scrollToSection(sectionId: any): void {

    this.activeLink=sectionId;
    sectionId  = sectionId.slice(1);
    let section;
    if(sectionId === 'description') {
      section = this.descriptionRef.nativeElement
    } else if (sectionId === 'feature') {
      section = this.featureRef.nativeElement
    } else if (sectionId === 'specification') {
      section = this.specificationRef.nativeElement
    }
    else if (sectionId === 'reviews') {
      section = this.reviewsRef.nativeElement
    }
    else if (sectionId === 'compProd') {
      section = this.compProdRef.nativeElement
    }
    else if (sectionId === 'bundles') {
      section = this.bundlesRef.nativeElement
    }
    else if (sectionId === 'simProd') {
      section = this.simProdRef.nativeElement
    }
    

    // const section = sectionId === 'section1' ? this.section1Ref.nativeElement : this.section2Ref.nativeElement;
    section.scrollIntoView({ behavior: 'smooth' });
  }
  // responsiveOptions: any[] | undefined;

  openLink(url:any): void {
    // const url = 'https://example.com';
    console.log("url",url);
    window.open(url, '_blank');
  }

  responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];

 featureList: any[] = [];
 productVariants: any[]  =[];
 dispFeatureList: any[] = [];
 productName:string;
  public bannerUrl : any;

  private subscriptions: Subscription[] = [];
  public product : any = {};
  public onProductLoad = true;
  public productSubCategoryId : String;
  public similarProducts : Array<any> = [];
  public bannerText: '#FFFFFF';

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';



  public individualProductDetail$ = this.metadataStore.individualProductDetail$
  .pipe(
    map(data => {
      if(data){
        this.setData(data);
        return data;
      }
      else{
        
        return data;
      }
    }
    )
  )

  private getProductDetails2(productId: string) : void{
    this.onProductLoad = false;
    this.subscriptions.push(this.metaDataSvc.fetchSingleProductDetails(productId).subscribe(response => {
      this.individualProductDetail$.subscribe(data => {
      });
    }))
  }

  private setData(response){
    /*let featureList = [];
    // if(response.productFeatureList?.length > 0) {
    //   //featureList = response.productFeatureList;
    //   featureList = response.featureList;
    //   this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
    // }

    //response.featureList = response.newfeatureLists;
    if(response.featureList?.length > 0) {
      //featureList = response.productFeatureList;
      featureList = response.featureList.splice(0,3);
      //this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
    }
    else if(response.productVariants.length> 0 ){
      featureList = response.productVariants[response.productVariants.length -1].featureList.slice(0,5);
      //this.productSubCategoryId = response.productVariants[0].featureList[0].subCategoryId;
    }
    this.similarProducts = response.productBundles;
    this.product = { ...response.products , featureList : response.featureList, productFeatureList: response.productFeatureList, productVariants: response.productVariants, featureListByProductVariants : response.featureListByProductVariants } ;
    this.onProductLoad = true;*/
  }

  private  getProductDetails(productId: string): void {
    this.onProductLoad = false;
    this.subscriptions.push(
      this.metaDataSvc.fetchSingleProductDetails(productId).subscribe( (response) => {
         this.individualProductDetail$.subscribe();

        let fList = [];
        if (response.featureList?.length > 0) {
          //featureList = response.productFeatureList;
          this.featureList = response.featureList.slice(0,5);
          //this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
        }
        if(response.products.name!=null) {
        this.productName = response.products.name;
        }

        // this.featureList = fList;
        console.log("inside", this.featureList);
        
        this.similarProducts = response.productBundles;
        response.productVariants = [{
          "_id": "6413082ebdb764f8d6a252b7",
          "priceList": [
              {
                  "Currency": "INR",
                  "price": "1525.20",
                  "priceType": "Yearly",
                  "ERPPrice": "1860.00",
                  "discountRate": "18"
              }
          ],
          "name": "Microsoft Defender for Office 365 Plan 1",
          "description": "Microsoft Defender for Office 365 Plan 1",
          "createdBy": "ADMIN",
          "updatedBy": "ADMIN",
          "productId": "6408c67ebc262d784813b71b",
          "createdAt": "2023-03-16T12:14:38.814Z",
          "updatedAt": "2023-06-26T07:52:25.863Z",
          "__v": 0,
          "isActive": true,
          "productSkuNumber": "CFQ7TTC0LH04",
          "productSkuId": 1,
          "requiredAddOns": {
              "requiredProductVariants": [],
              "requiredBundles": []
          },
          "featureList": [
              {
                  "_id": "6406ce0c4f8b923f284306ed",
                  "name": "Preset security policies and Configuration Analyzer",
                  "description": "Preset security policies and Configuration Analyzer",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.226Z",
                  "updatedAt": "2023-03-07T05:39:24.226Z",
                  "__v": 0,
                  "productVariantId": "6413082ebdb764f8d6a252b7",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f284306f1",
                  "name": "Safe Attachments in Teams",
                  "description": "Safe Attachments in Teams",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.315Z",
                  "updatedAt": "2023-03-07T05:39:24.315Z",
                  "__v": 0,
                  "productVariantId": "6413082ebdb764f8d6a252b7",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f284306f5",
                  "name": "Safe Documents",
                  "description": "Safe Documents",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.406Z",
                  "updatedAt": "2023-03-07T05:39:24.406Z",
                  "__v": 0,
                  "productVariantId": "6413082ebdb764f8d6a252b7",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f284306f7",
                  "name": "Safe Links in Teams",
                  "description": "Safe Links in Teams",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.452Z",
                  "updatedAt": "2023-03-07T05:39:24.452Z",
                  "__v": 0,
                  "productVariantId": "6413082ebdb764f8d6a252b7",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f284306f9",
                  "name": "Report Message Add-In",
                  "description": "Report Message Add-In",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.500Z",
                  "updatedAt": "2023-03-07T05:39:24.500Z",
                  "__v": 0,
                  "productVariantId": "6413082ebdb764f8d6a252b7",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f284306fb",
                  "name": "Protection for SharePoint, OneDrive, and Microsoft Teams",
                  "description": "Protection for SharePoint, OneDrive, and Microsoft Teams",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.547Z",
                  "updatedAt": "2023-03-07T05:39:24.547Z",
                  "__v": 0,
                  "productVariantId": "6413082ebdb764f8d6a252b7",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f284306fd",
                  "name": "Anti-phishing policies",
                  "description": "Anti-phishing policies",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.595Z",
                  "updatedAt": "2023-03-07T05:39:24.595Z",
                  "__v": 0,
                  "productVariantId": "6413082ebdb764f8d6a252b7",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f284306ff",
                  "name": "Real-time reports",
                  "description": "Real-time reports",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.639Z",
                  "updatedAt": "2023-03-07T05:39:24.639Z",
                  "__v": 0,
                  "productVariantId": "6413082ebdb764f8d6a252b7",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f28430701",
                  "name": "Advanced protection for internal mail",
                  "description": "Advanced protection for internal mail",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.681Z",
                  "updatedAt": "2023-03-07T05:39:24.681Z",
                  "__v": 0,
                  "productVariantId": "6413082ebdb764f8d6a252b7",
                  "isActive": true
              }
          ]
      },
      {
          "_id": "6413084dbdb764f8d6a252b9",
          "priceList": [
              {
                  "Currency": "INR",
                  "price": "3886.80",
                  "priceType": "Yearly",
                  "ERPPrice": "4740.00",
                  "discountRate": "18"
              }
          ],
          "name": "Microsoft Defender for Office 365 Plan 2",
          "description": "Microsoft Defender for Office 365 Plan 2",
          "createdBy": "ADMIN",
          "updatedBy": "ADMIN",
          "productId": "6408c67ebc262d784813b71b",
          "createdAt": "2023-03-16T12:15:09.755Z",
          "updatedAt": "2023-06-26T07:52:25.863Z",
          "__v": 0,
          "isActive": true,
          "productSkuNumber": "CFQ7TTC0LHXH",
          "productSkuId": 1,
          "requiredAddOns": {
              "requiredProductVariants": [],
              "requiredBundles": []
          },
          "featureList": [
              {
                  "_id": "6406ce0c4f8b923f28430703",
                  "name": "Threat Trackers",
                  "description": "Threat Trackers",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.725Z",
                  "updatedAt": "2023-03-07T05:39:24.725Z",
                  "__v": 0,
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f28430705",
                  "name": "Campaign Views",
                  "description": "Campaign Views",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.772Z",
                  "updatedAt": "2023-03-07T05:39:24.772Z",
                  "__v": 0,
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f28430707",
                  "name": "Threat investigation (advanced threat investigation)",
                  "description": "Threat investigation (advanced threat investigation)",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.820Z",
                  "updatedAt": "2023-03-07T05:39:24.820Z",
                  "__v": 0,
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f28430709",
                  "name": "Automated investigation & response",
                  "description": "Automated investigation & response",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.865Z",
                  "updatedAt": "2023-03-07T05:39:24.865Z",
                  "__v": 0,
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "isActive": true
              },
              {
                  "_id": "6406ce0c4f8b923f2843070b",
                  "name": "Attack simulation training",
                  "description": "Attack simulation training",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "createdAt": "2023-03-07T05:39:24.911Z",
                  "updatedAt": "2023-03-07T05:39:24.911Z",
                  "__v": 0,
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "isActive": true
              },
              {
                  "_id": "6416e9a601f5bc0a35b03f87",
                  "properties": [],
                  "isHighlight": false,
                  "name": "Preset security policies and Configuration Analyzer",
                  "description": "Preset security policies and Configuration Analyzer",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "createdAt": "2023-03-19T10:53:26.977Z",
                  "updatedAt": "2023-03-19T10:53:26.977Z",
                  "__v": 0,
                  "isActive": true
              },
              {
                  "_id": "6416f06101f5bc0a35b03f8b",
                  "properties": [],
                  "isHighlight": false,
                  "name": "Safe Attachments in Teams",
                  "description": "Safe Attachments in Teams",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "createdAt": "2023-03-19T11:22:09.532Z",
                  "updatedAt": "2023-03-19T11:22:09.532Z",
                  "__v": 0,
                  "isActive": true
              },
              {
                  "_id": "6416f0b001f5bc0a35b03f8f",
                  "properties": [],
                  "isHighlight": false,
                  "name": "Safe Documents",
                  "description": "Safe Documents",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "createdAt": "2023-03-19T11:23:28.737Z",
                  "updatedAt": "2023-03-19T11:23:28.737Z",
                  "__v": 0,
                  "isActive": true
              },
              {
                  "_id": "6416f28d01f5bc0a35b03f91",
                  "properties": [],
                  "isHighlight": false,
                  "name": "Safe Links in Teams",
                  "description": "Safe Links in Teams",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "createdAt": "2023-03-19T11:31:25.663Z",
                  "updatedAt": "2023-03-19T11:31:25.663Z",
                  "__v": 0,
                  "isActive": true
              },
              {
                  "_id": "6416f2bc01f5bc0a35b03f93",
                  "properties": [],
                  "isHighlight": false,
                  "name": "Report Message Add-In",
                  "description": "Report Message Add-In",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "createdAt": "2023-03-19T11:32:12.437Z",
                  "updatedAt": "2023-03-19T11:32:12.437Z",
                  "__v": 0,
                  "isActive": true
              },
              {
                  "_id": "6416f32501f5bc0a35b03f95",
                  "properties": [],
                  "isHighlight": false,
                  "name": "Protection for SharePoint, OneDrive, and Microsoft Teams",
                  "description": "Protection for SharePoint, OneDrive, and Microsoft Teams",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "createdAt": "2023-03-19T11:33:57.136Z",
                  "updatedAt": "2023-03-19T11:33:57.136Z",
                  "__v": 0,
                  "isActive": true
              },
              {
                  "_id": "64170cdb01f5bc0a35b03f97",
                  "properties": [],
                  "isHighlight": false,
                  "name": "Anti-phishing policies",
                  "description": "Anti-phishing policies",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "createdAt": "2023-03-19T13:23:39.903Z",
                  "updatedAt": "2023-03-19T13:23:39.903Z",
                  "__v": 0,
                  "isActive": true
              },
              {
                  "_id": "64170d2901f5bc0a35b03f99",
                  "properties": [],
                  "isHighlight": false,
                  "name": "Real-time reports",
                  "description": "Real-time reports",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "createdAt": "2023-03-19T13:24:57.687Z",
                  "updatedAt": "2023-03-19T13:24:57.687Z",
                  "__v": 0,
                  "isActive": true
              },
              {
                  "_id": "64170d3c01f5bc0a35b03f9b",
                  "properties": [],
                  "isHighlight": false,
                  "name": "Advanced protection for internal mail",
                  "description": "Advanced protection for internal mail",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "createdAt": "2023-03-19T13:25:16.956Z",
                  "updatedAt": "2023-03-19T13:25:16.956Z",
                  "__v": 0,
                  "isActive": true
              },
              {
                  "_id": "641711ed01f5bc0a35b03f9d",
                  "properties": [],
                  "isHighlight": false,
                  "name": "Integration with Microsoft 365 Defender",
                  "description": "Integration with Microsoft 365 Defender",
                  "createdBy": "ADMIN",
                  "updatedBy": "ADMIN",
                  "subCategoryId": "6405e6304f8b923f28430513",
                  "productVariantId": "6413084dbdb764f8d6a252b9",
                  "createdAt": "2023-03-19T13:45:17.538Z",
                  "updatedAt": "2023-03-19T13:45:17.538Z",
                  "__v": 0,
                  "isActive": true
              }
          ]
      }
 ];
        this.product = { products:[...response.products], featureList: response.featureList, productFeatureList: response.productFeatureList, productVariants: response.productVariants, featureListByProductVariants: response.featureListByProductVariants };
        console.log("&&&&& inside", this.product.productVariants.length);
        this.onProductLoad = true;
        this.bannerUrl = this.product.bannerURL;
        this.productImages.push(this.product.products[0].bannerLogo)
        this.productImages.push(this.product.products[0].bannerLogo)
        this.productImages.push(this.product.products[0].bannerLogo)
        this.productImages.push(this.product.products[0].bannerLogo)
        //this.product.productVariants = [123];
        console.log("prVar:",this.product.productVariants)
        this.productVariants=response.productVariants;
        // this.featureCountEvent();
        this.setDataValues( {...response.products});

        /*let featureList = [];
        // if(response.productFeatureList?.length > 0) {
        //   //featureList = response.productFeatureList;
        //   featureList = response.featureList;
        //   this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
        // }
        if(response.featureList?.length > 0) {
          //featureList = response.productFeatureList;
          featureList = response.featureList.splice(0,3);
          //this.productSubCategoryId = response.productFeatureList[0].subCategoryId;
        }
        else if(response.productVariants.length> 0 ){
          featureList = response.productVariants[response.productVariants.length -1].featureList.slice(0,5);
          //this.productSubCategoryId = response.productVariants[0].featureList[0].subCategoryId;
        }
        this.similarProducts = response.productBundles;
        this.product = { ...response.products , featureList : response.featureList, productFeatureList: response.productFeatureList, productVariants: response.productVariants, featureListByProductVariants : response.featureListByProductVariants } ;
        this.onProductLoad = true;*/
      })


    );
  }

  public setDataValues(resp:any): void {
    // this.product.name=resp.product.name;
    // this.productName = resp.product.name;
console.log("response values: ", resp);
  }
  private getSimilerProducts(subCategoryId: String) {
    this.subscriptions.push(
      this.metaDataSvc.fetchAllProductsBySubCategoryIds([subCategoryId]).subscribe(response => {
        this.products = response.products.map((data: any) => {
          return {
            name: data.name,
            solutionLink: data.name,
            imageUrl: 'https://csg1003200209655332.blob.core.windows.net/images/1681727933-Microsofticon.png',
            description: data.description
          }
        })
      })
    );
  }

  viewAllFeature = false;

  constructor(
    private metaDataSvc : MetadataService,
    private route: ActivatedRoute,
    private cartStore : CartStore,
    private metadataStore : MetadataStore,
    private router : Router,
    private authService : MsalService,
    private modalService : NgbModal
  ){}
featureCount=5;

  public ngOnInit() : void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.viewAllFeature=false;
    
    this.getProductDetails(productId);
    console.log(this.featureList);
    // if(this.featureList.length>5 && !this.viewAllFeature){
    //   this.dispFeatureList = [...this.featureList.slice(0,5)];
    //   console.log("dispfeatureList",this.featureList);
    // } else {
    //   this.dispFeatureList = [...this.featureList];
    // }
    // console.log("featureList",this.product);
    // if(this.product.featureList.length>5) {
    //   for(let i=0;i<5;i++) {
    //     this.featureList.push(this.product.featureList[i]);
    //   }
    // }  else {
    //     this.featureList = this.product.featureList;
    // }
    this.featureList = this.product.featureList;
    console.log("featureList",this.dispFeatureList.length);
    //this.getProductDetails2(productId);
  }

  public featureCountEvent(): void {
    
    //  if(this.product.featureList.length>5 && !this.viewAllFeature){
    //   this.featureList = [...this.product.featureList.slice(0,5)];
    //   console.log("dispfeatureList",this.featureList);
    //   this.viewAllFeature = true;
    // } else {
      this.featureList = this.product.featureList;
    // }
  }

  images: any[] = [1,2,3,4];


    position: string = 'left';
   

  public requestQuote (product : ProductsDetails) : void {

    
    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"));

    if(loggedinData.length > 0 ){
      
      var existingItems = this.cartStore.getCartItems();
    
      let queryParams;
      if(product.productVariants.length>0){
        queryParams = {
          productName : product.productVariants[0].name,
          productId : product.productVariants[0]._id,
          quantity : 1,
          price : product.productVariants[0].priceList[0].price,
        };
      }
      this.router.navigate(['/cart'], {queryParams: queryParams});
    }

    else {
      this.viewModal();
    }

    


    




  }

  public viewModal() {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
  }

  public getColor(val){
    if(val){
      return val.toLowerCase();
    }
    else{
      return 'Black'
    }
    
  }

  ngOnDestroy(){
    
  }
}
