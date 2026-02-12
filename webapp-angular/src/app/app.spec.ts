import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Title } from '@angular/platform-browser';
import { APP_CONFIG } from './app.config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: APP_CONFIG, useValue: { apiUrl: 'test-url' } }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set the tab title', async () => {
    TestBed.configureTestingModule({
      imports: [App]
    });

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const titleService = TestBed.inject(Title);
    expect(titleService.getTitle()).toBe('Search Webapp Angular');
  });
});
