import { IPersonRepository } from "./contracts/IPersonRepository";
import { Person } from "../models";
import {PersonDTO} from '../models/PersonDTO';

export class PersonRepository implements IPersonRepository {
    async findUserByUsername(username: string) {
        return Person.findOne({ where: { username } });
    }

    async getUserDetailById(person_id : number){

        const person = await Person.findByPk(person_id);

        const personDTO = new PersonDTO(
            person!.person_id,
            person!.name,
            person!.surname,
            person!.pnr,
            person!.email
        );

        return personDTO;

    }
}