import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPromptModalComponent } from './company-prompt-modal.component';

describe('CompanyPromptModalComponent', () => {
  let component: CompanyPromptModalComponent;
  let fixture: ComponentFixture<CompanyPromptModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyPromptModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPromptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
