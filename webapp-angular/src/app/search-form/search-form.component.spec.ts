import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let fixture: ComponentFixture<SearchFormComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchFormComponent]
    });

    fixture = TestBed.createComponent(SearchFormComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
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

});
