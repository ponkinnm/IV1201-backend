import { ApplicationService } from "../services/ApplicationService";
import { ApplicationRepository } from "../repositories/ApplicationRepository";
import { Request, Response, NextFunction, RequestHandler } from "express";
import sequelize from "../config/dbsetup";
import { AuthService } from "../services/AuthService";

export class ApplicationController {
    private readonly applicationService: ApplicationService;
    private readonly applicationRepository = new ApplicationRepository();

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
          if(!AuthService.isRecruiter(req.user)) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
          }
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
          }else if(!(AuthService.isRecruiter(req.user) || applicationDetail.person.person_id === req.user!.person_id)){
            res.status(401).json({ error: 'Unauthorized' });
          } else {
            res.json(applicationDetail);
          }

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

          if(!AuthService.isRecruiter(req.user)){
            res.status(401).json({error: 'Unauthorized'});
            return;
          }
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
      /**
       * Handles POST request to submit a new application
       * @async
       * @function submitApplication
       * @param {Request} req - Express request object containing application data in body
       * @param {Response} res - Express response object
       * @param {NextFunction} next - Express next function for error handling
       * @returns {Promise<void>} - Sends JSON response with submitted application or error
       * @throws {Error} - If there's an error submitting the application
       * @property {Array<{competence_id: number, years_of_experience: number}>} req.body.competenceProfile - Array of competence profiles
       * @property {Array<{from_date: Date, to_date: Date}>} req.body.availabilities - Array of availability periods
       */
      submitApplication: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          // Get person_id from the authenticated user instead of request body
          const person_id = req.user!.person_id;

          
          const { competenceProfile, availabilities } = req.body;
          
          const submittedApplication = await sequelize.transaction(async () => {
            return await this.applicationService.submitApplication(person_id, availabilities, competenceProfile);
          });
          
         
          if (!submittedApplication) {
            // Application already exists or submission failed
            res.status(409).json({ 
              success: false, 
              message: "You have already submitted an application ."
            });
            return;
          }
          
          res.status(200).json(submittedApplication);
        }catch(err){
          next(err);
        }
      }
}
