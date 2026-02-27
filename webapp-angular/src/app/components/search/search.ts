import { Component, signal } from '@angular/core';
import { UserData } from '../../types/UserData';
import { SearchFormComponent } from '../search-form/search-form.component';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-search',
  imports: [
    SearchFormComponent,
    SearchResultsComponent
  ],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  results = signal<UserData[]>([]);
}
