import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductsHomeComponent } from './compare-products-home.component';

describe('CompareProductsHomeComponent', () => {
  let component: CompareProductsHomeComponent;
  let fixture: ComponentFixture<CompareProductsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareProductsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareProductsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
