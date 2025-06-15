import { Address } from "./address.model";

export interface User {
  id?: number;
  name: string;
  cpf: string;
  email: string;
  address: Address;
}