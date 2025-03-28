import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { PersonRepository } from '../repositories/PersonRepository';
import { MockPersonRepository } from '../repositories/MockPersonRepository';
import { PersonService } from '../services/PersonService';
import { body } from 'express-validator';

export const authRouter = Router();
const personRepository =
  process.env.NODE_ENV === 'test'
    ? new MockPersonRepository()
    : new PersonRepository();
const authService = new AuthService(personRepository);
const personService = new PersonService(personRepository);
const authController = new AuthController(authService, personService);

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
authRouter.post(
  '/login',
  [
    body('username').isString().isLength({ min: 3 }),
    body('password').isString().isLength({ min: 6 })
  ],
  authController.login
);

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

authRouter.post(
  '/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('name').isString().trim().escape().isLength({ min: 3 }),
    body('pnr').isLength({ min: 10, max: 12 }),
    body('password').isString().isLength({ min: 6 })
  ],
  authController.signup
);

/**
 *  @openapi
 *  /auth/logout:
 *    post:
 *      summary: Logs a user out
 *      responses:
 *        200:
 *          description: User successfully logged out
 *        401:
 *          description: Unauthorized access
 */
authRouter.post('/logout', authController.logout);

/**
 *  @openapi
 *  /auth/forgotpassword:
 *    post:
 *      summary: Forgot password
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                emailOrUsername:
 *                  type: string
 *                  description: The email or username of the user
 *      responses:
 *        200:
 *          description: Recovery email sent successfully
 *        401:
 *          description: Invalid credentials, user not found
 */
authRouter.post('/forgotpassword', authController.forgotpassword);
/**
 *  @openapi
 *  /auth/password:
 *    put:
 *      summary: Updates a user's password
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                person_id:
 *                  type: integer
 *                  description: The ID of the user
 *                password:
 *                  type: string
 *                  description: The new password
 *      responses:
 *        200:
 *          description: Password updated successfully
 *        400:
 *          description: Invalid data provided
 *        404:
 *          description: User not found
 */
authRouter.put('/password', authController.updatePassword);
