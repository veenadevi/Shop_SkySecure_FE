import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarTrendingProductsComponent } from './searchbar-trending-products.component';

describe('SearchbarTrendingProductsComponent', () => {
  let component: SearchbarTrendingProductsComponent;
  let fixture: ComponentFixture<SearchbarTrendingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarTrendingProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbarTrendingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
