import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarRecentlySearchedComponent } from './searchbar-recently-searched.component';

describe('SearchbarRecentlySearchedComponent', () => {
  let component: SearchbarRecentlySearchedComponent;
  let fixture: ComponentFixture<SearchbarRecentlySearchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarRecentlySearchedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbarRecentlySearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
