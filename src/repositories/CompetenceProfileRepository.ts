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

    async addNewCompetenceProfile(
        person_id: number,
        competences: Array<{ competence_id: number; years_of_experience: number }>
    ) {
        try {
            // Bulk insert competences for the given person_id
            const insertedCompetences = await CompetenceProfile.bulkCreate(
                competences.map((comp) => ({
                    person_id,
                    competence_id: comp.competence_id,
                    years_of_experience: comp.years_of_experience,
                }))
            );

            return insertedCompetences;
        } catch (error) {
            console.error('Error adding new competence profiles:', error);
            throw new Error('Failed to add new competence profiles.');
        }
    }
}