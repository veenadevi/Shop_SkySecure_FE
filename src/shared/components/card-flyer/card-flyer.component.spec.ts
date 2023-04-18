import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFlyerComponent } from './card-flyer.component';

describe('CardFlyerComponent', () => {
  let component: CardFlyerComponent;
  let fixture: ComponentFixture<CardFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
