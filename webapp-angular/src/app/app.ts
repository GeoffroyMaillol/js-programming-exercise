import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { Title } from '@angular/platform-browser';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { UserData } from './types/UserData';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchFormComponent,
    SearchResultsComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Search Webapp Angular');
  private readonly titleService = inject(Title);
  results = signal<UserData[]>([]);

  constructor() {
    effect(() => {
      this.titleService.setTitle(this.title());
    });
  }

}
