export interface RuaConexao {
  id: number;
  distancia: number;
  bairro_origem: { id: number; nome: string };
  bairro_destino: { id: number; nome: string };
} 