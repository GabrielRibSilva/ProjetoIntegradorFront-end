import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bairro } from '../models/bairro.model';
import { PontoColeta } from '../models/ponto-coleta.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BairroService {
  private endpoint = '/bairro';

  constructor(private apiService: ApiService) { }

  listarBairros(): Observable<Bairro[]> {
    return this.apiService.get<Bairro[]>(this.endpoint);
  }

  buscarPorId(id: number): Observable<Bairro> {
    return this.apiService.get<Bairro>(`${this.endpoint}/${id}`);
  }

  buscarPorNome(nome: string): Observable<Bairro> {
    return this.apiService.get<Bairro>(`${this.endpoint}/nome/${nome}`);
  }

  listarPontosDeColeta(id: number): Observable<PontoColeta[]> {
    return this.apiService.get<PontoColeta[]>(`${this.endpoint}/${id}/pontos-de-coleta`);
  }

  criarBairro(bairro: Bairro): Observable<Bairro> {
    return this.apiService.post<Bairro>(this.endpoint, bairro);
  }

  editarBairro(bairro: Bairro): Observable<Bairro> {
    return this.apiService.put<Bairro>(this.endpoint, bairro);
  }

  deletarBairro(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
} 