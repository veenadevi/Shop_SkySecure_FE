import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayResponseComponent } from './payment-gateway-response.component';

describe('PaymentGatewayResponseComponent', () => {
  let component: PaymentGatewayResponseComponent;
  let fixture: ComponentFixture<PaymentGatewayResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentGatewayResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentGatewayResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
