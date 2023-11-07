import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewAverageComponent } from './product-review-average.component';

describe('ProductReviewAverageComponent', () => {
  let component: ProductReviewAverageComponent;
  let fixture: ComponentFixture<ProductReviewAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductReviewAverageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductReviewAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
