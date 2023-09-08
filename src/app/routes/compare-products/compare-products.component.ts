import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginAlertModalComponent } from 'src/shared/components/login-alert-modal/login-alert-modal.component';
import { MetadataService } from 'src/shared/services/metadata.service';
import { CartStore } from 'src/shared/stores/cart.store';

@Component({
  selector: 'compare-products',
  templateUrl: './compare-products.component.html',
  styleUrls: ['./compare-products.component.css']
})
export class CompareProductsComponent implements OnInit{



  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';
  allProducts: any[] = [];
  public onPageLoad: boolean = true;
  public subscriptions: Subscription[] = [];
  products: any[] = [];
  productVariants: any[] = [];
  productFamilyList: any[] = [];
  productFamilyVariants: any[] = [];
  allProperties = [
    { 'ProductName': 'Product Name' },
    { 'DevelopedBy': 'Developed by' },
    { 'Category': 'Category' },
    { 'Subscription': 'Subscription' },
    { 'EntryLevelPricing': 'Entry level pricing' },
    { 'Features': 'Features' }
  ]

  allSelectedItems = {
    "products": ["6480bdea94c4a49d614093f8", "64898f01cf520500558e7589"],
    "productsVariants": ["641308a7bdb764f8d6a252bb", "641308b1bdb764f8d6a252bd"],
    "productFamily": ["6412ac15bdb764f8d6a252a5", "64142fe6bdb764f8d6a25394"],
    "productFamilyVariants": [ "64733a81fa32e5756e9771ce","647b136922b5a987ed147621","64777c2afd0e9fa399bac9bc"]
  }

  isArray(value: any): value is any[] {
    return Array.isArray(value);
  }

  getKey(obj: any): string {
    return Object.keys(obj)[0];
  }


  constructor(
    private route: ActivatedRoute,
    private metaDataSvc: MetadataService,
    private authService: MsalService,
    private cartStore: CartStore,
    private router: Router,
    private modalService: NgbModal
  ) {


  }
  public ngOnInit(): void {
    let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    //let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let cacheData2 = [];
    let combinedData = [...cacheData, ...cacheData2];
    let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];
    let reqBody = this.setPrdList(uniqueElements);
    
    //this.fetchCompareProductsList(this.allSelectedItems);
    this.fetchCompareProductsList(reqBody);
  }

  public setPrdList(data){
    let tempPrd = [];
    let tempPrdVar = [];
    let tempBundles = [];
    let tempPrdBundleVar = [];

    // console.log("()()()() ", data);

    data.forEach(element => {
      switch (element.type) {
        case 'product':
          tempPrd.push(element._id);
          return;
  
        case 'productVariants':
          tempPrdVar.push(element._id);
          return;
          
        case 'productBundles':
          tempBundles.push(element._id);
          return;
        
        case 'productBundleVariants':
          tempPrdBundleVar.push(element._id);
          return;
  
        default:
          return null;
      }
    });
    let reqBody = {
      "products": tempPrd,
      "productsVariants": tempPrdVar,
      "productFamily": tempBundles,
      "productFamilyVariants": tempPrdBundleVar
    }


    
    return reqBody;
  }

  public fetchCompareProductsList(allSelectedItems: any) {
    // console.log("total itemes---"+allSelectedItems.length)
    this.onPageLoad = false;
    this.subscriptions.push(
      this.metaDataSvc.fetchCompareProductsList(allSelectedItems).subscribe(response => {
        // console.log("fetched product size :"+response.products.length)
        this.products = response.products.map((data: any) => {
        
          //let productData = data.products[0];
          let productData = data.products;
          // console.log("productData  "+productData)
          let properties = {
            'ProductName': productData.name,
            'DevelopedBy': 'Microsoft',
            'Category': productData?.subcategories[0]?.name ? productData?.subcategories[0]?.name : '-',
            'Subscription': productData?.priceList[0]?.priceType ? productData?.priceList[0]?.priceType : '-',
            'EntryLevelPricing': productData?.priceList[0]?.price ? `INR ${productData?.priceList[0].price}` : '-',
            'Features': data.featureList.length > 0 ? data.featureList : 'No Features',
           'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png'
          }
          return { properties};
        })

        this.productVariants = response.productVariants.map((data: any) => {
          let productData = data.products;
          let productVariantData = data.productVariants;
          let properties = {
            'ProductName': productVariantData.name,
            'DevelopedBy': 'Microsoft',
            'Category': productData?.subcategories[0]?.name ? productData?.subcategories[0]?.name : '-',
            'Subscription': productVariantData?.priceList[0]?.priceType ? productVariantData?.priceList[0]?.priceType : '-',
            'EntryLevelPricing': productVariantData?.priceList[0]?.price ? `INR ${productVariantData?.priceList[0].price}` : '-',
            'Features': data.featureList.length > 0 ? data.featureList : 'No Features',
            'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png'
          }
          return { properties };
        })

        this.productFamilyList = response.productFamily.map((data: any) => {
          let productData = data.productFamily;
          let properties = {
            'ProductName': productData.name,
            'DevelopedBy': 'Microsoft',
            'Category': productData?.subcategories[0]?.name ? productData?.subcategories[0]?.name : '-',
            'Subscription': productData?.priceList[0]?.priceType ? productData?.priceList[0]?.priceType : '-',
            'EntryLevelPricing': productData?.priceList[0]?.price ? `INR ${productData?.priceList[0].price}` : '-',
            'Features': data.productFamilyFeatures.length > 0 ? data.productFamilyFeatures : 'No Features',
            'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png'
          }
          return { properties};
        })

        this.productFamilyVariants = response.productFamilyVariants.map((data: any) => {
          let productData = data.productFamily;
          let productVariantData = data.productFamilyVariant;
          let properties = {
            'ProductName': productVariantData.name,
            'DevelopedBy': 'Microsoft',
            'Category': productVariantData?.subcategories[0]?.name ? productVariantData?.subcategories[0]?.name : '-',
            'Subscription': productVariantData?.priceList[0]?.priceType ? productVariantData?.priceList[0]?.priceType : '-',
            'EntryLevelPricing': productVariantData?.priceList[0]?.price ? `INR ${productVariantData?.priceList[0].price}` : '-',
            'Features': data.productFamilyVariantFeatures.length > 0 ? data.productFamilyVariantFeatures : 'No Features',
            'bannerLogo' : (productData.bannerLogo && productData.bannerLogo !== null) ? productData.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png'
          }
          return { properties};
        })
        // console.log("set compare product list "+this.products.length)

        this.allProducts = this.products.concat(this.productVariants,this.productFamilyList,this.productFamilyVariants);
        
        
        this.allProducts = this.allProducts.slice(0,4);
      })
    );
  }

   
}

  
