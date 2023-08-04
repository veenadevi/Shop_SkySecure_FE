import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductsModalComponent } from './compare-products-modal.component';

describe('CompareProductsModalComponent', () => {
  let component: CompareProductsModalComponent;
  let fixture: ComponentFixture<CompareProductsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareProductsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareProductsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
