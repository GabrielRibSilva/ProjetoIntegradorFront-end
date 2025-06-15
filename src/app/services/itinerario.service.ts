import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itinerario } from '../models/itinerario.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItinerarioService {
  private apiUrl = environment.apiUrl + '/itinerarios';

  constructor(private http: HttpClient) {}

  listarItinerarios(): Observable<Itinerario[]> {
    return this.http.get<Itinerario[]>(this.apiUrl);
  }

  criarItinerario(itinerario: Itinerario): Observable<Itinerario> {
    return this.http.post<Itinerario>(this.apiUrl, itinerario);
  }

  editarItinerario(itinerario: Itinerario): Observable<Itinerario> {
    return this.http.put<Itinerario>(`${this.apiUrl}/${itinerario.id}`, itinerario);
  }

  deletarItinerario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 