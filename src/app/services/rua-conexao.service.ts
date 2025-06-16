import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RuaConexao } from '../models/rua-conexao.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RuaConexaoService {
  private apiUrl = `${environment.apiUrl}/ruas-conexoes`;

  constructor(private http: HttpClient) { }

  getRuasConexoes(): Observable<RuaConexao[]> {
    return this.http.get<RuaConexao[]>(this.apiUrl);
  }

  getRuaConexao(id: number): Observable<RuaConexao> {
    return this.http.get<RuaConexao>(`${this.apiUrl}/${id}`);
  }

  criarRuaConexao(ruaConexao: RuaConexao): Observable<RuaConexao> {
    return this.http.post<RuaConexao>(this.apiUrl, ruaConexao);
  }

  atualizarRuaConexao(id: number, ruaConexao: RuaConexao): Observable<RuaConexao> {
    return this.http.put<RuaConexao>(`${this.apiUrl}/${id}`, ruaConexao);
  }

  deletarRuaConexao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 