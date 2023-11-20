import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpReassignModalComponent } from './cp-reassign-modal.component';

describe('CpReassignModalComponent', () => {
  let component: CpReassignModalComponent;
  let fixture: ComponentFixture<CpReassignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpReassignModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpReassignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
