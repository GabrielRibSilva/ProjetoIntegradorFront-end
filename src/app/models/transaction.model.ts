import { Company } from "./company.model";
import { Trash } from "./trash.model";
import { User } from "./user.model";

export interface Transaction {
  id?: number;
  user: User;
  company: Company;
  trash: Trash;
  weight: number;
  pointsGenerated?: number;
  transactionDate?: string;
}