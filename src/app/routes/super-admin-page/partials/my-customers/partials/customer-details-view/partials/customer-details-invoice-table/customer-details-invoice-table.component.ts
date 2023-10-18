import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'customer-details-invoice-table',
  templateUrl: './customer-details-invoice-table.component.html',
  styleUrls: ['./customer-details-invoice-table.component.css']
})
export class CustomerDetailsInvoiceTableComponent implements OnInit{

  @Input('customerInvoices')
  public customerInvoices : any;


  ngOnInit(): void {
    
  }

}
