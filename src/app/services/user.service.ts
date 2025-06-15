import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> { return this.http.get<User[]>(this.apiUrl); }
  getById(id: number): Observable<User> { return this.http.get<User>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`); }
  create(data: User): Observable<User> { return this.http.post<User>(this.apiUrl, data); }
  update(id: number, data: User): Observable<User> { return this.http.put<User>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`, data); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`); }
}