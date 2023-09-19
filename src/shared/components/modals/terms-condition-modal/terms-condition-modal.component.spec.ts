import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionModalComponent } from './terms-condition-modal.component';

describe('TermsConditionModalComponent', () => {
  let component: TermsConditionModalComponent;
  let fixture: ComponentFixture<TermsConditionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsConditionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsConditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
