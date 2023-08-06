import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompareProductModalComponent } from './add-compare-product-modal.component';

describe('AddCompareProductModalComponent', () => {
  let component: AddCompareProductModalComponent;
  let fixture: ComponentFixture<AddCompareProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompareProductModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompareProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
