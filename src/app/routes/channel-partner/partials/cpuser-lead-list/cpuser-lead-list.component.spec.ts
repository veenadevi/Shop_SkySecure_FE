import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuserLeadListComponent } from './cpuser-lead-list.component';

describe('CpuserLeadListComponent', () => {
  let component: CpuserLeadListComponent;
  let fixture: ComponentFixture<CpuserLeadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuserLeadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpuserLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
