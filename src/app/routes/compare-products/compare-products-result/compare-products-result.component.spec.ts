import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductsResultComponent } from './compare-products-result.component';

describe('CompareProductsResultComponent', () => {
  let component: CompareProductsResultComponent;
  let fixture: ComponentFixture<CompareProductsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareProductsResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareProductsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
