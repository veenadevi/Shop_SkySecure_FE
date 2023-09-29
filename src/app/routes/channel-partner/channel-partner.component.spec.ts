import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPartnerComponent } from './channel-partner.component';

describe('ChannelPartnerComponent', () => {
  let component: ChannelPartnerComponent;
  let fixture: ComponentFixture<ChannelPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelPartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
