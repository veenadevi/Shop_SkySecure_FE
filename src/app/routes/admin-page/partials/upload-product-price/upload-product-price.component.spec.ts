import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProductPriceComponent } from './upload-product-price.component';

describe('UploadProductPriceComponent', () => {
  let component: UploadProductPriceComponent;
  let fixture: ComponentFixture<UploadProductPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProductPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadProductPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
