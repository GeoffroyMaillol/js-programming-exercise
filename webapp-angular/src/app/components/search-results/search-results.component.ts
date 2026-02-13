import { Component, Input, signal } from '@angular/core';
import { UserData } from '../../types/UserData';
import { NgFor, NgIf } from '@angular/common';
import { UserDataCard } from '../user-data-card/user-data-card';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [NgIf, NgFor, UserDataCard],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  @Input({ required: true }) results = signal<UserData[]>([]);
}
