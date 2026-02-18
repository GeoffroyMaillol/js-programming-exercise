import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';

describe('SearchResults', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;

    component.results = [{
      id: 0,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      phone: "30",
      jobTitle: "dev",
    }];
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain user data cards', () => {
    const userDataCard = element.querySelector('app-user-data-card');
    expect(userDataCard).toBeTruthy();
  });
});
