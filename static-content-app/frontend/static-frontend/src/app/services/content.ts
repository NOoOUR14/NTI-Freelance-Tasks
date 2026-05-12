import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private apiUrl = 'http://localhost:3000/api/content';

  constructor(private http: HttpClient) {}

  getContent() {
    return this.http.get<any>(this.apiUrl);
  }
}
