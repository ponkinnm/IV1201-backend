import Application from '../models/Application';
import { Person, Status } from '../models';
import { IApplicationRepository } from './contracts/IApplicationRepository';
import { ApplicationDTO } from '../models/ApplicationDTO';
import { PersonRepository } from './PersonRepository';
import { AvailabilityRepository } from './AvailabilityRepository';
import { CompetenceProfileRepository } from './CompetenceProfileRepository';
import { ApplicationDetailsDTO } from '../models/ApplicationDetailsDTO';

/**
 * Repository class for handling application-related database operations
 * Handles CRUD operations for applications including:
 * - Retrieving all applications
 * - Getting application details
 * - Creating new applications
 * - Updating application status
 */
export class ApplicationRepository implements IApplicationRepository {
  /**
   * Retrieves all applications from the database
   * @returns {Promise<ApplicationDTO[]>} A promise that resolves with an array of application DTOs
   */
  async getAllApplications() {
    const applications = await Application.findAll({
      include: [
        {
          model: Person,
          attributes: ['person_id', 'name', 'surname', 'email']
        },
        { model: Status, attributes: ['status_name'] }
      ]
    });

    const applicationsDTO: ApplicationDTO[] = applications.map(
      (app) =>
        new ApplicationDTO(
          app.application_id,
          app.person!.name,
          app.person!.surname,
          app.person!.email,
          app.status!.status_name
        )
    );
    return applicationsDTO;
  }

  /**
   * Retrieves detailed information about a specific application
   * @param {number} application_id - The ID of the application to retrieve details for
   * @returns {Promise<ApplicationDetailsDTO>} A promise that resolves with the application details
   */
  async getApplicationDetailsById(application_id: number) {
    try {
      const personRepo = new PersonRepository();
      const availabilityRepo = new AvailabilityRepository();
      const competenceRepo = new CompetenceProfileRepository();

      const application = await Application.findByPk(application_id, {
        include: [{ model: Status, attributes: ['status_name'] }],
        attributes: ['application_id', 'person_id', 'status_id']
      });

      if (!application) {
        throw new Error(
          `Application details not found for application_id: ${application_id}`
        );
      }

      const person = await personRepo.getUserDetailById(application.person_id);
      if (!person) {
        throw new Error(
          `Person not found for person_id: ${application.person_id} in application: ${application_id}`
        );
      }
      const competences = await competenceRepo.getCompetenceProfileById(
        application.person_id
      );
      const availabilities = await availabilityRepo.getAllAvailabilyById(
        application.person_id
      );

      const applicationDetail: ApplicationDetailsDTO =
        new ApplicationDetailsDTO(
          application_id,
          person,
          competences,
          availabilities,
          application!.status?.status_name
        );

      return applicationDetail;
    } catch (error) {
      console.log(' error fetching', error);
    }
  }

  /**
   * Updates the status of an application
   * @param {number} application_id - The ID of the application to update
   * @param {number} new_status_id - The new status ID to set
   * @returns {Promise} A promise that resolves when the status is updated
   */
  async updateApplicationStatus(application_id: number, new_status_id: number) {
    try {
      const [updatedCount, updatedRows] = await Application.update(
        { status_id: new_status_id },
        { where: { application_id }, returning: true }
      );

      if (updatedCount === 0) {
        console.log('No record updated. Application not found.');
        return null;
      }
      console.log('Application updated successfully:', updatedRows[0]);
      return updatedRows[0];
    } catch (err) {
      console.error('Error updating application:', err);
    }
  }

  /**
   * Add a new application with associated availabilities and competences
   * @param {number} person_id - The ID of the person creating the application
   * @param {Array<{from_date: Date, to_date: Date}>} availabilities - Array of availability periods
   * @param {Array<{ competence_id: number; years_of_experience: number }>} competences - Array of competence profiles
   * @returns {Promise<ApplicationDetailsDTO>} A promise that resolves with the created application details
   */
  async submitApplication(
    person_id: number,
    availabilities: Array<{ from_date: Date; to_date: Date }>,
    competences: Array<{ competence_id: number; years_of_experience: number }>
  ) {
    try {
      // Check if an application already exists for this person
      const existingApplication = await Application.findOne({
        where: { person_id }
      });

      if (existingApplication) {
        console.log(`Application already exists for person_id: ${person_id}`);
        return null;
      }

      const availabilityRepo = new AvailabilityRepository();
      const competenceRepo = new CompetenceProfileRepository();

      const application = await Application.create({
        person_id: person_id,
        status_id: 1
      });

      await competenceRepo.addNewCompetenceProfile(person_id, competences);
      await availabilityRepo.addAvailability(person_id, availabilities);

      return this.getApplicationDetailsById(application.application_id);
    } catch (err) {
      console.error('Error submitting application:', err);
      return null;
    }
  }
}
