import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFinalPageComponent } from './review-final-page.component';

describe('ReviewFinalPageComponent', () => {
  let component: ReviewFinalPageComponent;
  let fixture: ComponentFixture<ReviewFinalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewFinalPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewFinalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
