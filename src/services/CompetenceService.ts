import { CompetenceRepository } from "../repositories/ComptenceRepository";

/**
 * Service class for handling competence-related operations
 */
export class CompetenceService{
    private readonly CompetenceRepository : CompetenceRepository;



    constructor (personRepository : CompetenceRepository){
        this.CompetenceRepository = personRepository;
    }


    /**
     * Retrieves all competences
     * @returns {Promise} A promise that resolves with all competences
     */
    async getAllCompetences(){
        try{
            return await this.CompetenceRepository.getAllCompetence();
        }catch (err) {
            console.error(err);
            throw err;
        }
    }

}
