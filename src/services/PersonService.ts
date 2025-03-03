import { PersonRepository } from '../repositories/PersonRepository';

/**
 * Service class for handling person/user-related operations
 */
export class PersonService {
  private readonly personRepository: PersonRepository;

  constructor(personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }

  /**
   * Retrieves user details by person ID
   * @param {number} person_id - The ID of the person to retrieve details for
   * @returns {Promise} A promise that resolves with the user details
   */
  async getUserDetailsById(person_id: number) {
    try {
      return await this.personRepository.getUserDetailById(person_id);
    } catch (err) {
      console.log(err);
      throw new Error('Field to get user detail with person_id ${person_id}');
    }
  }

  /**
   * Adds a new user with the provided details
   * @param {string} name - The user's first name
   * @param {string} surname - The user's last name
   * @param {string} pnr - The user's personal number
   * @param {string} email - The user's email address
   * @param {string} username - The user's username
   * @param {string} password - The user's password
   * @param {number} role_id - The user's role ID
   * @returns {Promise} A promise that resolves when the user is added
   */
  async addNewUser(
    name: string,
    surname: string,
    pnr: string,
    email: string,
    username: string,
    password: string,
    role_id: number
  ) {
    try {
      return await this.personRepository.addNewUser(
        name,
        surname,
        pnr,
        email,
        username,
        password,
        role_id
      );
    } catch (err) {
      console.log(err);
      throw new Error('Field to add a new user');
    }
  }

  /**
   * Updates a user's password
   * @param {number} person_id - The ID of the person to update
   * @param {string} new_password - The new password to set
   * @returns {Promise} A promise that resolves when the password is updated
   */
  async addNewPassword(person_id: number, new_password: string) {
    try {
      return await this.personRepository.addNewPassword(
        person_id,
        new_password
      );
    } catch (err) {
      console.log(err);
      throw new Error('Field to update password');
    }
  }

  /**
   * Updates a user's email address
   * @param {number} person_id - The ID of the person to update
   * @param {string} new_email - The new email address to set
   * @returns {Promise} A promise that resolves when the email is updated
   */
  async addNewEmail(person_id: number, new_email: string) {
    try {
      return await this.personRepository.addNewEmail(person_id, new_email);
    } catch (err) {
      console.log(err);
      throw new Error('Field to update email');
    }
  }

  /**
   * Updates both username and password for a user
   * @param {number} person_id - The ID of the person to update
   * @param {string} new_username - The new username to set
   * @param {string} new_password - The new password to set
   * @returns {Promise} A promise that resolves when both username and password are updated
   */
  async addUsernameAndPassword(
    person_id: number,
    new_username: string,
    new_password: string
  ) {
    try {
      return await this.personRepository.addUsernameAndPassword(
        person_id,
        new_username,
        new_password
      );
    } catch (err) {
      console.log(err);
      throw new Error('Filed to update username and password');
    }
  }
}
