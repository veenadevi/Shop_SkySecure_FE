import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRatingPageComponent } from './review-rating-page.component';

describe('ReviewRatingPageComponent', () => {
  let component: ReviewRatingPageComponent;
  let fixture: ComponentFixture<ReviewRatingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewRatingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewRatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
