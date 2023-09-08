import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedCompareProductsComponent } from './suggested-compare-products.component';

describe('SuggestedCompareProductsComponent', () => {
  let component: SuggestedCompareProductsComponent;
  let fixture: ComponentFixture<SuggestedCompareProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedCompareProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedCompareProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
