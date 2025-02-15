import { ApplicationDetailDTO } from "../../models/ApplicationDetailsDTO";
import { ApplicationDTO } from "../../models/ApplicationDTO";
import { Transaction } from "sequelize";

export interface IApplicationRepository {
    getAllApplications(): Promise<ApplicationDTO[]>;
    getApplicationDetailsById(personId: number): Promise<ApplicationDetailDTO>;
}
