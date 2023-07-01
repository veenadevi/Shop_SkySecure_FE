import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBundleVariantDetailComponent } from './product-bundle-variant-detail.component';

describe('ProductBundleVariantDetailComponent', () => {
  let component: ProductBundleVariantDetailComponent;
  let fixture: ComponentFixture<ProductBundleVariantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBundleVariantDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBundleVariantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
