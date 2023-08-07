import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForCompareProductComponent } from './search-for-compare-product.component';

describe('SearchForCompareProductComponent', () => {
  let component: SearchForCompareProductComponent;
  let fixture: ComponentFixture<SearchForCompareProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchForCompareProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchForCompareProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
