import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationHistoryComponent } from './quotation-history.component';

describe('QuotationHistoryComponent', () => {
  let component: QuotationHistoryComponent;
  let fixture: ComponentFixture<QuotationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
