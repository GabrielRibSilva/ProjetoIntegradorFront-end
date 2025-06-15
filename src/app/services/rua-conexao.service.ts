import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RuaConexao } from '../models/rua-conexao.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RuaConexaoService {
  private apiUrl = environment.apiUrl + '/ruasConexoes';

  constructor(private http: HttpClient) {}

  listarRuasConexao(): Observable<RuaConexao[]> {
    return this.http.get<RuaConexao[]>(this.apiUrl);
  }

  criarRuaConexao(rua: RuaConexao): Observable<RuaConexao> {
    return this.http.post<RuaConexao>(this.apiUrl, rua);
  }

  editarRuaConexao(rua: RuaConexao): Observable<RuaConexao> {
    return this.http.put<RuaConexao>(`${this.apiUrl}/${rua.id}`, rua);
  }

  deletarRuaConexao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 