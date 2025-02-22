import { IPersonRepository } from "./contracts/IPersonRepository";
import { Person, Role } from "../models";
import {PersonDTO} from '../models/PersonDTO';


export class PersonRepository implements IPersonRepository {
    async findUserByUsername(username: string) {
        return Person.findOne({ where: { username } });
    }

    async getUserDetailById(person_id : number){

        const person = await Person.findByPk(person_id,
            {
                include: [ {model : Role, attributes: ['name']}]
            }
        );
        const personDTO = new PersonDTO(
            person!.person_id,
            person!.name,
            person!.surname,
            person!.pnr,
            person!.email,
            person!.role_id
        );
        return personDTO;
    };

    async findUserByEmail(email: string){
        const person = await Person.findOne({where : {email}});
        if(!person)
            return null;
        return new PersonDTO(            
            person.person_id,
            person.name,
            person.surname,
            person.pnr,
            person.email,
            person.role_id
        );
    }

    async addNewUser(name: string, surname:string, pnr: number, email: string, username:string, password: string, role_id: number ) : Promise<PersonDTO>{
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
        return new PersonDTO(
            person.person_id,
            person.name,
            person.surname,
            person.pnr,
            person.email,
            person.role_id
        );
    }

    async addNewPassword(person_id: number, new_password: string){
        try{
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
            return null;
          }
    }

    async addNewEmail(person_id :number, new_email: string) {
        try{
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
            return null;
          }
    }

   async addUsernameAndPassword(person_id : number, new_username: string, new_password: string){
    try{
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
        return null;
      }
   }
}