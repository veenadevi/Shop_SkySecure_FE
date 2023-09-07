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


  @Input('list')
  public list : any[];

  @Input('catList')
  public catList : any[];

  @Input('selectedParams')
  public selectedParams : any;

  

  // @Input() set list(value: any[]) {
    
    
  // }

  // @Input() set selectedSubCat(value: any[]) {
    
  //   console.log("++++++++++++++ &&&&&& in Sub Set ", value);
  // }

  @Input() set catForFilter(value: any[]) {
    
    this.selected = [];
    this.setSubCatData(value);
    /*if(this.selectedParams !== 'subCat'){
      this.setSubCatData(value);
    }
    else{
      this.setSubCatDataForSubCatSelection(value);
    }*/
    
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

    
   
    
  }


  public ngOnInit(){

    // console.log("++++++++++++++ &&&&&& in Sub Set ", this.selectedParams);
    if(this.selectedParams === 'subCat'){
      this.setSubCatDataForSubCatSelection();
    }
    this.setType();
    
  }



  public setSubCatData(filteredCat){
    

    filteredCat.forEach(element => {
      this.selected = [...this.selected, ...element.subCategories]
    });

    
    this.selected = this.selected.filter((value, index) => this.selected.indexOf(value) === index);
    
    this.filteredOptions = [...this.selected];

    
    
  }

  public setSubCatDataForSubCatSelection(){
    // console.log("((((((((((((((Sub categories ", this.catList);
    this.filteredOptions = [];
    this.catList.forEach(element => {
      //this.selected = [...this.selected, ...element.subCategories]
      this.filteredOptions = [...this.filteredOptions, ...element.subCategories];
    });

    this.selected = this.selectedSubCat;
    //this.selected = this.selected.filter((value, index) => this.selected.indexOf(value) === index);
    
    
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
    
    this.filteredOptions = this.list.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }

  selectionChange(val: any) {
    this.selectedList.emit(val);
    
    
  }

  clearAll(){
    
    this.selected = [];
    this.selectedList.emit(this.selected);
  }

}

