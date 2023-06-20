import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, combineLatest, forkJoin, map } from 'rxjs';
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


  public dropdownSettings : IDropdownSettings = {};
  public subCategoryDropdownSettings : IDropdownSettings = {};

  
  public categories : any[] = [];
  public subCategories : any[] = [];
  public brands : any[] = [];

  public defaultSelectedItem : any[] = [];

  public selectedCategoryItems : any[] = [];
  public selectedSubCategoryItems : any[] = [];
  public selectedBrandItems : any[] = [];

  public productList : any[] = [];
  public productBundlesList : any[] = [];
  public products = [];
  public productBundles = [];

  public checkedListCat = [];
  public checkedListSubCat = [];
  public checkedListBrands = [];

  public staticProductimageUrl = 'https://csg1003200209655332.blob.core.windows.net/images/1681727933-Microsofticon.png';

  private subscriptions: Subscription[] = [];

  // public products = [];
  // public productBundles = [];
  // public selectedCat = [];
  // staticProductimageUrl = 'https://csg1003200209655332.blob.core.windows.net/images/1681727933-Microsofticon.png';
  // selectedItems : Array<any> = [];
  // selectedBrandItems : Array<any> = [];
  // selectedCategoryItems : Array<any> = [];
  // selectedSubCategoryItems : Array<any> = [];
  // dropdownSettings : IDropdownSettings = {};
  // subCategoryDropdownSettings : IDropdownSettings = {};
  // category : String;
  // subCategory : String;
  // allCategories : Array<any> = [];
  // filterQuery : Object = { subCategoryIds : [], brandIds : [] }
  // loadAllCategories = false;
  // private subscriptions: Subscription[] = [];
  // public categories : Array<any> = [];
  // public subCategories : Array<any> = [];
  // public brands : Array<any> = [];
  // public brand : String;
  // public productList : any[] = [];

  // public initialProducts : any[] = [];

  public selectedTab = 'products';

  public tabIndex = 0;


  public filters : any;
  
  constructor(
    private metaDataSvc : MetadataService,
    private activeRoute: ActivatedRoute,
    private productListService : ProductListService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private metadadataStore : MetadataStore
  ){
    const navigation = this.router.getCurrentNavigation();
    // const state = navigation.extras.state as { data: Object };
    // const data = state;
  }

  public getAllCategories$ = this.metadadataStore.categoryDetails$
  .pipe(
    map(data => {
      if(data){
        
        this.categories = data;
        
        data.forEach(element => {
          this.subCategories = [...element.subCategories];
        });
        return data;

      }
      else{
        
        return data;
      }
    }
    )
  )

  public getAllOEM$ = this.metadadataStore.oemDetails$
  .pipe(
    map(data => {
      if(data){
        this.brands = data;
        return data;
      }
      else{
        
        return data;
      }
    }
    )
  )

  public ngOnInit() : void { 


    
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

    this.setFilters();
    this.loadDropdownValues();
    //this.getAllCategories();





  }

  public initializeData(){



    this.activeRoute.paramMap.subscribe(params => {
      if(this.categories.length >0 && this.brands.length>0){
        if(params.has('categoryId')){
          this.setAllUnChecked();
          
          this.setCategoryChecked(params.get('categoryId'));
          this.getSubCategoriesByID(params.get('categoryId'));
          this.selectAll('cat');
          console.log("((((( val atlast ", this.products);
  
        }
        else if(params.has('subcategoryId')){
  
          
          this.setAllUnChecked();
          this.setSubCategoryChecked(params.get('subcategoryId'));
          this.selectAll('subCat');
          
          this.selectedSubCategoryItems = [];

          this.selectedSubCategoryItems.push({'_id' : params.get('subcategoryId').split('-')[1]});
          //this.selectedSubCategoryItems.push(params.get('subcategoryId').split('-')[1]);
          this.getFilteredData();
          
  
        }
        else if(params.has('brandId')){
          
          this.setAllUnChecked();
          let brand = params.get('brandId');
          this.setBrandChecked(brand);
          this.selectAll('brands');
          
          this.selectedBrandItems = this.brands.filter((data) => {
            if(data._id == brand) return data;
          })
          this.getFilteredData();

          
  
        }
      }
      
    })
  }


  public loadDropdownValues() : void {
    //this.subscriptions.push(this.getAllCategories$.subscribe());
    //this.subscriptions.push(this.getAllOEM$.subscribe());


    

    combineLatest([
      this.getAllCategories$,
      this.getAllOEM$
    ]).subscribe(([catArray, brandArray]) => {


      if(catArray.length >0 && brandArray.length > 0){
        this.initializeData();
      }
    });

  }

  // private getAllCategories(): void {
  //   this.subscriptions.push(
  //      this.metaDataSvc.fetchCategory().subscribe( response => {
  //        this.categories = response.categorys;
         

  //       //  this.categories.forEach(element => {
  //       //     element['checked'] = true;
  //       //  });
  //       
  //       //  this.getSubCategories(this.categories[0]._id);
  //     })
  //   );
  // }


  public getSubCategoriesByID(categoryID){
    this.subscriptions.push(
      this.metaDataSvc.fetchSubCategories(categoryID).subscribe( response => {
       this.subCategories = response.subCategories;
       this.selectedSubCategoryItems = this.subCategories;
       //this.setAllChecked(this.subCategories);
       this.getFilteredData();
     })
   );
  }


  public getFilteredData(){
    this.filters.brandIds = this.selectedBrandItems.length > 0 ? this.selectedBrandItems.map((data) => {return data._id }) : []
    this.filters.subCategoryIds = this.selectedSubCategoryItems.length > 0 ? this.selectedSubCategoryItems.map((data) => {
      
      return data._id 
    }) : []

    
    this.getProductsByFilter(this.filters.subCategoryIds,this.filters.brandIds);
  }

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
         this.productBundlesList = response.productBundles;
         this.productBundles = response.productBundles;
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

  public setAllChecked(items) :void {
      items.forEach(element => {
        element['checked'] = true;
      });
  }
  public setAllUnChecked() :void {

    this.categories.forEach(element => {
      element['checked'] = false;
    });
    this.subCategories.forEach(element => {
      element['checked'] = false;
    });
    this.brands.forEach(element => {
      element['checked'] = false;
    });
  }


  public selectAll(val){

    switch (val) {
      case 'cat':
          
          this.checkedListSubCat = this.subCategories;
          this.checkedListBrands = this.brands;
          console.log("((((((((( +++++ Sub Cat ", this.checkedListSubCat);
        return;
      case 'subCat':
          this.checkedListCat = this.categories;
          this.checkedListBrands = this.brands;
        return;
      case 'brands':
          this.checkedListCat = this.categories;
          this.checkedListSubCat = this.subCategories;
        return;

      default:
        return null;
    }
  }

  public setCategoryChecked(catId) : void {

    this.checkedListCat = this.categories.filter(item => item._id === catId);
    let indexToUpdate = this.categories.findIndex(item => item._id === catId);
    if(indexToUpdate !== -1){
      this.categories[indexToUpdate]['checked'] = true;
    }
    
    
  }

  public setSubCategoryChecked(subCatId) : void {
    this.checkedListSubCat = this.categories.filter(item => item._id === subCatId.split('-')[1]);
    let indexToUpdate = this.subCategories.findIndex(item => item._id === subCatId.split('-')[1]);
    if(indexToUpdate !== -1){
      this.subCategories[indexToUpdate]['checked'] = true;
    }
  }

  public setBrandChecked(brandId) : void {
    let indexToUpdate = this.brands.findIndex(item => item._id === brandId);
    if(indexToUpdate !== -1){
      this.brands[indexToUpdate]['checked'] = true;
    }
  }


  public setFilters(){
    this.filters = {
      brandIds : [],
      subCategoryIds : []
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    

  }



  public selecteCategories(item:any){
    

    this.selectedCategoryItems = item;

    this.selectedSubCategoryItems = [];
    item.forEach(element => {
        this.selectedSubCategoryItems = [...this.selectedSubCategoryItems, ...element.subCategories];
    });

    //this.subCategories = this.selectedSubCategoryItems;
   
    
    this.getFilteredData();

    
  }

  public selectedSubCategories(item:any){
    
    
    this.selectedSubCategoryItems = item;
    
    
    this.getFilteredData();

    
  }

  public selectedBrands(item:any){
    
   
    this.selectedBrandItems = item;
    this.getFilteredData();
  }


  public changeTab(event){
    this.tabIndex = event.index;
    if(event.index === 0){
      this.selectedTab = 'products';
    }
    else{
      this.selectedTab = 'productBundles';
    }
  }

  public shareIndividualCheckedList(item:{}){
  }


  ngOnDestroy(): void {
    
  }




public tabChange(productTabSection: any){
 
  this.tabIndex = productTabSection;
  if(productTabSection === 'products'){
    this.selectedTab = 'products';
  }
  else{
    this.selectedTab = 'productBundles';
  }
}



}