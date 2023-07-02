import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateDetailsComponent } from './estimate-details.component';

describe('EstimateDetailsComponent', () => {
  let component: EstimateDetailsComponent;
  let fixture: ComponentFixture<EstimateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimateDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
