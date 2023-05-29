import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandBundleComponent } from './brand-bundle.component';

describe('BrandBundleComponent', () => {
  let component: BrandBundleComponent;
  let fixture: ComponentFixture<BrandBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandBundleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
