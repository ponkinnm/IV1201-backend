import { IApplicationRepository } from "./contracts/IApplicationRepository";
import Application from "../models/Application";
import { ApplicationDTO } from "../models/ApplicationDTO";
import { Person, Status, } from "../models";
import { PersonRepository } from "./PersonRepository";
import { AvailabilityRepository } from "./AvailabilityRepository";
import { CompetenceProfileRepository } from "./CompetenceProfileRepository";
import { ApplicationDetailsDTO } from "../models/ApplicationDetailsDTO";

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
  * @param application_id the user id
  * @returns an object of applicationDetailDTO that contail all user info, competences, availablities and status of the application
  */
  async getApplicationDetailsById(application_id : number){
      try{
        const personRepo = new PersonRepository();
        const availabilityRepo = new AvailabilityRepository();
        const competenceRepo = new CompetenceProfileRepository();

        const application = await Application.findByPk(application_id, {
          include: [
            { model: Status, attributes: ['status_name'] }
          ],
          attributes: ['application_id', 'person_id', 'status_id']
        });


          if (!application) {
            throw new Error(`Application details not found for application_id: ${application_id}`);
        }
          
          const person = await personRepo.getUserDetailById(application.person_id);
          const competences = await competenceRepo.getCompetenceProfileById(application.person_id); 
          const availabilities = await availabilityRepo.getAllAvailabilyById(application.person_id);

          const applicationDetail : ApplicationDetailsDTO = new ApplicationDetailsDTO(
            application_id,
            person,
            competences,
            availabilities,
            application!.Status!.status_name
          );

          return applicationDetail;
      }catch(error){

       console.log(" error fetching",error);
      }
  };


  async updateApplicationStatus(application_id : number, new_status_id : number){

    try{
      const [updatedCount, updatedRows] = await Application.update(
        { status_id: new_status_id }, 
        { where: { application_id }, returning : true }
    );

    if (updatedCount === 0) {
        console.log('No record updated. Application not found.');
        return null;
    }
    console.log('Application updated successfully:', updatedRows[0]);
    return updatedRows[0]; 
    }catch(err){
      console.error('Error updating application:', err);
    }

  };

    
}
