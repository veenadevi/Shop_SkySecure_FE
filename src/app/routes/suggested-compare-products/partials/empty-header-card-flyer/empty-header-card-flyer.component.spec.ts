import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyHeaderCardFlyerComponent } from './empty-header-card-flyer.component';

describe('EmptyHeaderCardFlyerComponent', () => {
  let component: EmptyHeaderCardFlyerComponent;
  let fixture: ComponentFixture<EmptyHeaderCardFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyHeaderCardFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyHeaderCardFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
