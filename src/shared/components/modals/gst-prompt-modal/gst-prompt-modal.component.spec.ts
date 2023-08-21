import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstPromptModalComponent } from './gst-prompt-modal.component';

describe('GstPromptModalComponent', () => {
  let component: GstPromptModalComponent;
  let fixture: ComponentFixture<GstPromptModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstPromptModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstPromptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
