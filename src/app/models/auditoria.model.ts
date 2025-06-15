import { Usuario } from './usuario.model';

export interface Auditoria {
  id: number;
  dataOcorrencia: string;
  descricaoOcorrencia: string;
  operacao: string;
  tabela: string;
  usuario: Usuario;
  idEntidade?: number;
} 