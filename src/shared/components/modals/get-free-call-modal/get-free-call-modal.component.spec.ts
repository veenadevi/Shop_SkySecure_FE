import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFreeCallModalComponent } from './get-free-call-modal.component';

describe('GetFreeCallModalComponent', () => {
  let component: GetFreeCallModalComponent;
  let fixture: ComponentFixture<GetFreeCallModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetFreeCallModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetFreeCallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
