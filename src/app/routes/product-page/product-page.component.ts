import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryDetails } from 'src/shared/models/interface/partials/category-details';
import { MetadataService } from 'src/shared/services/metadata.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProductListService } from 'src/shared/services/product-list-page.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPgaeComponent implements OnInit{

  products = [
    {
      name: 'Microsoft Teams',
      solutionLink: 'Lorem Ipsum is simply dummy text',
      imageUrl: 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      name: 'Microsoft Azure',
      solutionLink: 'Lorem Ipsum is simply dummy text',
      imageUrl: 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      name: 'Microsoft Outlook',
      solutionLink: 'Lorem Ipsum is simply dummy text',
      imageUrl: 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      name: 'Microsoft Teams',
      solutionLink: 'Lorem Ipsum is simply dummy text',
      imageUrl: 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      name: 'Microsoft Azure',
      solutionLink: 'Lorem Ipsum is simply dummy text',
      imageUrl: 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      name: 'Microsoft Outlook',
      solutionLink: 'Lorem Ipsum is simply dummy text',
      imageUrl: 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
  ]
  staticProductimageUrl = 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg';
  selectedItems : Array<any> = [];
  selectedBrandItems : Array<any> = [];
  dropdownSettings : IDropdownSettings = {};
  category : String;
  subCategory : String;
  allCategories : Array<any> = [];
  
  constructor(
    private metaDataSvc : MetadataService,
    private activeRoute: ActivatedRoute,
    private productListService : ProductListService
  ){}

  private subscriptions: Subscription[] = [];
  public subCategories : Array<any> = [];
  public brands : Array<any> = [];
  public brand : String;
  

  private getCategories(categoryId: String): void {
    this.subscriptions.push(
       this.metaDataSvc.fetchSubCategories(categoryId).subscribe( response => {
        this.subCategories = response.subCategories;
        this.selectedItems = this.subCategories.filter((data) => {
          if(data.categoryId == categoryId) return data;
        });
      })
    );
  }

  private getBrands(): void {
    this.subscriptions.push(
       this.metaDataSvc.fetchOEM().subscribe( response => {
        this.brands = response.oems;
        this.selectedBrandItems = [];
       // this.getProductsByBrandIds(this.brand);
        this.getProductsByBrandIds([this.brand]);
      })
    );
  }


  private getSubCategories(categoryId: String): void {
    this.subscriptions.push(
       this.metaDataSvc.fetchSubCategories(categoryId).subscribe( response => {
        this.subCategories = response.subCategories;
        console.log("****** Got here ", this.subCategories);
        this.selectedItems = this.subCategories.filter((data) => {
          if(data._id == categoryId) return data;
        })
      })
    );
  }

  private getProducts(): void {
    this.subscriptions.push(
       this.metaDataSvc.fetchProducts().subscribe( response => {
        this.products = response.products.map((data: any )=> {
          return { 
            name: data.name , 
            description: data.description ,
            imageUrl: this.staticProductimageUrl ,
            solutionLink: data.description,
            _id: data._id
          }
         })
      })
    );
  }

  private getProductsBySubcategoryIds(subCategoryIds: Array<string>): void {
    this.subscriptions.push(
       this.metaDataSvc.fetchAllProductsBySubCategoryIds(subCategoryIds).subscribe(response => {
         this.products = response.products.map((data: any )=> {
          return { 
            name: data.name , 
            description: data.description ,
            imageUrl: this.staticProductimageUrl ,
            solutionLink: data.description,
            _id: data._id
          }
         })
      })
    );
  }

  private getProductsByBrandIds(brandIds: Array<String>): void {
    this.subscriptions.push(
       this.metaDataSvc.fetchAllProductsByBrandIds(brandIds).subscribe(response => {
        this.selectedBrandItems = this.brands.filter((data)=> {
          console.log("KJNKJNKBB",brandIds,data._id);
          if(brandIds.includes(data._id)) return data;
        })
        console.log("+++brandIds++++++++",this.brands,this.selectedBrandItems);
         this.products = response.products.map((data: any )=> {
          return { 
            name: data.name , 
            description: data.description ,
            imageUrl: this.staticProductimageUrl ,
            solutionLink: data.description,
            _id: data._id
          }
         })
      })
    );
  }


  public ngOnInit() : void {
      
   // this.getBrands();
      
      this.activeRoute.paramMap.subscribe(params => {
      this.category = params.get('categoryId') || '63ea6f258e58e64acc7858ad';
      this.subCategory = params.get('subcategoryId');
      this.brand = params.get('brandId');
      if(this.category)
      this.getCategories(this.category);

      if(this.subCategory)
      this.getSubCategories(this.subCategory);

      console.log("****** All brands ", this.brands);
      console.log("****** All Slecetd brands ", this.brands);
      if(this.brand) {
        console.log("****** Came inside ", this.brands);
         this.getProductsByBrandIds([this.brand]);
         
      }
      

    });
    this.productListService.categoryIdSelectionSubject$.subscribe((data) => {
      this.category = data;
      this.getCategories(this.category);
    })
    this.getProducts();
    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }


  onItemSelect(item: any) {
     let selectedItemsIds = this.selectedItems.map((data)=> { return data._id });
     this.getProductsBySubcategoryIds(selectedItemsIds);
  }

  onSelectAll(items: any) {
    this.selectedItems = items;
    let selectedItemsIds = this.selectedItems.map((data)=> { return data._id });
    this.getProductsBySubcategoryIds(selectedItemsIds);
  }

  onItemDeSelect(item: any) {
    let selectedItemsIds = this.selectedItems.map((data)=> { return data._id });
    this.getProductsBySubcategoryIds(selectedItemsIds);
  }

  onBrandSelect(item: any) {
    console.log("******* Called select Brad");
    let selectedBrandItems = this.selectedBrandItems.map((data)=> { return data._id });
    this.getProductsByBrandIds(selectedBrandItems);
 }

 onBrandSelectAll(items: any) {
  console.log("******* Called select Brad ALL");
   this.selectedBrandItems = items;
   let selectedBrandIds = this.selectedBrandItems.map((data)=> { return data._id });
   this.getProductsByBrandIds(selectedBrandIds);
 }

 onIBrandDeSelect(item: any) {
  console.log("******* Called select Brad Deselect");
   let selectedBrandIds = this.selectedBrandItems.map((data)=> { return data._id });
   this.getProductsByBrandIds(selectedBrandIds);
 }
}