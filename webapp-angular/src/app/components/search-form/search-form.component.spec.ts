import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFormComponent } from './search-form.component';
import { SearchService } from '../../services/userdata.search.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

const mockSearchService = {
  searchUserData: vi.fn().mockReturnValue(
    of([{ id: 1, name: 'Mock User' }])
  )
};

describe('SearchFormComponent', () => {
  let fixture: ComponentFixture<SearchFormComponent>;
  let element: HTMLElement;
  let component: SearchFormComponent;

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [SearchFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SearchService, useValue: mockSearchService }
      ]
    });

    fixture = TestBed.createComponent(SearchFormComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the SearchFormComponent', () => {
    const fixture = TestBed.createComponent(SearchFormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a text field', () => {
    const input = element.querySelector('input[matinput]');
    expect(input).toBeTruthy();
  });

  it('should render a search button', () => {
    const button = element.querySelector('button[mat-raised-button]');
    expect(button).toBeTruthy();
    expect(button?.textContent?.trim()).toBe('Go!');
  });

  it('should render a form field wrapper', () => {
    const formField = element.querySelector('mat-form-field');
    expect(formField).toBeTruthy();
  });

  it('should have the correct placeholder text', () => {
    const input = element.querySelector('input[matinput]') as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input.placeholder).toBe('Search for a user...');
  });

  it('should have the correct label', () => {
    const input = element.querySelector('mat-label') as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input?.textContent?.trim()).toBe('Search for a user');
  });

  it('calls searchUsers and updates results', () => {
    component.query = 'john';
    component.onSearch();

    expect(mockSearchService.searchUserData).toHaveBeenCalledWith('john');
    expect(component.results()).toEqual([{ id: 1, name: 'Mock User' }]);
  });

});
