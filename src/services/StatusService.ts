import { StatusRepository } from "../repositories/StatusRepository";

/**
 * Service class for handling status-related operations
 */
export class StatusService{
    private readonly statusRepo : StatusRepository;

    constructor(statusRepo : StatusRepository){
        this.statusRepo = statusRepo;
    }


    /**
     * Retrieves all statuses
     * @returns {Promise} A promise that resolves with all statuses
     */
    async getAllStatus(){
        try{
            return await this.statusRepo.getAllStatus();
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}
