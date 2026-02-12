import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../types/UserData';
import { APP_CONFIG } from '../app.config';


@Injectable({ providedIn: 'root' })
export class SearchService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  searchUserData(query: string): Observable<UserData[]> {
    const url = `${this.config.apiEndpoint}/search?query=${query}`;
    console.log(`Fetch URL: ${url}`);
    return this.http.get<UserData[]>(url);
  }
}