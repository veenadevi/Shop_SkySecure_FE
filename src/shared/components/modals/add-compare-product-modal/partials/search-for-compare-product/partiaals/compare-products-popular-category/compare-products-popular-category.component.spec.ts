import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductsPopularCategoryComponent } from './compare-products-popular-category.component';

describe('CompareProductsPopularCategoryComponent', () => {
  let component: CompareProductsPopularCategoryComponent;
  let fixture: ComponentFixture<CompareProductsPopularCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareProductsPopularCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareProductsPopularCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
