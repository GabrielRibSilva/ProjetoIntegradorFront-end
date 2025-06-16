import { Usuario } from './trash.model';
import { Caminhao } from './caminhao.model';
import { Rota } from './rota.model';
import { Residuo } from './trash.model';

export interface Itinerario {
  id: number;
  responsavel: Usuario;
  caminhao: Caminhao;
  rota: Rota;
  dataExecucao: string;
  residuo: Residuo;
}

export interface ItinerarioDTO {
  responsavelId: number;
  caminhaoId: number;
  origemId: number;
  destinoId: number;
  dataExecucao: string;
  residuoId: number;
} 