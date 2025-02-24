import { ICompetenceProfileRepository } from "./contracts/ICompetenceProfileRepository";
import { CompetenceProfile, Competence } from "../models";
import { CompetenceProfileDTO } from "../models/CompetenceProfileDTO";

/**
 * Repository class for handling competence profile-related database operations
 */
export class CompetenceProfileRepository implements ICompetenceProfileRepository{

    /**
     * Retrieves competence profiles for a specific person
     * @param {number} person_id - The ID of the person to retrieve competence profiles for
     * @returns {Promise<CompetenceProfileDTO[]>} A promise that resolves with an array of competence profile DTOs
     */
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

    /**
     * Adds multiple competence profile records for a person
     * @param {number} person_id - The ID of the person to add competence profiles for
     * @param {Array<{ competence_id: number; years_of_experience: number }>} competences - Array of competence profile objects
     * @returns {Promise} A promise that resolves when the competence profiles are added
     */
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
