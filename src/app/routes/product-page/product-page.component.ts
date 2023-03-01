import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryDetails } from 'src/shared/models/interface/partials/category-details';
import { MetadataService } from 'src/shared/services/metadata.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
  dropdownSettings : IDropdownSettings = {};
  
  constructor(
    private metaDataSvc : MetadataService,
    private metadataStore : MetadataStore,
    private router : Router
  ){}

  private subscriptions: Subscription[] = [];
  public subCategories : Array<any> = [];
  

  private getCategories(): void {
    let categoryId = '63ea6ef98e58e64acc785891';
    this.subscriptions.push(
       this.metaDataSvc.fetchSubCategories(categoryId).subscribe( response => {
        this.subCategories = response.subCategories;
      })
    );
  }

  private getProducts(): void {
    let categoryId = '63ea6ef98e58e64acc785891';
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


  public ngOnInit() : void {
    this.getCategories();
    this.getProducts();
    this.selectedItems = [
    ];

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



}