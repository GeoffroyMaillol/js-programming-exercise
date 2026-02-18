import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataCard } from './user-data-card';

describe('UserDataCard', () => {
  let component: UserDataCard;
  let fixture: ComponentFixture<UserDataCard>;
  let element: HTMLElement;
;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDataCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataCard);
    element = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    component.userData = {
      id: 0,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      phone: "30",
      jobTitle: "dev",
    };

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the expected properties', () => {
    expect(element.textContent).toContain('Alice Smith');
    expect(element.textContent).toContain('Email: alice@example.com');
    expect(element.textContent).toContain('Phone: 30');
    expect(element.textContent).toContain('Job title: dev');
  });
});
