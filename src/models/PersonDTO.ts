import Person from "./Person";

export class PersonDTO {
  person_id: number;
  name: string;
  surname: string;
  pnr: string;
  email: string;
  role_id: number;


/*
    constructor(person_id: number, name: string, surname: string, pnr : string, email: string, role_id: number = 2){
        this.person_id = person_id;
        this.name = name;
        this.surname = surname;
        this.pnr = pnr;
        this.email = email;
        this.role_id = role_id;
    }
}
*/

  constructor(person: Person) {
    this.person_id = person.person_id;
    this.name = person.name;
    this.surname = person.surname;
    this.pnr = person.pnr;
    this.email = person.email;
    this.role_id = person.role_id;
  }
}

