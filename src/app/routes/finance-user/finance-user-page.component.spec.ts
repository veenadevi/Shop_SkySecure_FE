import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceUserPageComponent } from './finance-user-page.component';

describe('FinanceUserPageComponent', () => {
  let component: FinanceUserPageComponent;
  let fixture: ComponentFixture<FinanceUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceUserPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
