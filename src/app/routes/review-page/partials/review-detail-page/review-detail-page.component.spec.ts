import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDetailPageComponent } from './review-detail-page.component';

describe('ReviewDetailPageComponent', () => {
  let component: ReviewDetailPageComponent;
  let fixture: ComponentFixture<ReviewDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
