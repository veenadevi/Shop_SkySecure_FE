import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
export class ProductPgaeComponent implements OnInit, OnChanges , OnDestroy{

  public products = []
  public productBundles = [];
  public selectedCat = [];
  staticProductimageUrl = 'https://csg1003200209655332.blob.core.windows.net/images/1681727933-Microsofticon.png';
  selectedItems : Array<any> = [];
  selectedBrandItems : Array<any> = [];
  selectedCategoryItems : Array<any> = [];
  selectedSubCategoryItems : Array<any> = [];
  dropdownSettings : IDropdownSettings = {};
  subCategoryDropdownSettings : IDropdownSettings = {};
  category : String;
  subCategory : String;
  allCategories : Array<any> = [];
  filterQuery : Object = { subCategoryIds : [], brandIds : [] }
  loadAllCategories = false;
  private subscriptions: Subscription[] = [];
  public categories : Array<any> = [];
  public subCategories : Array<any> = [];
  public brands : Array<any> = [];
  public brand : String;
  public productList : any[] = [];

  public initialProducts : any[] = [];

  public selectedTab = 'products';

  public tabIndex = 0;
  
  constructor(
    private metaDataSvc : MetadataService,
    private activeRoute: ActivatedRoute,
    private productListService : ProductListService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){
    const navigation = this.router.getCurrentNavigation();
    // const state = navigation.extras.state as { data: Object };
    // const data = state;
  }

  private getCategories(categoryId: String): void {
    // this.subscriptions.push(
    //    this.metaDataSvc.fetchSubCategories(categoryId).subscribe( response => {
    //     this.subCategories = response.subCategories;
    //     this.selectedItems = this.subCategories.filter((data) => {
    //       if(data.categoryId == categoryId) return data;
    //     });
    //     let selectedItemsIds = this.selectedItems.map((data)=> { return data._id });
    //     if(selectedItemsIds)
    //     this.getProductsBySubcategoryIds(selectedItemsIds);
    //   })
    // );
    // this.selectedCategoryItems = this.categories.filter((data) => {
    //   if(data._id == categoryId) return data;
    // })
    // console.log("+++selectedCategoryItems++++NEW",this.selectedCategoryItems);

  }

  private getAllCategories(): void {
    this.subscriptions.push(
       this.metaDataSvc.fetchCategory().subscribe( response => {
         this.categories = response.categorys;
         this.selectedCategoryItems = this.categories.filter((data) => {
          if(data._id == this.category) return data;
        })
      })
    );
  }

  private getAllSubCategories(): void {
    this.metaDataSvc.fetchCategory().subscribe(response => {
      this.categories = response.categorys;
      this.categories.forEach(data => {
        this.subCategories = [...this.subCategories, ...data.subCategories];
        this.selectedSubCategoryItems = [];
        this.cdr.detectChanges();
      });
      this.getFilterQuery()
    })
  }

  private getBrands(): void {
    this.subscriptions.push(
       this.metaDataSvc.fetchOEM().subscribe( response => {
        this.brands = response.oems;
        if(this.brand) {
          this.selectedBrandItems =  this.brands.filter(data => {
            if(data._id == this.brand) return data;
          })
        }
        else 
        this.selectedBrandItems = [];
      })
    );
  }


  // private getSubCategories(categoryId: String): void {
  //   this.subscriptions.push(
  //      this.metaDataSvc.fetchSubCategories(categoryId).subscribe( response => {
  //       this.subCategories = response.subCategories;
  //       console.log("****** Got here ", this.subCategories);
  //       this.selectedItems = this.subCategories.filter((data) => {
  //         if(data._id == categoryId) return data;
  //       })
  //       let selectedItemsIds = this.selectedItems.map((data)=> { return data._id });
  //       if(selectedItemsIds)
  //       this.getProductsBySubcategoryIds(selectedItemsIds);
  //     })
  //   );
  // }

  private getSubCategoriesByDefault(categoryId: String, subcategoryId = null): void {
    this.subscriptions.push(
       this.metaDataSvc.fetchSubCategories(categoryId).subscribe( response => {
        this.subCategories = response.subCategories;
        if(subcategoryId == null)
        this.selectedSubCategoryItems = this.subCategories;
        else {
          this.selectedSubCategoryItems = this.subCategories.filter((data) => { return data._id == subcategoryId});
        }
        this.getFilterQuery();
      })
      
    );
  }


  // private getProducts(): void {
  //   this.subscriptions.push(
  //      this.metaDataSvc.fetchProducts().subscribe( response => {
  //       this.products = response.products.map((data: any )=> {
  //         return { 
  //           name: data.name , 
  //           description: data.description ,
  //           imageUrl: this.staticProductimageUrl ,
  //           solutionLink: data.description,
  //           _id: data._id
  //         }
  //        })
  //     })
  //   );
  // }

  // private getProductsBySubcategoryIds(subCategoryIds: Array<string>): void {
  //   this.subscriptions.push(
  //      this.metaDataSvc.fetchAllProductsBySubCategoryIds(subCategoryIds).subscribe(response => {
  //       console.log("+++++++++++",response.products)
  //        this.products = response.products.map((data: any )=> {
  //         return { 
  //           name: data.name , 
  //           description: data.description ,
  //           imageUrl: this.staticProductimageUrl ,
  //           solutionLink: data.description,
  //           _id: data._id
  //         }
  //        })
  //        console.log("+++++++++products+++++++++",this.products);
  //     })
  //   );
  // }

  // private getProductsByBrandIds(brandIds: Array<String>): void {
  //   this.subscriptions.push(
  //      this.metaDataSvc.fetchAllProductsByBrandIds(brandIds).subscribe(response => {
  //       this.selectedBrandItems = this.brands.filter((data)=> {
  //         console.log("KJNKJNKBB",brandIds,data._id);
  //         if(brandIds.includes(data._id)) return data;
  //       })
  //       console.log("+++brandIds++++++++",this.brands,this.selectedBrandItems);
  //        this.products = response.products.map((data: any )=> {
  //         return { 
  //           name: data.name , 
  //           description: data.description ,
  //           imageUrl: this.staticProductimageUrl ,
  //           solutionLink: data.description,
  //           _id: data._id
  //         }
  //        })
  //     })
  //   );
  // }

   private getProductsByFilter(subCategoryIds, brandIds): void {
    this.subscriptions.push(
       this.metaDataSvc.fetchProductsByFilters({subCategoryIds,brandIds}).subscribe(response => {
        this.productList = response.products;
         this.products = response.products.map((data: any )=> {
          return { 
            name: data.name , 
            description: data.description ,
            imageUrl: data.imageURL || this.staticProductimageUrl ,
            solutionLink: data.description,
            _id: data._id
          }
         })

         this.productBundles = [];
         /*this.productBundles = response.productBundles.map((data: any )=> {
          return { 
            name: data.name , 
            description: data.description ,
            imageUrl: data.imageURL || this.staticProductimageUrl ,
            solutionLink: data.description,
            _id: data._id
          }
         })*/

      })
    );
  }

  private getFilterQuery() {
    this.filterQuery['subCategoryIds'] = this.selectedSubCategoryItems.length > 0 ? this.selectedSubCategoryItems.map((data) => {return data._id }) : []
    this.filterQuery['brandIds'] = this.selectedBrandItems.length > 0 ? this.selectedBrandItems.map((data) => {return data._id }) : []

    this.getProductsByFilter(this.filterQuery['subCategoryIds'], this.filterQuery['brandIds']);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    
  }
  public ngOnInit() : void { 
      this.getAllCategories();
      this.dropdownSettings = {
        singleSelection: false,
        idField: '_id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 0,
        allowSearchFilter: true
      };
  
      this.subCategoryDropdownSettings = {
        singleSelection: false,
        idField: '_id',
        textField: 'name', 
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 0,
        allowSearchFilter: true
      }
      this.activeRoute.paramMap.subscribe(params => {
      this.category =  params.get('categoryId');
      if(this.category) {
        this.getSubCategoriesByDefault(this.category);
      }
      this.subCategory = params.get('subcategoryId');
      if(this.subCategory) {
        this.category = this.subCategory.split('-')[0];
        this.subCategory = this.subCategory.split('-')[1];
        this.getSubCategoriesByDefault(this.category,this.subCategory);
        this.selectedSubCategoryItems = this.subCategories.filter((data) => {
          if(data._id == this.subCategory) return data;
        })
      }
      this.brand = params.get('brandId');
      this.getBrands();
      if(this.brand) {

        this.getSubCategoriesByCategoryIds();
        this.getAllSubCategories()
        this.selectedBrandItems = this.brands.filter((data) => {
          if(data._id == this.brand) return data;
        })
        this.getFilterQuery();
      }
    });

    this.productListService.categoryIdSelectionSubject$.subscribe((categoryId) => {
      this.category = categoryId;
      this.selectedCategoryItems = this.categories.filter((data) => {
        if(data._id == categoryId) return data;
      })
      this.getFilterQuery();
    })

  this.productListService.subCategoryIdSelectionSubject$.subscribe((data:any) => {
      this.category = data.categoryId;
      this.getAllCategories();
      this.selectedSubCategoryItems = this.subCategories.filter((data) => {
        if(data._id == this.category) return data;
      })
      this.getFilterQuery();
    })

    this.productListService.brandIdSelectionSubject$.subscribe((data:any) => {
      this.brand = data;
      this.getBrands();
      this.selectedBrandItems = this.brands.filter((data) => {
        if(data._id == this.brand) return data;
      })
      this.getFilterQuery();
    })

    this.selectedItems = [];

    
    this.getSubCategoriesByCategoryIds();

    this.initialProducts = [...this.selectedCategoryItems, ...this.selectedSubCategoryItems, ...this.selectedBrandItems];
  }

  private getSubCategoriesByCategoryIds(): void {
    let categoryIds = this.selectedCategoryItems.map((data) => { return data._id });
    if(categoryIds.length == 0) {
      this.selectedSubCategoryItems = [];
      this.categories.forEach((data) => {
          this.subCategories = [...this.subCategories,...data.subCategories];
      })
    }
    else {
      this.selectedSubCategoryItems = [];
      this.subCategories = [];
      this.categories.forEach(data => {
        if(categoryIds.includes(data._id)) {
          this.subCategories = [...this.subCategories, ...data.subCategories];
          this.selectedSubCategoryItems = [...this.selectedSubCategoryItems, ...data.subCategories];
          this.cdr.detectChanges();
        }
    });
    this.getFilterQuery();
  }
  }


  onCategoryItemSelect(item: any) {
     this.selectedCategoryItems.push(item);
     this.getSubCategoriesByCategoryIds();
     this.getFilterQuery();
  }

  onCategorySelectAll(items: any) {
    this.selectedCategoryItems = items;
    this.getFilterQuery();
  }

  onCategoryItemDeSelect(item: any) {
    this.selectedCategoryItems = this.selectedCategoryItems.filter((data) => {
        if(data._id != item._id) return data;
    })
    this.getSubCategoriesByCategoryIds();
    this.getFilterQuery();
  }

  onSubCategoryItemSelect(item: any) {
    this.getFilterQuery();
 }

 onSubCategorySelectAll(items: any) {
   this.selectedSubCategoryItems = items;
   this.getFilterQuery();
 }

 onSubCategoryItemDeSelect(item: any) {
   this.getFilterQuery();
 }

 onSubCategoryDeSelectAll(items: any) {
  this.selectedSubCategoryItems = [];
  this.getFilterQuery();
}

onCategoryDeSelectAll(items: any) {
  this.selectedCategoryItems = [];
  this.getFilterQuery();
}

  onBrandSelect(item: any) {
    this.getFilterQuery();
 }

 onBrandSelectAll(items: any) {
   this.selectedBrandItems = items;
   this.getFilterQuery();
 }

 onBrandDeSelect(item: any) {
  this.getFilterQuery();
 }

 onBrandDeSelectAll(item: any) {
  this.selectedBrandItems = [];
  this.getFilterQuery();
 }



 public selecteCategories(item:any){
    
    this.selectedCategoryItems = item;
    this.getFilterQuery();
    //console.log("++++++++ All",this.selectedBrandItems);
  }

public selectedSubCategories(item:any){
    
    this.selectedSubCategoryItems = item;
    this.getFilterQuery();
    //console.log("++++++++ All",this.selectedBrandItems);
  }

  public selectedBrands(item:any){
    
    this.selectedBrandItems = item;
    this.getFilterQuery();
    //console.log("++++++++ All",this.selectedBrandItems);
  }
  public shareIndividualCheckedList(item:{}){
    //console.log("++++++++ Individual",item);
  }


  public tabClick(val){

    this.selectedTab = val;

    if(val === 'products'){
      //this.products = this.productList;
    }
    else if(val === 'productBundles'){
      //this.products = this.productBundles;
    }
  }

  public changeTab(event){
    console.log(event.index)
    this.tabIndex = event.index;
    if(event.index === 0){
      this.selectedTab = 'products';
    }
    else{
      this.selectedTab = 'productBundles';
    }
  }

 ngOnDestroy(): void {
  this.subscriptions.forEach((data) => {
    data.unsubscribe();
  })
}

}