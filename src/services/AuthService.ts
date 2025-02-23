import { IPersonRepository } from "../repositories/contracts/IPersonRepository";
import jwt from "jsonwebtoken";
import { Person } from "../models";
import { PersonDTO } from "../models/PersonDTO";

export class AuthService {
 private personRepository: IPersonRepository;
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

  generateJwtToken = (user: Person) => {
    const { username, name, surname, email,role_id } = user;
    const payload = { username, name, surname, email,role_id };
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRATION });
  }
}