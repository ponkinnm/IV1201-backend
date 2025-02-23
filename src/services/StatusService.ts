import { StatusRepository } from "../repositories/StatusRepository";

export class StatusService{
    private readonly statusRepo : StatusRepository;

    constructor(statusRepo : StatusRepository){
        this.statusRepo = statusRepo;
    }


    async getAllStatus(){
        try{
            return await this.statusRepo.getAllStatus();
        }catch(err){
            throw new Error("Field to fetch status from Database")
        }
    }
}