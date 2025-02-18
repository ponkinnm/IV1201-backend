import { RequestHandler } from "express";
import { AuthService } from "../services/AuthService";
import { PersonRepository } from "../repositories/PersonRepository";

export class AuthController {
  private authService = new AuthService(new PersonRepository());

  login: RequestHandler = async (req, res) => {
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

    console.log('token:', accessToken);
    

    res.cookie(this.authService.JWT_COOKIE_NAME, accessToken, { httpOnly: true, secure: true });
    res.json({ username: user.username, name: user.name, id: user.person_id })
  }
}