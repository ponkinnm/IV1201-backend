import { Request, Response, NextFunction, RequestHandler } from "express";
import sequelize from "../config/dbsetup";
import { AuthService } from "../services/AuthService";
import {PersonService} from "../services/PersonService";

export class AuthController {
  private personService;
  private authService;

  constructor(authService: AuthService, personService : PersonService) {
    this.authService = authService;
    this.personService =  personService;
  }

  login: RequestHandler = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).send('Missing username or password');
        return;
      }
      const user = await this.authService.findUserAndVerifyPassword(
        username,
        password
      );

      if (!user) {
        res.status(401).send('Invalid username or password');
        return;
      }

      const accessToken = this.authService.generateJwtToken(user);

      res.cookie(this.authService.JWT_COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });

      res.json({
        username: user.username,
        name: user.name,
        id: user.person_id
      });
    } catch (err) {
      next(err);
    }
  };

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
  signup: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, surname, pnr, email, username, password, role_id } = req.body;
        
        const addedUser = await sequelize.transaction(async () => {
            return await this.authService.addNewUser(name, surname, pnr, email, username, password, role_id);
        });

        if (!addedUser) {
            res.status(400).json({ message: "Failed to sign up. Please check your input." });
        }

              // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _password, pnr: _pnr, ...userWithoutSensitiveData } = addedUser;
        res.status(201).json({ user: userWithoutSensitiveData });

    } catch (err) {
        next(err);  // Passes the error to Express error handler
    }
  };
    /**
     * Handles post request to varify a user
     * @async
     * @function varifyUser
     * @param {Request} req - Express request object containing email or username
     * @param {Response} res - Express response object
     * @param {NextFunction} next - Express next function for error handling
     * @returns {Promise<void>} - Sends JSON response with person_id if user exist in database
     * @throws {Error} - If there's an error updating the password
     */
  forgotpassword :  RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{

      const { emailOrUsername } = req.body;
      
      const person = await sequelize.transaction(async () => {
        return await this.personService.findUser(emailOrUsername);
      });

      if(!person){
        res.status(401).send("invalid credential, user not foud")
      }

      res.status(200).send("A mail was sent, check your inbox");

    }catch(err){
      next(err);
    }
  }

      /**
     * Handles PUT request to update password
     * @returns {Promise<void>} - Sends JSON response with updated user or error
     * @throws {Error} - If there's an error updating the password
     */
      updatePassword: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const {person_id , password} = req.body

            await sequelize.transaction(async ()=>{
                return await this.authService.addNewPassword(person_id, password);
            });
            res.status(200).send("password has been updated");
        } catch(err){
            next(err)
        }
    }
}
