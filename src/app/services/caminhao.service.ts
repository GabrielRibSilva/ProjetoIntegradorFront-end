import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caminhao } from '../models/caminhao.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaminhaoService {
  private apiUrl = `${environment.apiUrl}/caminhao`;

  constructor(private http: HttpClient) { }

  listarCaminhoes(): Observable<Caminhao[]> {
    return this.http.get<Caminhao[]>(this.apiUrl);
  }

  obterCaminhao(id: number): Observable<Caminhao> {
    return this.http.get<Caminhao>(`${this.apiUrl}/${id}`);
  }

  buscarPorPlaca(placa: string): Observable<Caminhao> {
    return this.http.get<Caminhao>(`${this.apiUrl}/placa/${placa}`);
  }

  buscarPorTipoResiduo(residuoId: number): Observable<Caminhao[]> {
    return this.http.get<Caminhao[]>(`${this.apiUrl}/residuo/${residuoId}`);
  }

  criarCaminhao(caminhao: Caminhao): Observable<Caminhao> {
    return this.http.post<Caminhao>(this.apiUrl, caminhao);
  }

  atualizarCaminhao(id: number, caminhao: Caminhao): Observable<Caminhao> {
    return this.http.put<Caminhao>(`${this.apiUrl}/${id}`, caminhao);
  }

  deletarCaminhao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCaminhao(id: number): Observable<Caminhao> {
    return this.http.get<Caminhao>(`${this.apiUrl}/${id}`);
  }
} 