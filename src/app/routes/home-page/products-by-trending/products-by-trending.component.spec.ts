import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsByTrendingComponent } from './products-by-trending.component';

describe('ProductsByTrendingComponent', () => {
  let component: ProductsByTrendingComponent;
  let fixture: ComponentFixture<ProductsByTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsByTrendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsByTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
