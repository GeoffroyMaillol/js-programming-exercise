import { Component, Input } from '@angular/core';
import { UserData } from '../../types/UserData';
import { UserDataCard } from '../user-data-card/user-data-card';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [UserDataCard],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  @Input({ required: true }) results: UserData[] = [];
}
