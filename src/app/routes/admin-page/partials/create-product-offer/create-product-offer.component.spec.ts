import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductOfferComponent } from './create-product-offer.component';

describe('CreateProductOfferComponent', () => {
  let component: CreateProductOfferComponent;
  let fixture: ComponentFixture<CreateProductOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
