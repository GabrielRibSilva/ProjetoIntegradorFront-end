import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Residuo } from '../models/residuo.model';

@Injectable({
  providedIn: 'root'
})
export class ResiduoService {
  private apiUrl = `${environment.apiUrl}/residuo`;

  constructor(private http: HttpClient) {}

  listarResiduos(): Observable<Residuo[]> {
    return this.http.get<Residuo[]>(this.apiUrl);
  }

  criarResiduo(residuo: Residuo): Observable<Residuo> {
    return this.http.post<Residuo>(this.apiUrl, residuo);
  }

  atualizarResiduo(residuo: Residuo): Observable<Residuo> {
    return this.http.put<Residuo>(this.apiUrl, residuo);
  }

  excluirResiduo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 