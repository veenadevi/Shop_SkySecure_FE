import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, forkJoin, map } from 'rxjs';
import { MetadataStore } from 'src/shared/stores/metadata.store';

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
        if(data && this.product){

          var tempId;
          if(this.prdType === 'productFamilyVariant'){
            tempId = this.product.subcategories[0].oemId;
          }
          else{
            tempId = this.product.oemId;
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
      this.categoryDetails$.subscribe(res=>{
        
      });

      
      this.oemDetails$.subscribe(res=>{
        
      });

      

      this.items = [
          { label: this.categoryName , id : 'cat'}, 
          { label: this.subCategoryName , id : 'subCat'}, 
          { label: this.oemName , id : 'brand'}, 
          { label: this.product.name , id: 'name'}, 
        ];

      this.home = { icon: 'pi pi-home', routerLink: '/' , id : 'home' };
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
          this.router.navigate([`/products/category/${this.catId}`]);
          return;
      case 'subCat':
          this.router.navigate([`/products/sub-category/${this.catId}-${this.subCatId}`]);
        //this.router.navigate([`/products/sub-category/${category._id}-${subCategory._id}`], { state: { category , subCategory} });
          return;
      case 'brand':
          this.router.navigate([`/products/brand/${this.oemId}`]);
          return;
      default:
        this.router.navigate(['/']);
        return null;
    }
  }
}
