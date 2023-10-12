import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeadsAmModalComponent } from './assign-leads-am-modal.component';

describe('AssignLeadsAmModalComponent', () => {
  let component: AssignLeadsAmModalComponent;
  let fixture: ComponentFixture<AssignLeadsAmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignLeadsAmModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignLeadsAmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
