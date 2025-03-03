import { Request, Response, NextFunction, RequestHandler } from "express";
import sequelize from "../config/dbsetup";
import { AuthService } from "../services/AuthService";

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
      const user = await this.authService.findUserAndVerifyPassword(username, password);

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

      res.json({ username: user.username, name: user.name, id: user.person_id });
    } catch (err) {
      next(err);
    }
  }

/**
 * function to hanlde user log out
 * @param req 
 * @param res 
 * @param next 
 */
  logout: RequestHandler = (_req, res, next) => {
    try{
    res.clearCookie(this.authService.JWT_COOKIE_NAME);
    res.status(200).json({ message: 'Logged out successfully' });
  }catch(err){
    next(err);
  }
  }


  
  signup: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, surname, pnr, email, username, password, role_id } = req.body;
      console.log("email is: ", email);

      const addedUser = await sequelize.transaction(async () => {
        return await this.authService.addNewUser(name, surname, pnr, email, username, password, role_id);
      });

      if (!addedUser) {
        res.status(401).send("failed to signup");
      }
      
      const accessToken = this.authService.generateJwtToken(addedUser);

      res.cookie(this.authService.JWT_COOKIE_NAME, accessToken, { 
        httpOnly: true, 
        secure: true,
        sameSite: 'none' 
      });
      const { password: _password, pnr: _pnr, ...userWithoutSensitiveData } = addedUser;
      res.status(201).json({ user: userWithoutSensitiveData });
    } catch (err) {
      next(err);
    }
  }
}
