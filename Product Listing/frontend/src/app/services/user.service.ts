import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, ApiResponse } from '../models/user.model';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/users';

  users = signal<User[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  fetchUsers() {
    this.loading.set(true);
    return this.http.get<ApiResponse<User[]>>(this.apiUrl).pipe(
      tap((res) => {
        this.users.set(res.data);
        this.loading.set(false);
      }),
      catchError((err) => {
        this.error.set('Failed to fetch users');
        this.loading.set(false);
        return throwError(() => err);
      })
    );
  }

  getUser(id: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User) {
    return this.http.post<ApiResponse<User>>(this.apiUrl, user).pipe(
      tap((res) => this.users.update(users => [res.data, ...users]))
    );
  }

  updateUser(id: string, user: User) {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/${id}`, user).pipe(
      tap((res) => {
        this.users.update(users => users.map(u => u._id === id ? res.data : u));
      })
    );
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.users.update(users => users.filter(u => u._id !== id));
      })
    );
  }
}
