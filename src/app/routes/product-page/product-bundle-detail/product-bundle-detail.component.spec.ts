import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBundleDetailComponent } from './product-bundle-detail.component';

describe('ProductBundleDetailComponent', () => {
  let component: ProductBundleDetailComponent;
  let fixture: ComponentFixture<ProductBundleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBundleDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBundleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
