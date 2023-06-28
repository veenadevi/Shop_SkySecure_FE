import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductItemFlyerComponent } from './compare-product-item-flyer.component';

describe('CompareProductItemFlyerComponent', () => {
  let component: CompareProductItemFlyerComponent;
  let fixture: ComponentFixture<CompareProductItemFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareProductItemFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareProductItemFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
