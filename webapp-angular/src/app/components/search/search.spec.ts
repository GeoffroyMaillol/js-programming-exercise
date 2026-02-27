import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Search } from './search';
import { APP_CONFIG } from '../../app.config';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Search],
      providers: [
        { provide: APP_CONFIG, useValue: { apiUrl: 'test-url' } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a search form', () => {
    const searchForm = element.querySelector('app-search-form');
    expect(searchForm).toBeTruthy();
  });

  it('should contain search results', () => {
    const searchResults = element.querySelector('app-search-results');
    expect(searchResults).toBeTruthy();
  });
});
