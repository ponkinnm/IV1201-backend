import { Status } from '../models';
import { IStatusRepository } from './contracts/IStatusRepository';

/**
 * Repository class for handling status-related database operations
 */
export class StatusRepository implements IStatusRepository {
  /**
   * Retrieves all statuses from the database
   * @returns {Promise<Status[]>} A promise that resolves with an array of Status objects
   */
  async getAllStatus(): Promise<Status[]> {
    return await Status.findAll();
  }
}
