import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadSummaryComponent } from './lead-summary.component';

describe('LeadSummaryComponent', () => {
  let component: LeadSummaryComponent;
  let fixture: ComponentFixture<LeadSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
