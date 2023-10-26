import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLeadListComponent } from './active-lead-list.component';

describe('ActiveLeadListComponent', () => {
  let component: ActiveLeadListComponent;
  let fixture: ComponentFixture<ActiveLeadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveLeadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
