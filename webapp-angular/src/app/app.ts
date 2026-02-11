import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchFormComponent } from './search-form/search-form.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SearchFormComponent,
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
