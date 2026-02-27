import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { SearchFormComponent } from './search-form.component';
import { SearchService } from '../../services/userdata.search.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
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
    const input = element.querySelector('input') as HTMLInputElement;
    expect(input).toBeTruthy();
  });

  it('should render a search button', () => {
    const button = element.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent?.trim()).toBe('Go!');
  });

  it('should have the correct placeholder text', () => {
    const input = element.querySelector('input') as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input?.placeholder?.trim()).toBe('Search for a user...');
  });

  it('calls searchUsers and updates results', () => {
    component.query = 'john';
    component.onSearch();

    expect(mockSearchService.searchUserData).toHaveBeenCalledWith('john');
    expect(component.results()).toEqual([{ id: 1, name: 'Mock User' }]);
  });

  it('should render the expected autocomplete content', async() => {
    const formField = element.querySelector('mat-autocomplete');
    expect(formField).toBeTruthy();
    const overlayContainer = TestBed.inject(OverlayContainer);
    const overlayElement = overlayContainer.getContainerElement();

    const mockUsers = [
      {
        id: 0,
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        phone: "30",
        jobTitle: "dev",
      },
      {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@example.com',
        phone: "40",
        jobTitle: "tester",
      },
    ];

    const userService = TestBed.inject(SearchService);
    vi.spyOn(userService, 'searchUserData').mockReturnValue(of(mockUsers));

    fixture.detectChanges();
    await fixture.whenStable();

    const input: HTMLInputElement =
    fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'sm';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    input.focus();
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    expect(userService.searchUserData).toHaveBeenCalledTimes(1);
    expect(userService.searchUserData).toHaveBeenCalledWith('sm');

    const options = overlayElement.querySelectorAll('mat-option');
    expect(options.length).toBe(2);

    expect(options[0].textContent?.trim()).toContain('Alice Smith (alice@example.com)');
    expect(options[1].textContent?.trim()).toContain('John Smith (john@example.com)');
  });

});
