import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'searchable-sub-category-filter',
  templateUrl: './searchable-sub-category-filter.component.html',
  styleUrls: ['./searchable-sub-category-filter.component.css']
})
export class SearchableSubCategoryFilterComponent {

  @Input('type')
  public type : any;


  // @Input('list')
  // public list : any[];

  @Input() set list(value: any[]) {
    
    
  }

  // @Input() set selectedSubCat(value: any[]) {
    
  //   console.log("++++++++++++++ &&&&&& in Sub Set ", value);
  // }

  @Input() set catForFilter(value: any[]) {
    console.log("++++++++++++++ &&&&&& in Sub Set ", value);
    this.setSubCatData(value);
  }

  @Input('selectedCat')
  public selectedCat : any[];

  @Input('selectedSubCat')
  public selectedSubCat : any[];

  @Input('selectedBrand')
  public selectedBrand : any[];

  @Output() selectedList = new EventEmitter();

  public selectedTypeText = '';


  selected: any[] = [];
  @ViewChild("shoes") shoes: any = [];

  typesOfShoes: any[] = ["Boots", "Clogs", "Loafers", "Moccasins", "Sneakers"];
  shoesSet = new Map();

  filteredOptions: any[] = [];
  constructor(
    private metaDataStore : MetadataStore
  ) {
    this.typesOfShoes.forEach(item => {
      this.shoesSet.set(item, false);
    });

    
    // this.list.forEach(item => {
    //   this.shoesSet.set(item, false);
    // });
    

    //this.filteredOptions = [...this.typesOfShoes];
    
  }


  public ngOnInit(){

    this.setType();
    this.setSubCatData(this.catForFilter);
    console.log("++++++++++++++ &&&&&& in Sub Cat ", this.selectedSubCat);
    
    //this.initializeData();
  }

  public initializeData(){
    //this.selectedCat = [];
    //this.selectedSubCat = [];
    //this.selectedBrand = [];
    this.list.forEach(item => {
      if(this.selectedCat && this.selectedCat.length>0){
        //this.shoesSet.set(item, true);
        this.selected = [...this.selectedCat]
        
      }
      else if(this.selectedSubCat && this.selectedSubCat.length>0){
        //this.shoesSet.set(item, true);
        this.selected = [...this.selectedSubCat]
      }
      else if(this.selectedBrand && this.selectedBrand.length>0){
        //this.shoesSet.set(item, true);
        this.selected = [...this.selectedBrand]
      }
      else{
        //this.shoesSet.set(item, false);
      }
      this.shoesSet.set(item, false);
    });

    //this.setDefaultChecked();
    this.filteredOptions = [...this.list];

    // if(this.type === 'subCat'){
    //   this.setSubCatData();
    // }
  }

  public setSubCatData(filteredCat){
    console.log("+++++++++++++ Sub Cat Change", filteredCat);
    console.log("+++++++++++++ Sub Cat Length", this.list.length);
    
  }

  

  public setType(){

    switch (this.type) {
      case 'cat':
        this.selectedTypeText = 'Categories';
        return;
      case 'subCat':
        this.selectedTypeText = 'Sub Categories';
        return;
      case 'brand':
        this.selectedTypeText = 'Brands';
        return;
      
      default:
        this.selectedTypeText = '';
        return null;
    }
    
    

  }
  onSearch(searchTerm: string) {
    // this.filteredOptions = this.typesOfShoes.filter(item =>
    //   item.toLowerCase().includes(searchTerm)
    // );
    this.filteredOptions = this.list.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }

  selectionChange(val: any) {
    this.selectedList.emit(val);
    // this.shoesSet.set(
    //   val.option.value,
    //   !this.shoesSet.get(val.option.value)
    // );
  }

}

