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

  async addNewUser(name: string, surname: string, pnr: string, email: string, username: string, password: string, role_id: number) { 
    const newUser = Person.build({
        person_id: personStubs.length + 1, // Simulate auto-increment ID
        name,
        surname,
        pnr,
        email,
        username,
        password,
        role_id
    });

    personStubs.push(newUser); // Add to the mock storage

    return newUser; // Return the created user
}
async addNewPassword(person_id: number, new_password: string) {
  const user =  personStubs.find(person => person.person_id === person_id);

  if(!user){
    return null;
  }
  user.password = new_password;
  return user;
  }
  async addNewEmail(person_id :number, new_email: string) { 
    const user =  personStubs.find(person => person.person_id === person_id);

    if(!user){
      return null;
    }
    user.email = new_email;
    return user;
  }
  async addUsernameAndPassword(person_id : number, username: string, password: string) { 
    const user =  personStubs.find(person => person.person_id === person_id);

    if(!user){
      return null;
    }
    user.username = username;
    user.password = password;
    return user;
  
  }
}
