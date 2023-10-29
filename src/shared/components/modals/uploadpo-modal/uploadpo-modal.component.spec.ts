import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadpoModalComponent } from './uploadpo-modal.component';

describe('UploadpoModalComponent', () => {
  let component: UploadpoModalComponent;
  let fixture: ComponentFixture<UploadpoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadpoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadpoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
