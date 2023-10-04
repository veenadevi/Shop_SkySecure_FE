import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChannelPartnersListComponent } from './view-channel-partners-list.component';

describe('ViewChannelPartnersListComponent', () => {
  let component: ViewChannelPartnersListComponent;
  let fixture: ComponentFixture<ViewChannelPartnersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChannelPartnersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChannelPartnersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
