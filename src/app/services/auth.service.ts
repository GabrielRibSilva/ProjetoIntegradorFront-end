import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.isLoggedInSubject.next(true);
    }
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(response => {
        console.log('Resposta do login:', response);
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  register(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario).pipe(
      tap(response => {
        console.log('Resposta do registro:', response);
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    console.log('Verificando autenticação:', currentUser);
    const isAuthenticated = !!currentUser;
    this.isLoggedInSubject.next(isAuthenticated);
    return isAuthenticated;
  }

  getToken(): string | null {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      return user.token;
    }
    return null;
  }
} 