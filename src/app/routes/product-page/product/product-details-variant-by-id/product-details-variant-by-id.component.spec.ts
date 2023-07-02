import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsVariantByIdComponent } from './product-details-variant-by-id.component';

describe('ProductDetailsVariantByIdComponent', () => {
  let component: ProductDetailsVariantByIdComponent;
  let fixture: ComponentFixture<ProductDetailsVariantByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsVariantByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsVariantByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
