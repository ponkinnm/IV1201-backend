import { StatusRepository } from '../repositories/StatusRepository';
import { StatusService } from '../services/StatusService';
import sequelize from '../config/dbsetup';
import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Controller handling status-related requests.
 * Main purpose is to provide a list of statuses to be used in dropdowns
 */

export class StatusController {
  private readonly statusRepo: StatusRepository = new StatusRepository();
  private readonly statusService: StatusService;

  constructor() {
    this.statusService = new StatusService(this.statusRepo);
  }

  /**
   * Handles GET request to retrieve all statuses
   * @async
   * @function getAllStatus
   * @param {Request} _req - Express request object (unused)
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function for error handling
   * @returns {Promise<void>} - Sends JSON response with status list or error
   * @throws {Error} - If there's an error retrieving statuses
   */
  getAllStatus: RequestHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const statusList = await sequelize.transaction(async () => {
        return await this.statusService.getAllStatus();
      });

      res.status(200).json(statusList);
    } catch (err) {
      next(err);
    }
  };
}
