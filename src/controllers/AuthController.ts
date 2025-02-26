import { RequestHandler } from "express";
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

    res.json({ username: user.username, name: user.name, id: user.person_id })}
    catch (err) {
      next(err);
    }
  }
}
