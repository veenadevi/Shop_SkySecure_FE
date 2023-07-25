import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSerachBarComponent } from './header-serach-bar.component';

describe('HeaderSerachBarComponent', () => {
  let component: HeaderSerachBarComponent;
  let fixture: ComponentFixture<HeaderSerachBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSerachBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSerachBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
