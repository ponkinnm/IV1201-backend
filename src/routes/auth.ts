import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import { PersonRepository } from "../repositories/PersonRepository";
import { MockPersonRepository } from "../repositories/MockPersonRepository";

export const authRouter = Router();
const personRepository = process.env.NODE_ENV === 'test' ? new MockPersonRepository() : new PersonRepository();
const authService = new AuthService(personRepository);
const authController = new AuthController(authService);

/**
 *  @openapi
 *  /auth/login:
 *  post:
 *      summary: Logs a user in
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The username of the user
 *                password:
 *                  type: string
 *                  description: The password of the user
 *      responses:
 *        200:
 *          description: The now logged-in user's information
 *        400:
 *          description: Missing username or password
 *        401:
 *          description: Invalid username or password
 */
authRouter.post('/login', authController.login);



authRouter.post('/signup', authController.signup);
