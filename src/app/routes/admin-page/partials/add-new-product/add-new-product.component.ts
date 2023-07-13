import { Component ,OnInit} from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit{
 
  
    items: any[] = [
      { column1: 'input', column2: 'input' },
      { column1: 'Value 3', column2: 'Value 4' },
      // Add more initial rows as needed
    ];

  addRow() {
    const newRow = { column1: 'New Value 1', column2: 'New Value 2' };
    this.items.push(newRow);
  }
  
  ngOnInit() {
    
  }

 
}
