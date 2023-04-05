import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardItemComponent } from './product-card-item.component';

describe('ProductCardItemComponent', () => {
  let component: ProductCardItemComponent;
  let fixture: ComponentFixture<ProductCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
