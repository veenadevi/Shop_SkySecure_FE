import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarPopularCategoryComponent } from './searchbar-popular-category.component';

describe('SearchbarPopularCategoryComponent', () => {
  let component: SearchbarPopularCategoryComponent;
  let fixture: ComponentFixture<SearchbarPopularCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarPopularCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbarPopularCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
