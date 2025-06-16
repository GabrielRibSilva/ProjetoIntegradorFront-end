import { Residuo } from './trash.model';

export interface Caminhao {
  id: number;
  placa: string;
  capacidade_maxima: number;
  residuosTransportados: Residuo[];
} 