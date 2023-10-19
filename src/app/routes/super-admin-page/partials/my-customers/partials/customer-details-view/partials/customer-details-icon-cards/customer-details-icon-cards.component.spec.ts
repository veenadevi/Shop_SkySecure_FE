import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsIconCardsComponent } from './customer-details-icon-cards.component';

describe('CustomerDetailsIconCardsComponent', () => {
  let component: CustomerDetailsIconCardsComponent;
  let fixture: ComponentFixture<CustomerDetailsIconCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsIconCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsIconCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});