import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PontoColeta } from '../models/ponto-coleta.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PontoColetaService {
  private apiUrl = `${environment.apiUrl}/ponto-coleta`;

  constructor(private http: HttpClient) { }

  listarPontosColeta(): Observable<PontoColeta[]> {
    return this.http.get<PontoColeta[]>(this.apiUrl);
  }

  getPontoColeta(id: number): Observable<PontoColeta> {
    return this.http.get<PontoColeta>(`${this.apiUrl}/${id}`);
  }

  buscarPorBairro(bairroId: number): Observable<PontoColeta[]> {
    return this.http.get<PontoColeta[]>(`${this.apiUrl}/bairro/${bairroId}`);
  }

  buscarPorResiduo(residuoId: number): Observable<PontoColeta[]> {
    return this.http.get<PontoColeta[]>(`${this.apiUrl}/residuo/${residuoId}`);
  }

  criarPontoColeta(pontoColeta: PontoColeta): Observable<PontoColeta> {
    return this.http.post<PontoColeta>(this.apiUrl, pontoColeta);
  }

  atualizarPontoColeta(id: number, pontoColeta: PontoColeta): Observable<PontoColeta> {
    return this.http.put<PontoColeta>(`${this.apiUrl}/${id}`, pontoColeta);
  }

  deletarPontoColeta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 