import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductsFlyerComponent } from './compare-products-flyer.component';

describe('CompareProductsFlyerComponent', () => {
  let component: CompareProductsFlyerComponent;
  let fixture: ComponentFixture<CompareProductsFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareProductsFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareProductsFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
