import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagaeAllAdminComponent } from './managae-all-admin.component';

describe('ManagaeAllAdminComponent', () => {
  let component: ManagaeAllAdminComponent;
  let fixture: ComponentFixture<ManagaeAllAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagaeAllAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagaeAllAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
