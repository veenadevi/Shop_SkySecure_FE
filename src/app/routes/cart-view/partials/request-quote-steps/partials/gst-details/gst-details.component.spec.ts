import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstDetailsComponent } from './gst-details.component';

describe('GstDetailsComponent', () => {
  let component: GstDetailsComponent;
  let fixture: ComponentFixture<GstDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
