import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductsTrendingProductsComponent } from './compare-products-trending-products.component';

describe('CompareProductsTrendingProductsComponent', () => {
  let component: CompareProductsTrendingProductsComponent;
  let fixture: ComponentFixture<CompareProductsTrendingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareProductsTrendingProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareProductsTrendingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
