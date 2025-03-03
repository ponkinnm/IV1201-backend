import { Request, Response, NextFunction, RequestHandler } from 'express';
import sequelize from '../config/dbsetup';
import { AuthService } from '../services/AuthService';

export class AuthController {
  private authService;

  constructor(authService: AuthService) {
    this.authService = authService;
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
  signup: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, surname, pnr, email, username, password, role_id } =
        req.body;
      const addedUser = await sequelize.transaction(async () => {
        return await this.authService.addNewUser(
          name,
          surname,
          pnr,
          email,
          username,
          password,
          role_id
        );
      });

      if (!addedUser) {
        res.status(401).send('field to signup');
      }

      res.status(201).json({ user: addedUser });
    } catch (err) {
      next(err);
    }
  };
}
