import { ApplicationService } from "../services/ApplicationService";
import { ApplicationRepository } from "../repositories/ApplicationRepository";
import { Request, Response, NextFunction, RequestHandler } from "express";
import  sequelize  from "../config/dbsetup";



export class ApplicationController {
    private applicationService: ApplicationService;
    private applicationRepository = new ApplicationRepository();

    constructor() {
        this.applicationService = new ApplicationService(this.applicationRepository);
    }

    /**
     * Handles GET request to retrieve all applications
     * @async
     * @function getAllApplications
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {NextFunction} next - Express next function for error handling
     * @returns {Promise<void>} - Sends JSON response with applications or error
     * @throws {Error} - If there's an error retrieving applications
     */
    getAllApplications: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          console.log('token:', req.cookies.accessToken);
        console.log('decoded user:', req.user);
        // we should be able to check things with eg req.user.role_id); 
        //however we need to add this to the jwt token
          const applications = await sequelize.transaction(async () => {
            return await this.applicationService.getAllApplications();
          });
    
          res.status(200).json(applications);
        } catch (err) {
          next(err); // Automatically rolls back on error
        }
      };


      /**
       * Handles GET request to retrieve details of a specific application
       * @async
       * @function getApplicationDetailsById
       * @param {Request} req - Express request object containing application_id in params
       * @param {Response} res - Express response object
       * @param {NextFunction} next - Express next function for error handling
       * @returns {Promise<void>} - Sends JSON response with application details or error
       * @throws {Error} - If there's an error retrieving application details
       */
      getApplicationDetailsById : RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
          const application_id = parseInt(req.params.application_id, 10);
          const applicationDetail = await sequelize.transaction(async () =>{
              return await this.applicationService.getApplicationDetailsById(application_id);
          });

          if (!applicationDetail) {
            res.status(404).json({ error: 'Application not found' });
          }else
              res.status(200).json(applicationDetail);
        } catch(err){
          next(err); // Automatically rolls back on error
        }
      };
      /**
       * Handles PUT request to update application status
       * @async
       * @function updateApplicationStatus
       * @param {Request} req - Express request object containing application_id in params and new_status_id in body
       * @param {Response} res - Express response object
       * @param {NextFunction} next - Express next function for error handling
       * @returns {Promise<void>} - Sends JSON response with updated application or error
       * @throws {Error} - If there's an error updating application status
       */
      updateApplicationStatus: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        try{
          const application_id = parseInt(req.params.application_id, 10);

          // Get new_status_id from the request body
          const { new_status_id } = req.body;

          const updatedRow = await sequelize.transaction( async () => {
            return await this.applicationService.updateApplicationStatus(application_id, new_status_id);
          });
          if(!updatedRow){
            res.status(404).json({error: ' filed to update status '});
          }
            res.status(200).json(updatedRow);
        }catch(err){
          next(err);
        }
      }
}
