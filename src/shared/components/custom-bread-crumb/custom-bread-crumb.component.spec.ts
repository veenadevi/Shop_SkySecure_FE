import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBreadCrumbComponent } from './custom-bread-crumb.component';

describe('CustomBreadCrumbComponent', () => {
  let component: CustomBreadCrumbComponent;
  let fixture: ComponentFixture<CustomBreadCrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomBreadCrumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomBreadCrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
