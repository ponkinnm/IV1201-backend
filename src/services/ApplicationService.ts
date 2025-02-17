import { IApplicationRepository } from "../repositories/contracts/IApplicationRepository";

export class ApplicationService {
    private applicationRepository: IApplicationRepository;

    constructor(applicationRepository: IApplicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    async getAllApplications() {
        try {
            return await this.applicationRepository.getAllApplications();
        } catch (err) {
            console.error(err);
            throw new Error('Failed to get applications');
        }
    }

    async getApplicationDetailsById(application_id : number){
        try{
            return await this.applicationRepository.getApplicationDetailsById(application_id);
        } catch(err){
            console.error(err);
            throw new Error('Failed to get application details');
        }
    }

    async updateApplicationStatus(application_id:number, new_status_id : number){
        try{
            return await this.applicationRepository.updateApplicationStatus(application_id,  new_status_id);
        } catch(err){
            console.error(err);
            throw new Error('Failed to update application');
        }
    }
}