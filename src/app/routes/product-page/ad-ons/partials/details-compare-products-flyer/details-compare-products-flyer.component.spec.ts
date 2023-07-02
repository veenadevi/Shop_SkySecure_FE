import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCompareProductsFlyerComponent } from './details-compare-products-flyer.component';

describe('DetailsCompareProductsFlyerComponent', () => {
  let component: DetailsCompareProductsFlyerComponent;
  let fixture: ComponentFixture<DetailsCompareProductsFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCompareProductsFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCompareProductsFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
