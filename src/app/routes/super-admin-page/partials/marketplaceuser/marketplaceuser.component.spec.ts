import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceuserComponent } from './marketplaceuser.component';

describe('MarketplaceuserComponent', () => {
  let component: MarketplaceuserComponent;
  let fixture: ComponentFixture<MarketplaceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
