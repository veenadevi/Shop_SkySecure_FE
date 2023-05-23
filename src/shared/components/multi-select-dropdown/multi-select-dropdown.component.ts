import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent implements OnInit{

  showDropDown = false;

    @Input() list:any[]; 

    @Input() filterName : string ;

    @Input() defaultSelectedItem : any;
    
    @Output() selectedList = new EventEmitter();
    @Output() shareIndividualCheckedList = new EventEmitter();

    checkedList : any[];
    currentSelected : {};

  constructor() {
    this.checkedList = [];
    
    
    

   }

   ngOnInit(): void {
    // if(this.list.length > 0){
    //   //let filteredArray = this.list.filter(event => (event.checked === true));
    //   this.checkedList.push(this.list);
    //   console.log("+ + + + +", this.checkedList);
    // }
   }

       getSelectedValue(status:Boolean,value:any){
        if(status){
          this.checkedList.push(value);  
          //console.log("+ + + + +", this.checkedList[0].name);
        }else{
            var index = this.checkedList.indexOf(value);
            this.checkedList.splice(index,1);
            //console.log("+ + + + +", this.checkedList);
        }
        
        this.currentSelected = {checked : status,name:value};

        //share checked list
        this.selectedListEvent();
        
        //share individual selected item
        this.shareIndividualStatus();
    }


    public selectedListEvent(){
         //this.selectedList.emit(this.checkedList);
         this.selectedList.emit(this.list.filter(item => item.checked));
         //console.log("+ + + + +", this.list.filter(item => item.checked));
    }
    shareIndividualStatus(){
        this.shareIndividualCheckedList.emit(this.currentSelected);
    }



}
