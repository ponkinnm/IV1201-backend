import { Competence } from "../models";
import { ICompetenceRepository } from "./contracts/ICompetenceRepository";

/**
 * Repository class for handling competence-related database operations
 */
export class CompetenceRepository implements ICompetenceRepository{

    /**
     * Retrieves all competences from the database
     * @returns {Promise<Competence[]>} A promise that resolves with an array of Competence objects
     */
    async getAllCompetence(): Promise<Competence[]> {
        const competence =  await Competence.findAll();
        return competence;
    }
}
