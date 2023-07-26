import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  @Input('list')
  public list : any[];

  @Input('listCategories')
  public listCategories : any[];

  @Input('listSubCategories')
  public listSubCategories : any[];

  @Input('listBrands')
  public listBrands : any[];

  @Input('selectedParams')
  public selectedParams : any;

  @Input('selectedParamsVal')
  public selectedParamsVal : any;

  public subCategoriesList : any[] = [];

  public catForFilter : any[] = [];

  public selectedCat : any[] = [];
  public selectedSubCat : any[] = [];
  public selectedBrand : any[] = [];

  @Output() selecteCategories = new EventEmitter();
  @Output() selectedSubCategories = new EventEmitter();
  @Output() selectedBrands = new EventEmitter();

  // selectedSubCategories
  // selectedBrands

  public panelOpenState = false;

  ngOnInit(){
    this.initializeSubCategoriesData();
    this.setSelecetdList();
  }

  public initializeSubCategoriesData(){
    // console.log()
    this.listCategories.forEach(element => {
      this.subCategoriesList = [...this.subCategoriesList , ...element.subCategories];
    });
  }

  public setSelecetdList(){

    
    
    switch (this.selectedParams) {
      
      case 'cat':
        this.selectedCat = this.listCategories.filter(event => (event._id === this.selectedParamsVal));
        //this.selectedSubCat = this.selectedCat[0].subCategories;
        return;
      case 'subCat':
        this.selectedSubCat = this.subCategoriesList.filter(event => (event._id === this.selectedParamsVal));
        return;
      case 'brand':
        this.selectedBrand = this.listBrands.filter(event => (event._id === this.selectedParamsVal));
        return;
      
      default:
        return null;
    }

    
  }



  public selectedCategoriesChange(item:any){

    this.selecteCategories.emit(item);
    this.catForFilter = [];
    this.catForFilter = [...this.catForFilter, ...item];
    this.selectedCat = this.catForFilter;
    
    
  }

  public selectedSubCategoriesChange(item:any){
    this.selectedSubCategories.emit(item);
    
  }

  public selectedBrandChange(item:any){
    this.selectedBrands.emit(item);
    
  }



}
