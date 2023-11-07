import { Component, Input,SimpleChanges ,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, forkJoin, map } from 'rxjs';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { concatMap } from 'rxjs/operators';
@Component({
  selector: 'custom-bread-crumb',
  templateUrl: './custom-bread-crumb.component.html',
  styleUrls: ['./custom-bread-crumb.component.css']
})
export class CustomBreadCrumbComponent {

    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    @Input('product')
    public product : any;

    @Input('prdType')
    public prdType : any;

    public categoryName : string;
    public subCategoryName : string;
    public oemName : any;

    public catId : any;
    public subCatId : string;
    public oemId : string;

    constructor(
      private metadataStore : MetadataStore,
      private router : Router
    ){}

    public categoryDetails$ = this.metadataStore.categoryDetails$
    .pipe(
      map(data => {
        

        if(data && this.product){
          

          var tempSubCatId = this.getSubCatId(this.prdType, this.product);
        
          const myArrayFiltered = data.filter((el) => {
            return el.subCategories.some((f) => {
              if(f._id === tempSubCatId){
                console.log("this.categoryName",this.categoryName,"this.catId",this.catId)
                this.categoryName = el.name;
                this.catId = el._id;
                this.subCategoryName = f.name;
                this.subCatId = f._id;
              }
            });
          });
          return data;
        }
        else{
          return data;
        }
      }
      )
    )
   
    public oemDetails$ = this.metadataStore.oemDetails$
    .pipe(
      map(data => {
        console.log(" Started oemDetails$ ",data)
        if(data && this.product){

          var tempId;
          if(this.prdType === 'productFamilyVariant'){
            tempId = this.product.subcategories[0].oemId;
            console.log("tthis.prdType ", this.prdType )
          }
          else{
            tempId = this.product.oemId;
            console.log("this.product.oemId ",this.product.oemId )
          }
          var tempOemName;
          var tempOemId;
          var isPresent = data.some(function(el){ 
            
            if(el._id === tempId){
              //this:oemName = el.name;
              tempOemName = el.name;
              tempOemId = el._id;
              return el.name;
            }
            else{
              return ''
            }
            
            
          });

          if(isPresent){
            console.log("tempOemName",tempOemName,"tempOemId",tempOemId)
            this.oemName = tempOemName
            this.oemId = tempOemId;
          }
          
          /*const myArrayFiltered = data.filter((el) => {
            return el.subCategories.some((f) => {
              if(f._id === this.product.subcategories[0]._id){
                console.log("()()()( Inside if", f._id)
                console.log("()()()( Inside if", el);
                this.categoryName = el.name;
                this.subCategoryName = f.name;
              }
            });
          });*/
          return data;
        }
        else{
          return data;
        }
      }
      )
    )


    ngOnInit() {
      // this.categoryDetails$.subscribe(res=>{
      //   console.log("categoryDetails$ ",res)
      // });

      
      // this.oemDetails$.subscribe(res=>{
      //   console.log("oemDetails$",res)
      // });

      this.categoryDetails$
      .pipe(
        concatMap((categoryDetails) => {
          // Process categoryDetails if needed
          console.log("categoryDetails$", categoryDetails);
  
          // Return the oemDetails$ observable to continue the sequence
          return this.oemDetails$;
        })
      )
      .subscribe((oemDetails) => {
        // Process oemDetails
        console.log("oemDetails$", oemDetails);
  
        // Now, both categoryDetails and oemDetails have been processed sequentially.
      });

      this.items = [
          { label: this.categoryName , id : 'cat'}, 
          { label: this.subCategoryName , id : 'subCat'}, 
          { label: this.oemName , id : 'brand'}, 
          { label: this.product.name , id: 'name'}, 
        ];

      this.home = { icon: 'pi pi-home', routerLink: '/' , id : 'home' };
      console.log("items",this.product.name,"",this.home)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('product' in changes || 'prdType' in changes) {
      // The 'product' or 'prdType' input has changed, update the breadcrumb here
      this.updateBreadcrumb();
    }
  }

  private updateBreadcrumb(): void {
    // Update your breadcrumb items based on the new 'product' and 'prdType'
    this.items = [
      { label: this.product.categories[0].name, id: 'cat' },
      { label: this.product.subcategories.name, id: 'subCat' },
      { label: this.oemName, id: 'brand' },
      { label: this.product.name, id: 'name' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/', id: 'home' };
    console.log(" this.product.categories[0].name", this.product.categories[0].name,"this.product.subcategories.name,",this.product.subcategories.name);
  }




  public getSubCatId(type, item){

    var id;
    
    switch (type) {
      case 'product' :
        return (item.subcategories) ? item.subcategories._id : '';
      case 'productVariant' :
        return (item.subcategories) ? item.subcategories._id : '';
      case 'productFamily' :
        return (item.subcategories && item.subcategories.length > 0) ? item.subcategories[0]._id : '';
      case 'productFamilyVariant' :
        return (item.subcategories && item.subcategories.length > 0) ? item.subcategories[0]._id : '';
      default : 
        return null;
    }

  }

  public itemClicked(event){

    switch (event.item.id) {
      case 'cat':
        console.log("this.catId ", this.catId,"" )
          this.router.navigate([`/products/category/${this.catId}`]);
          return;
      case 'subCat':
        console.log("this.catId this.subCatId", this.catId,"", this.subCatId)
          this.router.navigate([`/products/sub-category/${this.catId}-${this.subCatId}`]);
        //this.router.navigate([`/products/sub-category/${category._id}-${subCategory._id}`], { state: { category , subCategory} });
          return;
      case 'brand':
        console.log("this.oemId", this.oemId)
          this.router.navigate([`/products/brand/${this.oemId}`]);
          return;
      default:
        return null;
    }
  }
}
