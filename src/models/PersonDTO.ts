import Person from './Person';

export class PersonDTO {
  person_id: number;
  name: string;
  surname: string;
  pnr: string;
  email: string;
  role_id: number;

  constructor(person: Person) {
    this.person_id = person.person_id;
    this.name = person.name;
    this.surname = person.surname;
    this.pnr = person.pnr;
    this.email = person.email;
    this.role_id = person.role_id;
  }
}
