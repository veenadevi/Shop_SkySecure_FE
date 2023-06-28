import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsFlyerComponent } from './contact-us-flyer.component';

describe('ContactUsFlyerComponent', () => {
  let component: ContactUsFlyerComponent;
  let fixture: ComponentFixture<ContactUsFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
