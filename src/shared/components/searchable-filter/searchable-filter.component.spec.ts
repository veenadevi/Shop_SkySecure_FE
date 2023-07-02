import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableFilterComponent } from './searchable-filter.component';

describe('SearchableFilterComponent', () => {
  let component: SearchableFilterComponent;
  let fixture: ComponentFixture<SearchableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchableFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
