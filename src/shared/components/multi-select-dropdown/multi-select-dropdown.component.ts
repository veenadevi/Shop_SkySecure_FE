import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


interface City {
  name: string,
  code: string
}

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

    cities : City[];

    selectedCities : City[];



  constructor() {
    this.checkedList = [];
    
    
    

   }

   ngOnInit(): void {

    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
    // if(this.list.length > 0){
    //   //let filteredArray = this.list.filter(event => (event.checked === true));
    //   this.checkedList.push(this.list);
    //   console.log("+ + + + +", this.checkedList);


    // }


    // if (this.list.filter(e => e.checked === true).length > 0) {
    //   /* vendors contains the element we're looking for */
    //   this.checkedList.push(this.list.filter(e => e.checked === true)); 
    // }
    // console.log("+++++ ((((( , ", this.checkedList);

    if(this.list.length>0){
      this.list.forEach(element => {
        if(element.checked){
          this.checkedList.push(element);
        }
      });
      // console.log("+++++ ((((( , ", this.list);
    }
  
    
   }

       getSelectedValue(status:Boolean,value:any){

        // console.log("+ + + + +", status);
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

    public handleOnClick() {
      this.selectedList.emit(this.checkedList);
      // console.log("***** )))))) Checked List ", this.checkedList);
    }



}
