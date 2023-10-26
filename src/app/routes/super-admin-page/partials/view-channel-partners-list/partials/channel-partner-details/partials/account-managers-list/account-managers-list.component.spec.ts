import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagersListComponent } from './account-managers-list.component';

describe('AccountManagersListComponent', () => {
  let component: AccountManagersListComponent;
  let fixture: ComponentFixture<AccountManagersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountManagersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountManagersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
