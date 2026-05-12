import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/users';

  users = signal<User[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  searchTerm = signal<string>('');

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.users();

    return this.users().filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  });

  fetchUsers() {
    this.loading.set(true);
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap((data) => {
        this.users.set(data);
        this.loading.set(false);
      }),
      catchError((err) => {
        this.error.set('Server connection failed');
        this.loading.set(false);
        return throwError(() => err);
      })
    );
  }
}
