import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReviewFlyerComponent } from './write-review-flyer.component';

describe('WriteReviewFlyerComponent', () => {
  let component: WriteReviewFlyerComponent;
  let fixture: ComponentFixture<WriteReviewFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteReviewFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteReviewFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
