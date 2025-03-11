import { Request, Response, NextFunction, RequestHandler } from 'express';
import { CompetenceService } from '../services/CompetenceService';
import { sequelize } from '../models';

/**
 * Controller handling competence-related requests.
 * Main purpose is to provide a list of competences to be used dropdowns
 */

export class CompetenceController {
  private readonly competenceService;

  constructor(competenceSevice: CompetenceService) {
    this.competenceService = competenceSevice;
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
  getAllCompetence: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const competences = sequelize.transaction(async () => {
        return await this.competenceService.getAllCompetences();
      });
      res.status(200).json({ competences });
    } catch (err) {
      next(err);
    }
  };
}
