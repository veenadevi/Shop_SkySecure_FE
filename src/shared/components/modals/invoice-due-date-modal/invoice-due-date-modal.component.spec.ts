import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDueDateModalComponent } from './invoice-due-date-modal.component';

describe('InvoiceDueDateModalComponent', () => {
  let component: InvoiceDueDateModalComponent;
  let fixture: ComponentFixture<InvoiceDueDateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDueDateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDueDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
