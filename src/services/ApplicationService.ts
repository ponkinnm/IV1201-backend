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
}