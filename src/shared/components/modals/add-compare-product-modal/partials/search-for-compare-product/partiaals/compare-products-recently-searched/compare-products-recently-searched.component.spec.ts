import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductsRecentlySearchedComponent } from './compare-products-recently-searched.component';

describe('CompareProductsRecentlySearchedComponent', () => {
  let component: CompareProductsRecentlySearchedComponent;
  let fixture: ComponentFixture<CompareProductsRecentlySearchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareProductsRecentlySearchedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareProductsRecentlySearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
