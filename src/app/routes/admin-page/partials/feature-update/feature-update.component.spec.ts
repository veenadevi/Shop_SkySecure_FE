import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureUpdateComponent } from './feature-update.component';

describe('FeatureUpdateComponent', () => {
  let component: FeatureUpdateComponent;
  let fixture: ComponentFixture<FeatureUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
