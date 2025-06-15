import { Caminhao } from './caminhao.model';
import { Usuario } from './usuario.model';
import { Rota } from './rota.model';

export interface Itinerario {
  id: number;
  data_execucao: string;
  tipos_residuo: string;
  caminhao: Caminhao;
  usuario: Usuario;
  rota: Rota;
} 