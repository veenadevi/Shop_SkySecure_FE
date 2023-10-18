import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsEstimatesTableComponent } from './customer-details-estimates-table.component';

describe('CustomerDetailsEstimatesTableComponent', () => {
  let component: CustomerDetailsEstimatesTableComponent;
  let fixture: ComponentFixture<CustomerDetailsEstimatesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsEstimatesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsEstimatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
