import { IPersonRepository } from "./contracts/IPersonRepository";
import { Person } from "../models";
import { PersonDTO } from '../models/PersonDTO';

export class PersonRepository implements IPersonRepository {
    async findUserByUsername(username: string) {
        return Person.findOne({ where: { username } });
    }

    async findUserByEmail(email: string) {
        return Person.findOne({ where: { email } });
    }

    async getUserDetailById(person_id : number){

    const person = await Person.findByPk(person_id);
    if (!person) {
      return null;
    }

    return new PersonDTO(person);
  }
}