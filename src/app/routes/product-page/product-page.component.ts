import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, combineLatest, forkJoin, map } from 'rxjs';
import { CategoryDetails } from 'src/shared/models/interface/partials/category-details';
import { MetadataService } from 'src/shared/services/metadata.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProductListService } from 'src/shared/services/product-list-page.service';
import { CompareProductsStore } from 'src/shared/stores/compare-products.store';
import { CompareProductsModalComponent } from 'src/shared/components/modals/compare-products-modal/compare-products-modal.component';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { DetectScrollStore } from 'src/shared/stores/detect-scroll.store';



@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPgaeComponent implements OnInit, OnChanges , OnDestroy{
[x: string]: any;


  @ViewChild('filterSection') filterSection!: ElementRef;

  //@ViewChild('filterView', { static: false })
  //private filterView: ElementRef<HTMLDivElement>;
  isFilterViewScrolledIntoView: boolean;


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

  public finalProductList = [];

  public checkedListCat = [];
  public checkedListSubCat = [];
  public checkedListBrands = [];

  public allSubCategories = [];

  public allSubCategoriesFlag = false

  public staticProductimageUrl = 'https://csg1003200209655332.blob.core.windows.net/images/1681727933-Microsofticon.png';

  private subscriptions: Subscription[] = [];

  public selectedParams ;
  public selectedParamsVal ;

  public listForCompare : any[] = [];

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

  public floatableFilter : any;
  
  constructor(
    private metaDataSvc : MetadataService,
    private activeRoute: ActivatedRoute,
    private productListService : ProductListService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private metadadataStore : MetadataStore,
    private compareProductsStore : CompareProductsStore,
    private modalService : NgbModal,
    private renderer: Renderer2,
    private scrollDispatcher: ScrollDispatcher, 
    private zone: NgZone,
    private detectScrollStore : DetectScrollStore

  ){
    const navigation = this.router.getCurrentNavigation();

    
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

  @ViewChildren('filterView') elms: QueryList<any>;

  detectedElms = [];


  @ViewChild('testDiv', { static: false })
  private testDiv: ElementRef<HTMLDivElement>;

  
  public isTestDivScrolledIntoView : boolean = false;

  public ngAfterViewInit(): void{

    this.floatableFilter = document.getElementById("floatableFilter");
    this.floatableFilter.style.display = "none";

    this.subscriptions.push(
      this.detectScrollStore.productFiltersScroll$.subscribe(res=>{
    
        if (this.filterSection) {
          const rect = this.filterSection.nativeElement.getBoundingClientRect();
          
          const topShown = rect.top >= 0;
          const bottomShown = rect.bottom <= window.innerHeight;
          
          this.isTestDivScrolledIntoView = topShown && bottomShown;
          if(rect.bottom > 110){
           
            this.floatableFilter.style.display = "none";
          }
          else{
            
            this.floatableFilter.style.display = "block";
          }
          
        }
      })
    )

    

    //this.floatableFilter = document.getElementById("floatableFilter");
    //this.floatableFilter.style.display = "none";

    /*this.scrollDispatcher.scrolled().
    subscribe((cdk: CdkScrollable)  => {
    this.zone.run(() => {
    //Here you can add what to happen when scroll changed
    //I want to display the scroll position for example
      const scrollPosition = cdk.getElementRef().nativeElement.scrollTop;
      console.log(scrollPosition);
    });
    });*/

  }
  

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
    this.selectedListForCompare([]);
    //this.getAllCategories();

    this.setCheckedList();

    this.compareProductsLength$.subscribe();


  }

  public initializeData(){



    this.activeRoute.paramMap.subscribe(params => {
      if(this.categories.length >0 && this.brands.length>0){
        if(params.has('categoryId')){
          this.setAllUnChecked();
          this.selectedParams = 'cat';
          this.selectedParamsVal = params.get('categoryId');
          this.setCategoryChecked(params.get('categoryId'));
          this.getSubCategoriesByID(params.get('categoryId'));
          //this.getAllSubCategoriesByID();
          this.selectAll('cat');
          
  
        }
        else if(params.has('subcategoryId')){
  
          this.selectedParams = 'subCat';
          this.selectedParamsVal = params.get('subcategoryId').split('-')[1];
          this.setAllUnChecked();
          this.setSubCategoryChecked(params.get('subcategoryId'));
          this.selectAll('subCat');
          
          this.selectedSubCategoryItems = [];

          this.selectedSubCategoryItems.push({'_id' : params.get('subcategoryId').split('-')[1]});
          //this.selectedSubCategoryItems.push(params.get('subcategoryId').split('-')[1]);
          this.getFilteredData();
          
  
        }
        else if(params.has('brandId')){
          
          this.selectedParams = 'brand';
          this.selectedParamsVal = params.get('brandId');
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


      if( catArray && catArray.length >0 && brandArray.length > 0){
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


  public viewModal3(queryParams) {
    const modalRef = this.modalService.open(CompareProductsModalComponent, {windowClass: 'compare-products-modal-custom-class' });
    modalRef.componentInstance.request = queryParams;
    // this.modalService.open(modal_id, { windowClass: 'custom-class' });
  }


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

  public getAllSubCategoriesByID(){
    this.categories.forEach(element => {
      this.subscriptions.push(
        this.metaDataSvc.fetchSubCategories(element._id).subscribe( response => {
         this.allSubCategories = [...response.subCategories];
    
       })
     );
     this.allSubCategoriesFlag = true;
    });
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

         
    

         let tempProducts = this.setProductsData(response.products);
         let tempProductVariants = this.setProductVariantsData(response.productVariants);
         let tempProductBundleVariants = this.setProductBundleVariantsData(response.productBundleVariants);
         let tempProductBundles = this.setBundlesData(response.productBundles);



         this.finalProductList = [...tempProducts, ...tempProductVariants, ...tempProductBundleVariants , ...tempProductBundles];

         
         //let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
         let cacheData = JSON.parse(localStorage.getItem('compare_products_list') || '[]');

         
         if(cacheData && cacheData.length>0){
          cacheData.forEach(element => {
      
            let indexToUpdate = this.finalProductList.findIndex(item => item._id === element._id);
              if(indexToUpdate !== -1){
                element['checked'] = true;
                this.finalProductList[indexToUpdate]['checked'] = true;
      
              }
          });
         }

         //let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
         let cacheData2 = [];
         if(cacheData2 && cacheData2.length>0){
          cacheData2.forEach(element => {
      
            let indexToUpdate = this.finalProductList.findIndex(item => item._id === element._id);
              if(indexToUpdate !== -1){
                element['checked'] = true;
                this.finalProductList[indexToUpdate]['checked'] = true;
      
              }
          });
         }
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


  public selectedListForCompare(items){
    this.listForCompare = items;


    let cachedProductsToCompare = JSON.parse(localStorage.getItem('compare_products_list') || '[]');

    //let cacheData: any = [...new Map(cachedProductsToCompare.map(item => [item['_id'], item])).values()];

    let cacheData = cachedProductsToCompare.filter(event => (event.checked))




    let cumulativeList = [];
    
    if(cacheData && cacheData.length>0){
      
      cumulativeList = [...this.listForCompare , ...cacheData];
      
    }
    else{
      
      cumulativeList = this.listForCompare;
    }

    //let uniqueElements = [...new Map(cumulativeList.map(item => [item['_id'], item])).values()];

    let uniqueElements = cumulativeList;
    


    uniqueElements.forEach(element => {
      
      let indexToUpdate = this.finalProductList.findIndex(item => item._id === element._id);
        if(indexToUpdate !== -1){
         
          this.finalProductList[indexToUpdate]['checked'] = true;

        }
        else{
          this.finalProductList.forEach(element => {
            if('checked' in element){
              element.checked = false;
            }
            else{
              element['checked'] = false;
            }
          });
          
        }
    });


  
    

    localStorage.setItem('compare_products_list', JSON.stringify(uniqueElements));
    this.compareProductsStore.setCompareProductsList(uniqueElements);
   
    

  }

  /*public selectedListForCompare(items){
    this.listForCompare = items;

    //let cacheData = this.compareProductsStore.getCompareProductsList();
    let cacheData1 = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    //let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let cacheData2 = [];

    let combinedData = [...cacheData1, ...cacheData2];
    let cacheData = [...new Map(combinedData.map(item => [item['_id'], item])).values()];

    cacheData = cacheData.filter(event => (event.checked))




    let cumulativeList = [];
    
    if(cacheData && cacheData.length>0){
      
      cumulativeList = [...this.listForCompare , ...cacheData];
      //cumulativeList = cumulativeList.filter(element => element._id != item._id);
    }
    else{
      
      cumulativeList = this.listForCompare;
    }

    //let uniqueElements = [...new Set(cumulativeList)];
    //let uniqueElements = cumulativeList.filter((el, i, a) => i === a.indexOf(el));
    let uniqueElements = [...new Map(cumulativeList.map(item => [item['_id'], item])).values()];
    


    uniqueElements.forEach(element => {
      
      let indexToUpdate = this.finalProductList.findIndex(item => item._id === element._id);
        if(indexToUpdate !== -1){
          //element['checked'] = true;
          // console.log("***** ++++++ ,",this.finalProductList[indexToUpdate]);
          
          this.finalProductList[indexToUpdate]['checked'] = true;

        }
        else{
          this.finalProductList.forEach(element => {
            if('checked' in element){
              element.checked = false;
            }
            else{
              element['checked'] = false;
            }
          });
          //this.finalProductList[indexToUpdate]['checked'] = false;
        }
    });


    

    localStorage.setItem('product_list_to_compare', JSON.stringify(uniqueElements));
    //localStorage.setItem('product_list_to_compare2', JSON.stringify(uniqueElements));
    this.compareProductsStore.setCompareProductsList(uniqueElements);
    this.compareProductsStore.setCompareProductsList2(uniqueElements);
    //localStorage.removeItem('product_list_to_compare');
    

  }*/

  /* compare products length display */
  public  prdLength = 0;
  public compareProductsListLength = 0;

  public compareProductsLength$ = this.compareProductsStore.compareProductsList$
    .pipe(
      map(data => {

        let cachedData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
        //let cachedData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
        let cachedData2 = [];
        let combinedData = [...cachedData, ...cachedData2];
        let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];
        this.productListToCompare = uniqueElements;
        this.prdLength = this.productListToCompare.length;



        let cachedProductsToCompare = JSON.parse(localStorage.getItem('compare_products_list') || '[]');
        this.compareProductsListLength = cachedProductsToCompare.length;

       
        if(data){
          return data;
        }
        else{
          return data;
        }
        
      }
      )
    )




  /**
   * Set Products Data
   */

  public setProductsData(data){

    if(data && data.length>0){
      data.forEach(element => {
          element.productType = 'products';
          element.bannerLogo = (element.bannerLogo && element.bannerLogo !== null) ? element.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['navigationId'] = element._id;
      });
    }

    return data;
  }

  /**
   * Set Product Variants Data
   */

  public setProductVariantsData(data){

    if(data && data.length>0){
      data.forEach(element => {
          element.productType = 'productVariants';
          element.bannerLogo = (element.product && element.product.bannerLogo) ? element.product.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.product && element.product.subCategories && element.product.subCategories.length > 0) ? element.product.subCategories[0].name : "";
          element['navigationId'] = element.productId;
      });
    }

    return data;
  }

  /**
   * Set Product Bundle Variants Data
   */

  public setProductBundleVariantsData(data){

    if(data && data.length>0){
      data.forEach(element => {
          element.productType = 'productBundleVariants';
          element.bannerLogo = (element.bannerLogo && element.bannerLogo !== null) ? element.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['navigationId'] = element.productsFamilyId;
      });
    }

    return data;
  }

  /**
   * Set Product Bundles Data
   */

  public setBundlesData(data){

    if(data && data.length>0){
      data.forEach(element => {
          element.productType = 'productBundles';
          element.bannerLogo = (element.bannerLogo && element.bannerLogo !== null) ? element.bannerLogo : 'https://csg1003200209655332.blob.core.windows.net/images/1685441484-MicrosoftLogo_300X300.png';
          element.description = element.description;
          element['solutionCategory'] = (element.subcategories && element.subcategories.length > 0)? element.subcategories[0].name : ''
          element['navigationId'] = element._id;
      });
    }

    return data;
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


/*public setCheckedList(){

  this.subscriptions.push(
    this.compareProductsStore.productsCheckedList$.subscribe(res=>{
      // console.log("**&&&&()()()( Got Checked ",this.productList);


      let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
      //let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
      let cacheData2 = [];
      let combinedData = [...cacheData, ...cacheData2];
      let uniqueElements = [...new Map(combinedData.map(item => [item['_id'], item])).values()];


      this.productList.forEach(element => {
        var index = uniqueElements.findIndex(el => el._id === element._id);
        if(index >=0){
          if(element.checked){
            element.checked = true;
          }
          else{
            element['checked'] = true;
          }
        }
        else{
          if(element.checked){
            element.checked = false;
          }
          else{
            element['checked'] = false;
          }
        }
      });
    })
  )
}*/

public setCheckedList(){

  this.subscriptions.push(
    this.compareProductsStore.productsCheckedList$.subscribe(res=>{
      

      let cachedProductsToCompare = JSON.parse(localStorage.getItem('compare_products_list') || '[]');

      this.productList.forEach(element => {
        var index = cachedProductsToCompare.findIndex(el => el._id === element._id);
        if(index >=0){
          if(element.checked){
            element.checked = true;
          }
          else{
            element['checked'] = true;
          }
        }
        else{
          if(element.checked){
            element.checked = false;
          }
          else{
            element['checked'] = false;
          }
        }
      });
    })
  )
}


public scrollToFilters(){
  this.filterSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
}


/*@ViewChild('testDiv', { static: false })
private testDiv: ElementRef<HTMLDivElement>;
isTestDivScrolledIntoView: boolean;

@HostListener('window:scroll', ['$event'])
isScrolledIntoView() {
  console.log("+++++_______ ", this.testDiv);
  if (this.testDiv) {
    const rect = this.testDiv.nativeElement.getBoundingClientRect();
    const topShown = rect.top >= 0;
    const bottomShown = rect.bottom <= window.innerHeight;
    this.isTestDivScrolledIntoView = topShown && bottomShown;
    console.log("+++++_______ ", this.isTestDivScrolledIntoView);
  }
}*/









}




