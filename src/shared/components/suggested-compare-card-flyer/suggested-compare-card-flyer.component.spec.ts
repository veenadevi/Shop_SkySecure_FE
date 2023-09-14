import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedCompareCardFlyerComponent } from './suggested-compare-card-flyer.component';

describe('SuggestedCompareCardFlyerComponent', () => {
  let component: SuggestedCompareCardFlyerComponent;
  let fixture: ComponentFixture<SuggestedCompareCardFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedCompareCardFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedCompareCardFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
