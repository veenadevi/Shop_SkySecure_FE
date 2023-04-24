import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent {

  showDropDown = false;

    @Input() list:any[]; 

    @Input() filterName : string ;
    
    @Output() selectedList = new EventEmitter();
    @Output() shareIndividualCheckedList = new EventEmitter();

    checkedList : any[];
    currentSelected : {};

  constructor() {
    this.checkedList = [];
   }

       getSelectedValue(status:Boolean,value:any){
        if(status){
          this.checkedList.push(value);  
        }else{
            var index = this.checkedList.indexOf(value);
            this.checkedList.splice(index,1);
        }
        
        this.currentSelected = {checked : status,name:value};

        //share checked list
        this.selectedListEvent();
        
        //share individual selected item
        this.shareIndividualStatus();
    }


    public selectedListEvent(){
         this.selectedList.emit(this.checkedList);
    }
    shareIndividualStatus(){
        this.shareIndividualCheckedList.emit(this.currentSelected);
    }



}
