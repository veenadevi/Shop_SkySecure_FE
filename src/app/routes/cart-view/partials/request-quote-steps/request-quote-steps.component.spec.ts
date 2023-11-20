import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestQuoteStepsComponent } from './request-quote-steps.component';

describe('RequestQuoteStepsComponent', () => {
  let component: RequestQuoteStepsComponent;
  let fixture: ComponentFixture<RequestQuoteStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestQuoteStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestQuoteStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
