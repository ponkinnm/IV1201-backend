import { IPersonRepository } from "../repositories/contracts/IPersonRepository";
import jwt from "jsonwebtoken";
import { Person } from "../models";

export class AuthService {
 private personRepository: IPersonRepository;
 private readonly JWT_SECRET: string;
 public readonly JWT_EXPIRATION = '30m';
 public readonly JWT_COOKIE_NAME = 'accessToken';

  constructor(personRepository: IPersonRepository) {
    this.personRepository = personRepository;
    this.JWT_SECRET = process.env.JWT_SECRET as string;
  }

  findUserAndVerifyPassword = async (username: string, password: string) => {
    const person = await this.personRepository.findUserByUsername(username);
    if (!person) {
      return null;
    }
    const isPasswordValid = person.password === password;
    return isPasswordValid ? person : null;
  }

  generateJwtToken = (user: Person) => {
    const { username, name, surname, email } = user;
    const payload = { username, name, surname, email };
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRATION });
  }
}