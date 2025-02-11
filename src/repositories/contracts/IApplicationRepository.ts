import { Application } from "../../models/Application";

export interface IApplicationRepository {
    getAllApplications(): Promise<Application[]>;
}