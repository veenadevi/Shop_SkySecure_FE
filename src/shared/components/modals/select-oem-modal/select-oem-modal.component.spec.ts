import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOemModalComponent } from './select-oem-modal.component';

describe('SelectOemModalComponent', () => {
  let component: SelectOemModalComponent;
  let fixture: ComponentFixture<SelectOemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOemModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectOemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
