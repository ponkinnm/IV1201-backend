import { ApplicationService } from "../services/ApplicationService";
import { ApplicationRepository } from "../repositories/ApplicationRepository";
import { RequestHandler } from "express";

export class ApplicationController {
    private applicationService: ApplicationService;
    private applicationRepository = new ApplicationRepository();

    constructor() {
        this.applicationService = new ApplicationService(this.applicationRepository);
    }

    getAllApplications: RequestHandler = async (_req, res, next) => {
        try {
            const applications = await this.applicationService.getAllApplications();
            res.json(applications);
        } catch (err) {
            next(err);
        }
    }
    login: RequestHandler = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await this.applicationService.login(username, password);
            console.log(user)
            res.json(user);
        } catch (err) {
            next(err);
        }
    }
}