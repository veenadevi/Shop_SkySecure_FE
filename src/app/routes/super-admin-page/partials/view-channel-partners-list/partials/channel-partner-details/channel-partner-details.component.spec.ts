import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPartnerDetailsComponent } from './channel-partner-details.component';

describe('ChannelPartnerDetailsComponent', () => {
  let component: ChannelPartnerDetailsComponent;
  let fixture: ComponentFixture<ChannelPartnerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelPartnerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelPartnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
