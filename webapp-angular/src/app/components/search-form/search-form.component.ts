import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserData } from '../../types/UserData';
import { SearchService } from '../../services/userdata.search.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  query = '';
  results = signal<UserData[]>([]);
  resultsChange = output<UserData[]>();
  
  constructor(private searchService: SearchService) {}

  onSearch() {
    console.log('Searching for:', this.query);
    if (!this.query.trim()) return;

    this.searchService.searchUserData(this.query).subscribe(items => {
      this.results.set(items);
      this.resultsChange.emit(items);
    });

  }
}
