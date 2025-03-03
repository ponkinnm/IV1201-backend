import { IPersonRepository } from "./contracts/IPersonRepository";
import { Person, Role } from "../models";
import {PersonDTO} from '../models/PersonDTO';
import { Validators } from "../util/validator";



/**
 * Repository class for handling person/user-related database operations
 */
export class PersonRepository implements IPersonRepository {

    /**
     * Finds a user by their username
     * @param {string} username - The username to search for
     * @returns {Promise<Person | null>} A promise that resolves with the user if found, null otherwise
     */

    async findUserByUsername(username: string) {
    
     Validators.isValidUsernameOrEmail(username);

       const person = await Person.findOne({ where: { username } });
        if(!person)
            return null;
        
        return  person;
    }

    /**
     * Retrieves detailed information about a user by their ID
     * @param {number} person_id - The ID of the person to retrieve details for
     * @returns {Promise<PersonDTO>} A promise that resolves with the user details
     */
    async getUserDetailById(person_id : number){

        Validators.isValidId(person_id, "person_id");

        const person = await Person.findByPk(person_id,
            {
                include: [ {model : Role, attributes: ['name']}]
            }
        );
        if(!person){
            console.log('could not find user');
            return null;
        }
        const personDTO = new PersonDTO(
            person
        );
        return personDTO;
    };

    /**
     * Finds a user by their email address
     * @param {string} email - The email address to search for
     * @returns {Promise<PersonDTO | null>} A promise that resolves with the user if found, null otherwise
     */
    async findUserByEmail(email: string){

        Validators.isValidUsernameOrEmail(email);

        const person = await Person.findOne({where : {email}});

        if(!person)
            return null;

        return person;
    }

    /**
     * Adds a new user (An applicant ) to the database
     * @param {string} name - The user's first name
     * @param {string} surname - The user's last name
     * @param {number} pnr - The user's personal number
     * @param {string} email - The user's email address
     * @param {string} username - The user's username
     * @param {string} password - The user's password
     * @param {number} role_id - The user's role ID
     * @returns {Promise<PersonDTO>} A promise that resolves with the created user's details
     */
    async addNewUser(name: string, surname:string, pnr: string, email: string, username:string, password: string, role_id :number){

        Validators.isName(name, "name");
        Validators.isName(surname, "surname");
        Validators.isValidPersonalNumber(pnr);
        Validators.isValidUsernameOrEmail(email);
        Validators.isValidUsernameOrEmail(username);
        Validators.isValidPassword(password);
        Validators.isValidId(role_id, "role_id");

        const person = await Person.create(
            {
                name : name,
                surname : surname,
                pnr : pnr,
                username : username,
                password : password,
                role_id : role_id
            }
        );
        return person;
    }

    /**
     * Updates a user's password
     * @param {number} person_id - The ID of the person to update
     * @param {string} new_password - The new password to set
     * @returns {Promise} A promise that resolves when the password is updated
     */
    async addNewPassword(person_id: number, new_password: string){
        try{
            Validators.isValidId(person_id, "person_id");
            Validators.isValidPassword(new_password);

            const [updatedCount, updatedRows] = await Person.update(
              { password: new_password }, 
              { where: { person_id }, returning : true }
          );
      
          if (updatedCount === 0) {
              console.log('No record updated. Person not found.');
              return null;
          }
          console.log('Passwords updated successfully:', updatedRows[0]);
          return updatedRows[0]; 
          }catch(err){
            console.error('Error updating password:', err);
            throw err;
          }
    }

    /**
     * Updates a user's email address
     * @param {number} person_id - The ID of the person to update
     * @param {string} new_email - The new email address to set
     * @returns {Promise} A promise that resolves when the email is updated
     */
    async addNewEmail(person_id :number, new_email: string){
        try{
            Validators.isValidId(person_id, "person_id");
            Validators.isValidUsernameOrEmail(new_email);
            const [updatedCount, updatedRows] = await Person.update(
              { email: new_email }, 
              { where: { person_id }, returning : true }
          );
      
          if (updatedCount === 0) {
              console.log('No record updated. Person not found.');
              return null;
          }
          console.log('Email has been updated successfully:', updatedRows[0]);
          return updatedRows[0]; 
          }catch(err){
            console.error('Error updating email:', err);
            throw err;
          }
    }

    /**
     * Updates both username and password for a user
     * @param {number} person_id - The ID of the person to update
     * @param {string} new_username - The new username to set
     * @param {string} new_password - The new password to set
     * @returns {Promise} A promise that resolves when both username and password are updated
     */
    async addUsernameAndPassword(person_id : number, new_username: string, new_password: string){
    try{
        Validators.isValidId(person_id, "person_id");
        Validators.isValidUsernameOrEmail(new_username);
        Validators.isValidPassword(new_password);
        const [updatedCount, updatedRows] = await Person.update(
          { username: new_username, password : new_password }, 
          { where: { person_id }, returning : true }
      );
  
      if (updatedCount === 0) {
          console.log('No record updated. Person not found.');
          return null;
      }
      console.log('Username and password has been updated successfully:', updatedRows[0]);
      return updatedRows[0]; 
      }catch(err){
        console.error('Error updating person %d:', err, person_id);
        throw err;
      }
   }
}


