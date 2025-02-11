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
}