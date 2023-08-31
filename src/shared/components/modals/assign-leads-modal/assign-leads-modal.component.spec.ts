import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeadsModalComponent } from './assign-leads-modal.component';

describe('AssignLeadsModalComponent', () => {
  let component: AssignLeadsModalComponent;
  let fixture: ComponentFixture<AssignLeadsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignLeadsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignLeadsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
