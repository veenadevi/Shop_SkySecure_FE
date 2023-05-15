import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceCatalogueComponent } from './licence-catalogue.component';

describe('LicenceCatalogueComponent', () => {
  let component: LicenceCatalogueComponent;
  let fixture: ComponentFixture<LicenceCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenceCatalogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenceCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
