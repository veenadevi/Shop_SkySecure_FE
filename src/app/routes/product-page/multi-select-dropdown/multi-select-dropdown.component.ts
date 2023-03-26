import { Component } from '@angular/core';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent {
  allItems: Array<any> = [];
  selectedItem: Array<string> = [];
  selectedItems2: Array<any> = [];
  dropdownSettings: any = {};
  dropdownSettings2: any = {};

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 2,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };

    document.querySelector('.ng-star-inserted');

    this.allItems = [
      {
        item_id: 1,
        item_text: 'Microsoft',
      },
      {
        item_id: 2,
        item_text: 'Microsoft active directory',
      },
      {
        item_id: 3,
        item_text: 'Endpoint protection'
      },
      {
        item_id: 4,
        item_text: 'Data Backup Software',
      },
      {
        item_id: 5,
        item_text: 'Designing Soutions',
      },
      {
        item_id: 6,
        item_text: 'Project Management Software'
      },
      {
        item_id: 7,
        item_text: 'BPM Software'
      },
      {
        item_id: 8,
        item_text: 'Collaboration Software'
      },
    ];
    this.selectedItems2 = [
    ];

    this.selectedItem = [];
  }

  get getItems() {
    return this.allItems.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  onItemSelect(item: any) {
  }

  handleReset() {
    this.selectedItem = [];
  }
}
