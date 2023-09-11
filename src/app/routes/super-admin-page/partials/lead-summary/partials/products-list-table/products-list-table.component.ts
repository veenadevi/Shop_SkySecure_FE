import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'products-list-table',
  templateUrl: './products-list-table.component.html',
  styleUrls: ['./products-list-table.component.css']
})
export class ProductsListTableComponent implements OnInit{

  @Input('productsData')
  public productsData : any;


  userForm: FormGroup;
  public productListForm : FormGroup;
  employee = [
    {
      name: 'tuna',
      email: 'vscode@gmail.com',
      mobNumber: 12346,
      dob: new Date()
    },
    {
      name: 'node',
      email: 'nodejs@gmail.com',
      mobNumber: 1234,
      dob: new Date()
    },
    {
      name: 'google',
      email: 'google@gmail.com',
      mobNumber: 123461,
      dob: new Date()
    }
  ];

  constructor(
    private fb: FormBuilder
  ){}


  ngOnInit(): void {
    this.setSampleData();
  }


  public setSampleData(){

    this.productListForm = this.fb.group({
      items: this.fb.array([])
    });
    this.getEmployee();

  }

  getEmployee() {
    const control = <FormArray>this.productListForm.get('items');
    for (const items of this.productsData.line_items) {
     /* const grp = this.fb.group({
        name: [emp.name, Validators.required],
        email: [emp.email, [Validators.required]],
        mobNumber: [emp.mobNumber, [Validators.min(10)]],
        dob: [emp.dob, Validators.required]
      });*/
      const grp = this.fb.group({
        name: [items.description, Validators.required],
        quantity: [items.quantity, [Validators.required]],
        bcy_rate: [items.bcy_rate, [Validators.min(10)]],
        tax_name: [items.tax_name, Validators.required],
        item_total: [items.item_total, Validators.required],
      });
      control.push(grp);
    }
  }

  initiatForm(): FormGroup {
    return this.fb.group({
        name: ['', Validators.required],
        quantity: ['', [Validators.required]],
        bcy_rate: ['', [Validators.min(10)]],
        tax_name: ['', Validators.required],
        item_total: ['', Validators.required],
    });
  }

  get getFormData(): FormArray {
    return <FormArray>this.productListForm.get('items');
  }

  addUser() {
    const control = <FormArray>this.productListForm.get('items');
    control.push(this.initiatForm());
  }

  remove(index: number) {
    const control = <FormArray>this.productListForm.get('items');
    control.removeAt(index);
  }

  save() {
    console.log('isValid', this.productListForm.valid);
    console.log('value', this.productListForm.value);
  }
}
