import { Person } from "../../models";
import { PersonDTO } from "../../models/PersonDTO";


export interface IPersonRepository {
  findUserByUsername(username: string): Promise<Person | null>;
  findUserByEmail(email: string): Promise<Person | null>;
  getUserDetailById(person_id : number): Promise<PersonDTO | null>;
}
