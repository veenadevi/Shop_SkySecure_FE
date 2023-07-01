import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyRecommViewComponent } from './empty-recomm-view.component';

describe('EmptyRecommViewComponent', () => {
  let component: EmptyRecommViewComponent;
  let fixture: ComponentFixture<EmptyRecommViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyRecommViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyRecommViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
