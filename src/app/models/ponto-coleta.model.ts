import { Bairro } from './bairro.model';
import { Usuario } from './usuario.model';
import { Residuo } from './trash.model';

export interface PontoColeta {
  id: number;
  nome: string;
  endereco: string;
  bairro: {
    id: number;
    nome: string;
  };
  usuario: {
    id: number;
    nome: string;
    email: string;
    telefone: string;
  };
  residuo: {
    id: number;
    tipo: string;
  };
} 