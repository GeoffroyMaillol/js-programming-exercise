import { Component, output, signal, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { UserData } from '../../types/UserData';
import { SearchService } from '../../services/userdata.search.service';
import { Observable, of, startWith, switchMap } from 'rxjs';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocomplete,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @ViewChild(MatAutocompleteTrigger) autoCompletePanelTrigger!: MatAutocompleteTrigger;

  query = '';
  results = signal<UserData[]>([]);
  resultsChange = output<UserData[]>();
  
  constructor(private searchService: SearchService) {}

  autoCompleteControl = new FormControl('');
  autoCompleteData = this.autoCompleteControl.valueChanges.pipe(
    startWith(''),
    switchMap(value => {
      const searchString = typeof value === 'string' ? value : '';
      if (searchString.length < 2) {
        return of([]);
      }

      return this.getUserData(searchString);
    })
  );

  private getUserData(value: string): Observable<UserData[]> {
    return this.searchService.searchUserData(value.toLowerCase());
  }

  onSearch() {
    console.log('Searching for:', this.query);
    this.autoCompletePanelTrigger.closePanel();
    if (!this.query.trim()) {
      this.searchService.getAllUserData().subscribe(items => {
        this.results.set(items);
        this.resultsChange.emit(items);
      });
    } else {
      this.searchService.searchUserData(this.query).subscribe(items => {
        this.results.set(items);
        this.resultsChange.emit(items);
      });
    }
  }

  onUserSelected(user: UserData) {
    this.autoCompleteControl.setValue(''); // we don't want to populate the input
    this.searchService.searchUserDataById(user.id).subscribe(items => {
      this.results.set([items]);
      this.resultsChange.emit([items]);
    });
  }

}
