import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCardFlyerComponent } from './header-card-flyer.component';

describe('HeaderCardFlyerComponent', () => {
  let component: HeaderCardFlyerComponent;
  let fixture: ComponentFixture<HeaderCardFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCardFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCardFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
