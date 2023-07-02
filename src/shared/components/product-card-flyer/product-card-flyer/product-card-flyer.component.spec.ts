import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardFlyerComponent } from './product-card-flyer.component';

describe('ProductCardFlyerComponent', () => {
  let component: ProductCardFlyerComponent;
  let fixture: ComponentFixture<ProductCardFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
