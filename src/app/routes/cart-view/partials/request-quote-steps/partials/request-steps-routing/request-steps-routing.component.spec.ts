import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStepsRoutingComponent } from './request-steps-routing.component';

describe('RequestStepsRoutingComponent', () => {
  let component: RequestStepsRoutingComponent;
  let fixture: ComponentFixture<RequestStepsRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestStepsRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestStepsRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
