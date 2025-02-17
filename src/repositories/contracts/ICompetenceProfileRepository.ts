import { CompetenceProfileDTO } from "../../models/CompetenceProfileDTO";

export interface ICompetenceProfileRepository{

    getCompetenceProfileById(person_id : number): Promise<CompetenceProfileDTO[]>;
}