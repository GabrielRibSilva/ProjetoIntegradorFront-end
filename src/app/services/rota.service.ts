import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rota } from '../models/rota.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RotaService {
  private apiUrl = `${environment.apiUrl}/rota`;

  constructor(private http: HttpClient) { }

  listarRotas(): Observable<Rota[]> {
    return this.http.get<Rota[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Rota> {
    return this.http.get<Rota>(`${this.apiUrl}/${id}`);
  }

  criarRota(rota: Rota): Observable<Rota> {
    return this.http.post<Rota>(this.apiUrl, rota);
  }

  editarRota(rota: Rota): Observable<Rota> {
    return this.http.put<Rota>(this.apiUrl, rota);
  }

  deletarRota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 