import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReasonModalComponent } from './get-reason-modal.component';

describe('GetReasonModalComponent', () => {
  let component: GetReasonModalComponent;
  let fixture: ComponentFixture<GetReasonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetReasonModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetReasonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
