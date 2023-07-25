import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarSearchListComponent } from './searchbar-search-list.component';

describe('SearchbarSearchListComponent', () => {
  let component: SearchbarSearchListComponent;
  let fixture: ComponentFixture<SearchbarSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarSearchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbarSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
