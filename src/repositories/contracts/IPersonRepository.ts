import { Person } from "../../models";
import { PersonDTO } from "../../models/PersonDTO";


export interface IPersonRepository {
  findUserByUsername(username: string): Promise<Person | null>;
  getUserDetailById(person_id : number): Promise<PersonDTO | null>;

  findUserByEmail(email: string): Promise<Person | null>;
  
  //addNewUser(name: string, surname:string, pnr: number, email: string, username:string, password: string, role_id :number) : Promise<PersonDTO>;
  //addNewPassword(person_id: number, new_password: string) : Promise<Person | null>;
  //addNewEmail(person_id :number, new_email: string): Promise<Person | null>;
  //addUsernameAndPassword(person_id : number, username: string, password: string): Promise<Person | null>;
}
