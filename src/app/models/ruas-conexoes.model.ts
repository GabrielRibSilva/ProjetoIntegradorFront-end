import { Bairro } from './trash.model';

export interface RuasConexoes {
  id: number;
  bairroOrigem: Bairro;
  bairroDestino: Bairro;
  distancia: number;
} 