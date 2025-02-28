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

/**
 *  @openapi
 *  /auth/signup:
 *    post:
 *      summary: Create a new user 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json: 
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the user
 *                surname:
 *                  type: string
 *                  description: The surname of the user
 *                pnr:
 *                  type: string
 *                  description: The personal number of the user
 *                email:
 *                  type: string
 *                  description: The email of the user
 *                username:
 *                  type: string
 *                  description: The username of the user
 *                password:
 *                  type: string
 *                  description: The password of the user
 *                role_id:
 *                  type: integer
 *                  description: The role of the user
 *      responses:
 *        201:
 *          description: The created user information
 *        400:
 *          description: Missing data or incorrect format of data
 */

authRouter.post('/signup', authController.signup);

authRouter.post('/varifyUser', authController.varifyUser);

authRouter.put('/password', authController.updatePassword);
