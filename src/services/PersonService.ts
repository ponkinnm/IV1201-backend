import { PersonRepository } from "../repositories/PersonRepository";

export class PersonService{
    private personRepository : PersonRepository;



    constructor(personRepository : PersonRepository){
        this.personRepository = personRepository;
    }


    async getUserDetailsById(person_id :number){
        try{
            return await this.personRepository.getUserDetailById(person_id);
        }catch(err){
            throw new Error("Field to get user detail with person_id ${person_id}");
        }
    }

    async addNewUser(name: string, surname:string,
        pnr: number, 
        email: string, 
        username:string, 
        password: string, 
        role_id: number ){
           try{
            return await this.personRepository.addNewUser(name, surname,pnr, email, username,password, role_id);
           } catch(err){
            throw new Error("Field to add a new user");
        }
    }

    async addNewPassword(person_id: number, new_password: string){
        try{
            return await this.personRepository.addNewPassword(person_id, new_password);
        }catch(err){
            throw new Error("Field to update password");
        }
    }

    async addNewEmail(person_id :number, new_email: string){
        try{
            return await this.personRepository.addNewEmail(person_id, new_email);
        }catch(err){
            throw new Error("Field to update email");
        }
    }

    async addUsernameAndPassword(person_id : number, new_username: string, new_password: string){
        try{
            return await this.personRepository.addUsernameAndPassword(person_id, new_username, new_password);
        }catch(err){
            throw new Error("Filed to update username and password");
        }
    }
    
}