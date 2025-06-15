import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private endpoint = '/usuarios';

  constructor(private apiService: ApiService) { }

  listarUsuarios(): Observable<Usuario[]> {
    return this.apiService.get<Usuario[]>(this.endpoint);
  }

  buscarPorEmail(email: string): Observable<Usuario> {
    return this.apiService.get<Usuario>(`${this.endpoint}/login/${email}`);
  }

  criarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.apiService.post<Usuario>(this.endpoint, usuario);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.apiService.put<Usuario>(this.endpoint, usuario);
  }

  deletarUsuario(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
} 