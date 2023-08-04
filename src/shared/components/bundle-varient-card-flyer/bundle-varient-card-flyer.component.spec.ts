import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleVarientCardFlyerComponent } from './bundle-varient-card-flyer.component';

describe('BundleVarientCardFlyerComponent', () => {
  let component: BundleVarientCardFlyerComponent;
  let fixture: ComponentFixture<BundleVarientCardFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BundleVarientCardFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BundleVarientCardFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
