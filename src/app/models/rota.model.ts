import { Bairro } from './trash.model';

export interface Rota {
  id: number;
  bairrosVisitados: Bairro[];
  distancia: number;
  itinerario?: Itinerario;
}

export interface Itinerario {
  id: number;
} 