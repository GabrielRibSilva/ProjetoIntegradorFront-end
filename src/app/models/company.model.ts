import { Address } from "./address.model";

export interface Company {
  id?: number;
  name: string;
  cnpj: string;
  email: string;
  address: Address;
}