export interface Residuo {
  id: number;
  tipo: string;
  pontosDeColeta?: PontoColeta[];
}

export interface PontoColeta {
  id: number;
  nome: string;
  endereco: string;
  horarioFuncionamento: string;
  bairro: Bairro;
  usuario?: Usuario;
  residuo: Residuo;
}

export interface Bairro {
  id: number;
  nome: string;
  pontosDeColeta?: PontoColeta[];
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}