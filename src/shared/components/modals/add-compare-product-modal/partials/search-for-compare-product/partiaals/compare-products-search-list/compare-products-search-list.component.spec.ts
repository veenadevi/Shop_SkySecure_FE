import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductsSearchListComponent } from './compare-products-search-list.component';

describe('CompareProductsSearchListComponent', () => {
  let component: CompareProductsSearchListComponent;
  let fixture: ComponentFixture<CompareProductsSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareProductsSearchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareProductsSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
