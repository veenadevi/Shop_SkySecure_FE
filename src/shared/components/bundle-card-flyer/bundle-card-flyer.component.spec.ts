import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleCardFlyerComponent } from './bundle-card-flyer.component';

describe('BundleCardFlyerComponent', () => {
  let component: BundleCardFlyerComponent;
  let fixture: ComponentFixture<BundleCardFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BundleCardFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BundleCardFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
