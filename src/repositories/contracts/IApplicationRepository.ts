import { Application } from "../../models";
import { ApplicationDetailsDTO } from "../../models/ApplicationDetailsDTO";
import { ApplicationDTO } from "../../models/ApplicationDTO";
import { Transaction } from "sequelize";

export interface IApplicationRepository {
    getAllApplications(): Promise<ApplicationDTO[]>;
    getApplicationDetailsById(application_id: number): Promise<ApplicationDetailsDTO | undefined>;
    updateApplicationStatus(application_id: number, new_status_id : number): Promise<Application | null | undefined>;
    
}
