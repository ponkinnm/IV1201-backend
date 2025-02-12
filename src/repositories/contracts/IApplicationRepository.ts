import  Application  from "../../models/Applications";

export interface IApplicationRepository {
    getAllApplications(): Promise<Application[]>;
}