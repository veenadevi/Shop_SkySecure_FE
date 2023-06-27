import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableSubCategoryFilterComponent } from './searchable-sub-category-filter.component';

describe('SearchableSubCategoryFilterComponent', () => {
  let component: SearchableSubCategoryFilterComponent;
  let fixture: ComponentFixture<SearchableSubCategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchableSubCategoryFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchableSubCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
