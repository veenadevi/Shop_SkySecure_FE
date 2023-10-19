import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsInvoiceTableComponent } from './customer-details-invoice-table.component';

describe('CustomerDetailsInvoiceTableComponent', () => {
  let component: CustomerDetailsInvoiceTableComponent;
  let fixture: ComponentFixture<CustomerDetailsInvoiceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsInvoiceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsInvoiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});