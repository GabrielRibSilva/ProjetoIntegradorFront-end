import { Bairro } from './bairro.model';

export interface Rota {
  id: number;
  bairrosVisitados: Bairro[];
  distancia: number;
} 