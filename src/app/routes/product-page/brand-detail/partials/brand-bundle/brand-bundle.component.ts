import { Component, Input, OnInit } from '@angular/core';

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

  public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';



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
        element['bgImg'] = element.products.bannerURL ? element.products.bannerURL : '';
    });
    this.products.forEach(element => {
      element['logo'] = element.bannerLogo ? element.bannerLogo : this.alternateLogo;
      element['textClr'] = element.bannerTextColor ? element.bannerTextColor : 'Black';
      element['bgImg'] = element.bannerURL ? element.bannerURL : '';
    });
    this.cardItems = [...this.products , ...this.productVarients];
  }

  public setProductFamilyVarient(){
    
  }

}
