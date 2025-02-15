import { IApplicationRepository } from "./contracts/IApplicationRepository";
import Application from "../models/Application";
import { ApplicationDTO } from "../models/ApplicationDTO";
import { Person, Status, } from "../models";
import { PersonRepository } from "./PersonRepository";
import { AvailabilityRepository } from "./AvailabilityRepository";
import { CompetenceProfileRepository } from "./CompetenceProfileRepository";
import { CompetenceProfileDTO } from "../models/CompetenceProfileDTO";
import { ApplicationDetailDTO } from "../models/ApplicationDetailsDTO";

/**
 * This class is responible for all call to database that is related to application
 * get Allapplications, get applicationDetail, post an application, update the status of an application
 */
export class ApplicationRepository implements IApplicationRepository {

  /**
   * 
   * @returns this method return a list of all existing application in database
   */
  async getAllApplications() {
    const applications = await Application.findAll({
      include: [
        { model: Person, attributes: ['person_id', 'name', 'surname', 'email'] },
        { model: Status, attributes: ['status_name'] },
      ],
    });

    const applicationsDTO: ApplicationDTO[] = applications.map((app) =>
      new ApplicationDTO(
        app.application_id,
        app.Person!.name,
        app.Person!.surname,
        app.Person!.email,
        app.Status!.status_name,
      )
    );

    return applicationsDTO;
  };

 /**
  * 
  * @param person_id the user id
  * @returns an object of applicationDetailDTO that contail all user info, competences, availablities and status of the application
  */
  async getApplicationDetailsById(person_id : number){
      try{
        const personRepo = new PersonRepository();
        const availabilityRepo = new AvailabilityRepository();
        const competenceRepo = new CompetenceProfileRepository();

        const application = await Application.findOne({where: {person_id},
          include :[
            {model: Status, attributes:['status_name'] }
          
          ],
            attributes: ['application_id']
          });
          
          const person = await personRepo.getUserDetailById(person_id);
          const competences = await competenceRepo.getCompetenceProfileById(person_id); 
          const availabilities = await availabilityRepo.getAllAvailabilyById(person_id);

          const applicationDetail : ApplicationDetailDTO = new ApplicationDetailDTO(
            application!.application_id,
            person,
            competences,
            availabilities,
            application!.Status!.status_name
          );

          return applicationDetail;
      }catch(error){

        throw error;
      }
  };
}
