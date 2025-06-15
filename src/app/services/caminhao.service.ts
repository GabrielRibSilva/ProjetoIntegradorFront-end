import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caminhao } from '../models/caminhao.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CaminhaoService {
  private endpoint = '/caminhoes';

  constructor(private apiService: ApiService) { }

  listarCaminhoes(): Observable<Caminhao[]> {
    return this.apiService.get<Caminhao[]>(this.endpoint);
  }

  obterCaminhao(id: number): Observable<Caminhao> {
    return this.apiService.get<Caminhao>(`${this.endpoint}/${id}`);
  }

  buscarPorPlaca(placa: string): Observable<Caminhao> {
    return this.apiService.get<Caminhao>(`${this.endpoint}/placa/${placa}`);
  }

  criarCaminhao(caminhao: Caminhao): Observable<Caminhao> {
    return this.apiService.post<Caminhao>(this.endpoint, caminhao);
  }

  editarCaminhao(caminhao: Caminhao): Observable<Caminhao> {
    return this.apiService.put<Caminhao>(this.endpoint, caminhao);
  }

  deletarCaminhao(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
} 