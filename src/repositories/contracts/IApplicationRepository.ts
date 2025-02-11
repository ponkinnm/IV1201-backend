import { Application } from "../../models/Application";

export interface IApplicationRepository {
    getAllApplications(): Promise<Application[]>;
    findUser(username: string, password: string): Promise<any>; // Should add a model for a user instead of any
}