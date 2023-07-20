import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsFlyerHorizontalComponent } from './contact-us-flyer-horizontal.component';

describe('ContactUsFlyerHorizontalComponent', () => {
  let component: ContactUsFlyerHorizontalComponent;
  let fixture: ComponentFixture<ContactUsFlyerHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsFlyerHorizontalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsFlyerHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
