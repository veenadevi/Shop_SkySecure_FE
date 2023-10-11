import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsViewComponent } from './customer-details-view.component';

describe('CustomerDetailsViewComponent', () => {
  let component: CustomerDetailsViewComponent;
  let fixture: ComponentFixture<CustomerDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
