import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PontoColeta } from '../models/ponto-coleta.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PontoColetaService {
  private endpoint = '/pontosDeColeta';

  constructor(private apiService: ApiService) { }

  listarPontosColeta(): Observable<PontoColeta[]> {
    return this.apiService.get<PontoColeta[]>(this.endpoint);
  }

  buscarPorId(id: number): Observable<PontoColeta> {
    return this.apiService.get<PontoColeta>(`${this.endpoint}/${id}`);
  }

  criarPontoColeta(pontoColeta: PontoColeta): Observable<PontoColeta> {
    return this.apiService.post<PontoColeta>(this.endpoint, pontoColeta);
  }

  editarPontoColeta(pontoColeta: PontoColeta): Observable<PontoColeta> {
    return this.apiService.put<PontoColeta>(this.endpoint, pontoColeta);
  }

  deletarPontoColeta(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
} 