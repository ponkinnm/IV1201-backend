import { ICompetenceProfileRepository } from "./contracts/ICompetenceProfileRepository";
import { CompetenceProfile, Competence } from "../models";
import { CompetenceProfileDTO } from "../models/CompetenceProfileDTO";

export class CompetenceProfileRepository implements ICompetenceProfileRepository{

    async getCompetenceProfileById(person_id : number){

        const competences = await CompetenceProfile.findAll({where: {person_id},
            include: [
                {
                    model: Competence,
                    as: 'Competence',
                    attributes : ['name']
                }

            ],});

        const competenceProfileDTO : CompetenceProfileDTO[] = competences.map((app) =>
            new CompetenceProfileDTO (
                app.Competence!.name,
                app.years_of_experience
            )
        );

        return competenceProfileDTO;

    }
}