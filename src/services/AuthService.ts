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
 // findUserAndVerifyPassword = async (username: string, password: string) => {
   // const person = await this.personRepository.findUserByUsername(username);

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
    const { username, name, surname, email,role_id } = user;
    const payload = { username, name, surname, email,role_id };
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRATION });
  }
}
