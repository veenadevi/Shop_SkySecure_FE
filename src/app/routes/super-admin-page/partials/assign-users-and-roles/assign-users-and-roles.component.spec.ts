import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUsersAndRolesComponent } from './assign-users-and-roles.component';

describe('AssignUsersAndRolesComponent', () => {
  let component: AssignUsersAndRolesComponent;
  let fixture: ComponentFixture<AssignUsersAndRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignUsersAndRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignUsersAndRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
