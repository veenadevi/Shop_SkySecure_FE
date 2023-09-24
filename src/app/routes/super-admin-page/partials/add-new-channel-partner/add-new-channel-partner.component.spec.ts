import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewChannelPartnerComponent } from './add-new-channel-partner.component';

describe('AddNewChannelPartnerComponent', () => {
  let component: AddNewChannelPartnerComponent;
  let fixture: ComponentFixture<AddNewChannelPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewChannelPartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewChannelPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
