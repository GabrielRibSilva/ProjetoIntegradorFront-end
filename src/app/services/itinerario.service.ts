import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itinerario, ItinerarioDTO } from '../models/itinerario.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {
  private apiUrl = `${environment.apiUrl}/itinerario`;

  constructor(private http: HttpClient) { }

  listarItinerarios(): Observable<Itinerario[]> {
    return this.http.get<Itinerario[]>(this.apiUrl);
  }

  getItinerario(id: number): Observable<Itinerario> {
    return this.http.get<Itinerario>(`${this.apiUrl}/${id}`);
  }

  criarItinerario(itinerarioDTO: ItinerarioDTO): Observable<Itinerario> {
    return this.http.post<Itinerario>(this.apiUrl, itinerarioDTO);
  }

  atualizarItinerario(id: number, itinerario: Itinerario): Observable<Itinerario> {
    return this.http.put<Itinerario>(this.apiUrl, itinerario);
  }

  deletarItinerario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 