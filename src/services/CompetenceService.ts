import { CompetenceRepository } from "../repositories/ComptenceRepository";

export class CompetenceService{
    private CompetenceRepository : CompetenceRepository;



    constructor (personRepository : CompetenceRepository){
        this.CompetenceRepository = personRepository;
    }


    async getAllCompetences(){
        try{
            return await this.CompetenceRepository.getAllCompetence();
        }catch (err) {
            console.error(err);
            throw new Error('Failed to get competence');
        }
    }

}