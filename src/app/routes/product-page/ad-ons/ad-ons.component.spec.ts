import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdOnsComponent } from './ad-ons.component';

describe('AdOnsComponent', () => {
  let component: AdOnsComponent;
  let fixture: ComponentFixture<AdOnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdOnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdOnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
