import { Request, Response, NextFunction, RequestHandler } from "express";
import { CompetenceRepository } from "../repositories/ComptenceRepository";
import { CompetenceService } from "../services/CompetenceService";
import { sequelize } from "../models";

export class CompetenceController{
    private readonly competenceRepo = new CompetenceRepository();
    private readonly comptenceService;

    constructor(){
        this.comptenceService = new CompetenceService(this.competenceRepo);
    }


    /**
     * Handles GET request to retrieve all competences from the database
     * @async
     * @function getAllCompetence
     * @param {Request} _req - Express request object (unused)
     * @param {Response} res - Express response object used to send the competences
     * @param {NextFunction} next - Express next function for error handling
     * @returns {Promise<void>} - Sends JSON response with competences or error
     * @throws {Error} - If there's an error retrieving competences
     */
    getAllCompetence : RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        try{
            const competences = sequelize.transaction(async ()=> {
                return await this.comptenceService.getAllCompetences();
            });
            res.status(200).json({ competences });
        }catch(err){
            next(err);
        }
    }
}
