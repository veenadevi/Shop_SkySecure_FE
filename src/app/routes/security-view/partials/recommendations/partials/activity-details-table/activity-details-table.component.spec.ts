import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetailsTableComponent } from './activity-details-table.component';

describe('ActivityDetailsTableComponent', () => {
  let component: ActivityDetailsTableComponent;
  let fixture: ComponentFixture<ActivityDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityDetailsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
