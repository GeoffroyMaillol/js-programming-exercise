import { Component, Input, signal } from '@angular/core';
import { UserData } from '../types/UserData';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-results',
  imports: [NgIf, NgFor],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  @Input({ required: true }) results = signal<UserData[]>([]);
}
