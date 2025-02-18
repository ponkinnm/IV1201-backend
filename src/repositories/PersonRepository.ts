import { IPersonRepository } from "./contracts/IPersonRepository";
import { Person, Role } from "../models";
import {PersonDTO} from '../models/PersonDTO';


export class PersonRepository implements IPersonRepository {
    async findUserByUsername(username: string) {
        return Person.findOne({ where: { username } });
    }

    async getUserDetailById(person_id : number){

        const person = await Person.findByPk(person_id,
            {
                include: [ {model : Role, attributes: ['name']}]
            }
        );

        const personDTO = new PersonDTO(
            person!.person_id,
            person!.name,
            person!.surname,
            person!.pnr,
            person!.email,
            person!.role_id
        );

        return personDTO;

    }
}