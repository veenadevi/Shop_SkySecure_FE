import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleMindmapComponent } from './bundle-mindmap.component';

describe('BundleMindmapComponent', () => {
  let component: BundleMindmapComponent;
  let fixture: ComponentFixture<BundleMindmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BundleMindmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BundleMindmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
