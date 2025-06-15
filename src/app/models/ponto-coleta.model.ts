import { Bairro } from './bairro.model';
import { Usuario } from './usuario.model';

export interface PontoColeta {
  id: number;
  bairro: Bairro | { id: number };
  nome: string;
  usuario: Usuario | { id: number };
  endereco: string;
  horarioFuncionamento: string;
  residuosAceitaveis: string;
} 