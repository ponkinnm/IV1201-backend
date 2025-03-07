import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PersonRepository } from '../repositories/PersonRepository';
import { PersonService } from '../services/PersonService';
import sequelize from '../config/dbsetup';
/**
 * Controller handling person-related requests.
 * Manages user operations including:
 * - Creating new users
 * - Updating user credentials (username/password)
 * - Updating user email
 * - Retrieving user details
 */
export class PersonController {
  private readonly personRepo: PersonRepository = new PersonRepository();
  private readonly personService: PersonService;

  constructor() {
    this.personService = new PersonService(this.personRepo);
  }

  /**
   * Handles POST request to add a new user
   * @async
   * @function addNewUser
   * @param {Request} req - Express request object containing user details in body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function for error handling
   * @returns {Promise<void>} - Sends JSON response with added user or error
   * @throws {Error} - If there's an error adding the user
   */
  addNewUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, surname, pnr, email, username, password, role_id } =
        req.body;
      const addedUser = await sequelize.transaction(async () => {
        return await this.personService.addNewUser(
          name,
          surname,
          pnr,
          email,
          username,
          password,
          role_id
        );
      });

      res.status(201).json(addedUser);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Handles PUT request to update username and password
   * @async
   * @function UpdateUserNameAndPassword
   * @param {Request} req - Express request object containing person_id, username and password in body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function for error handling
   * @returns {Promise<void>} - Sends JSON response with updated user or error
   * @throws {Error} - If there's an error updating the user
   */
  UpdateUserNameAndPassword: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { person_id, username, password } = req.body;
      const updatedUser = await sequelize.transaction(async () => {
        return await this.personService.addUsernameAndPassword(
          person_id,
          username,
          password
        );
      });
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Handles PUT request to update email
   * @async
   * @function updateEmail
   * @param {Request} req - Express request object containing person_id and email in body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function for error handling
   * @returns {Promise<void>} - Sends JSON response with updated user or error
   * @throws {Error} - If there's an error updating the email
   */
  updateEmail: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { person_id, email } = req.body;

      const updatedUser = await sequelize.transaction(async () => {
        return await this.personService.addNewEmail(person_id, email);
      });

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Handles GET request to retrieve user details by ID
   * @async
   * @function getUserDetailsById
   * @param {Request} req - Express request object containing person_id in body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function for error handling
   * @returns {Promise<void>} - Sends JSON response with user details or error
   * @throws {Error} - If there's an error retrieving user details
   */
  getUserDetailsById: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { person_id } = req.body;

      const user = await sequelize.transaction(async () => {
        return await this.personService.getUserDetailsById(person_id);
      });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
}
