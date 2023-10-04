import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteChannelPartnerComponent } from './invite-channel-partner.component';

describe('InviteChannelPartnerComponent', () => {
  let component: InviteChannelPartnerComponent;
  let fixture: ComponentFixture<InviteChannelPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteChannelPartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteChannelPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
