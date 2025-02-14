import { IPersonRepository } from "./contracts/IPersonRepository";
import { Person } from "../model";

export class PersonRepository implements IPersonRepository {
    async findUserByUsername(username: string) {
        return Person.findOne({ where: { username } });
    }
}