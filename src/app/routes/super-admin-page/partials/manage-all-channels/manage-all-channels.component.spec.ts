import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAllChannelsComponent } from './manage-all-channels.component';

describe('ManageAllChannelsComponent', () => {
  let component: ManageAllChannelsComponent;
  let fixture: ComponentFixture<ManageAllChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAllChannelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAllChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
