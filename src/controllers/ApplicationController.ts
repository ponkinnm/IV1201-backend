import { ApplicationService } from "../services/ApplicationService";
import { ApplicationRepository } from "../repositories/ApplicationRepository";
import { RequestHandler } from "express";
import  sequelize  from "../config/dbsetup";



export class ApplicationController {
    private applicationService: ApplicationService;
    private applicationRepository = new ApplicationRepository();

    constructor() {
        this.applicationService = new ApplicationService(this.applicationRepository);
    }

    getAllApplications: RequestHandler = async (_req, res, next) => {
        try {
          const applications = await sequelize.transaction(async () => {
            return await this.applicationService.getAllApplications();
          });
    
          res.json(applications);
        } catch (err) {
          next(err); 
        }
      };
}