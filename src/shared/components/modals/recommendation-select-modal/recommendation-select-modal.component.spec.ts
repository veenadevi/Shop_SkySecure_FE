import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationSelectModalComponent } from './recommendation-select-modal.component';

describe('RecommendationSelectModalComponent', () => {
  let component: RecommendationSelectModalComponent;
  let fixture: ComponentFixture<RecommendationSelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationSelectModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendationSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
