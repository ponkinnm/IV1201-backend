import { IPersonRepository } from "../repositories/contracts/IPersonRepository";
import jwt from "jsonwebtoken";
import { Person } from "../models";
import { PersonDTO } from "../models/PersonDTO";

/**
 * Service class for handling authentication-related operations
 */
export class AuthService {
 private readonly personRepository: IPersonRepository;
 private readonly JWT_SECRET: string;
 public readonly JWT_EXPIRATION = '30m';
 public readonly JWT_COOKIE_NAME = 'accessToken';

  /**
   * Check if a person (user) is a recruiter
   */
 public static isRecruiter  = (personDTO?: PersonDTO) => {
  return !!(personDTO && personDTO.role_id === 1);
 }

  constructor(personRepository: IPersonRepository) {
    this.personRepository = personRepository;
    this.JWT_SECRET = process.env.NODE_ENV === 'test' ? 'dummy' : process.env.JWT_SECRET as string;
  }


  /**
   * Verifies if a user exists and if the provided password matches
   * @param {string} username - The username to verify
   * @param {string} password - The password to verify
   * @returns {Promise<Person | null>} The user if credentials are valid, null otherwise
   */

  findUserAndVerifyPassword = async (usernameOrEmail: string, password: string) => {
    let person = await this.personRepository.findUserByUsername(usernameOrEmail);
    if(!person){
      person = await this.personRepository.findUserByEmail(usernameOrEmail);
    }

    if (!person) {
      return null;
    }
    const isPasswordValid = person.password === password;
    return isPasswordValid ? person : null;
  }

  /**
   * Generates a JWT token for an authenticated user
   * @param {Person} user - The user object containing token payload data
   * @returns {string} The generated JWT token
   */
  generateJwtToken = (user: Person) => {
    const { username, name, surname, email, role_id, person_id } = user;
    
    const payload = { username, name, surname, email,role_id, person_id };
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRATION });
  }


        /**
     * Adds a new user with the provided details
     * @param {string} name - The user's first name
     * @param {string} surname - The user's last name
     * @param {number} pnr - The user's personal number
     * @param {string} email - The user's email address
     * @param {string} username - The user's username
     * @param {string} password - The user's password
     * @param {number} role_id - The user's role ID
     * @returns {Promise} A promise that resolves when the user is added
     */
        async addNewUser(name: string, surname:string,
          pnr: string, 
          email: string, 
          username:string, 
          password: string, 
          role_id: number ): Promise<Person>{
             try{
              return await this.personRepository.addNewUser(name, surname,pnr, email, username,password, role_id);
             } catch(err){
                console.error("An error occurred:", err);
                throw err;
          }
      }

    /**
     * Updates a user's password
     * @param {number} person_id - The ID of the person to update
     * @param {string} new_password - The new password to set
     * @returns {Promise} A promise that resolves when the password is updated
     */
    async addNewPassword(person_id: number, new_password: string){
      try{
          return await this.personRepository.addNewPassword(person_id, new_password);
      }catch(err){
          console.log(err)
          throw new Error("Field to update password");
      }
  }

  
    /**
   * Verifies if a user exists and if the provided password matches
   * @param {string} emailOrUsername - The username to verify
   * @returns {Promise<Person | null>} The user if credentials are valid, null otherwise
   */

    findUser = async (emailOrUsername: string) => {
      let person = await this.personRepository.findUserByUsername(emailOrUsername);
      if(!person){
        person = await this.personRepository.findUserByEmail(emailOrUsername);
      }
  
      if (!person) {
        return null;
      }
      return  person;
    }

}
