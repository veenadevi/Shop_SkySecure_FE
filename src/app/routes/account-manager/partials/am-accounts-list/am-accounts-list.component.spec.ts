import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmAccountsListComponent } from './am-accounts-list.component';

describe('AmAccountsListComponent', () => {
  let component: AmAccountsListComponent;
  let fixture: ComponentFixture<AmAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmAccountsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
