export class PersonDTO{
    person_id!: number;
    name!: string;
    surname!: string;
    pnr!: string;
    email!: string;
    //role_id!: number;


    constructor(person_id: number, name: string, surname: string, pnr : string, email: string){
        this.person_id = person_id;
        this.name = name;
        this.surname = surname;
        this.pnr = pnr;
        this.email = email;
    }
}