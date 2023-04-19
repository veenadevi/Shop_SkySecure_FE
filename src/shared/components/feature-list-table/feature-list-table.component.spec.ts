import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureListTableComponent } from './feature-list-table.component';

describe('FeatureListTableComponent', () => {
  let component: FeatureListTableComponent;
  let fixture: ComponentFixture<FeatureListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
