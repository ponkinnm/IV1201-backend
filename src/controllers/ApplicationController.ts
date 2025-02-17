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

    getAllApplications: RequestHandler = async (req, res, next) => {
        try {
          console.log('token:', req.cookies.accessToken);
        console.log('decoded user:', req.user);
        // we should be able to check things with eg req.user.role_id); 
        //however we need to add this to the jwt token
          const applications = await sequelize.transaction(async () => {
            return await this.applicationService.getAllApplications();
          });
    
          res.json(applications);
        } catch (err) {
          next(err); // Automatically rolls back on error
        }
      };


      getApplicationDetailsById : RequestHandler = async (_req, res , next) => {
        try{
          const application_id = parseInt(_req.params.application_id, 10);
          const applicationDetail = await sequelize.transaction(async () =>{
              return await this.applicationService.getApplicationDetailsById(application_id);
          });

          if (!applicationDetail) {
            res.status(404).json({ error: 'Application not found' });
          }else
              res.json(applicationDetail);
        } catch(err){
          next(err); // Automatically rolls back on error
        }
      };
      /**
       * 
       * @param _req request from user, contain the application_id and the new status id
       * @param res  response with the updated row
       * @param next 
       */
      updateApplicationStatus: RequestHandler = async (_req, res, next) => {
        try{
          const application_id = parseInt(_req.params.application_id, 10);

          // Get new_status_id from the request body
          const { new_status_id } = _req.body;

          const updatedRow = await sequelize.transaction( async () => {
            return await this.applicationService.updateApplicationStatus(application_id, new_status_id);
          });
          if(!updatedRow){
            res.status(404).json({error: ' filed to update status '});
          }
            res.json(updatedRow);
        }catch(err){
          next(err);
        }
      }
}