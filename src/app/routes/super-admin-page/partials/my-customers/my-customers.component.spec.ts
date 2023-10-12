import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomersComponent } from './my-customers.component';

describe('MyCustomersComponent', () => {
  let component: MyCustomersComponent;
  let fixture: ComponentFixture<MyCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
