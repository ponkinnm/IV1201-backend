import  Application  from "../../model/Application";

export interface IApplicationRepository {
    getAllApplications(): Promise<Application[]>;
}