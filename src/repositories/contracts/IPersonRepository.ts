import { Person } from "../../model";

export interface IPersonRepository {
  findUserByUsername(username: string): Promise<Person | null>;
}
