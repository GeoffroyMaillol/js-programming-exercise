import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Search } from './components/search/search';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Search,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Search Webapp Angular');
  private readonly titleService = inject(Title);

  constructor() {
    effect(() => {
      this.titleService.setTitle(this.title());
    });
  }

}
