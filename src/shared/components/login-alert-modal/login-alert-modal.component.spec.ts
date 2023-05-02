import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAlertModalComponent } from './login-alert-modal.component';

describe('LoginAlertModalComponent', () => {
  let component: LoginAlertModalComponent;
  let fixture: ComponentFixture<LoginAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAlertModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
