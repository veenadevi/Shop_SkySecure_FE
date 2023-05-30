import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCardFlyerComponent } from './brand-card-flyer.component';

describe('BrandCardFlyerComponent', () => {
  let component: BrandCardFlyerComponent;
  let fixture: ComponentFixture<BrandCardFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandCardFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandCardFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
