import { IPersonRepository } from "./contracts/IPersonRepository";
import { PersonDTO } from '../models/PersonDTO';
import { Person } from "../models";

const personStubs = [
  {
    person_id: 1,
    name: 'John',
    surname: 'Doe',
    pnr: '1234567890',
    email: 'test@test.com',
    password: 'password',
    role_id: 1,
    username: 'johndoe',
  },
].map(stub => Person.build(stub));

export class MockPersonRepository implements IPersonRepository {
  async findUserByUsername(username: string) {
    return personStubs.find(person => person.username === username) || null;
  }

  async findUserByEmail(email: string) {
    return personStubs.find(person => person.email === email) || null;
  }

  async getUserDetailById(person_id: number) {
    const person = personStubs.find(person => person.person_id === person_id);
    if (!person) {
      return null;
    }

    return new PersonDTO(person);
  }
}
