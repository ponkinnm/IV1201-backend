import { IApplicationRepository } from '../repositories/contracts/IApplicationRepository';

/**
 * Service class for handling application-related operations
 */
export class ApplicationService {
  private readonly applicationRepository: IApplicationRepository;

  constructor(applicationRepository: IApplicationRepository) {
    this.applicationRepository = applicationRepository;
  }

  /**
   * Retrieves all applications
   * @returns {Promise} A promise that resolves with all applications
   */
  async getAllApplications() {
    try {
      return await this.applicationRepository.getAllApplications();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Retrieves details for a specific application by its ID
   * @param {number} application_id - The ID of the application to retrieve
   * @returns {Promise} A promise that resolves with the application details
   */
  async getApplicationDetailsById(application_id: number) {
    try {
      return await this.applicationRepository.getApplicationDetailsById(
        application_id
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Updates the status of an application
   * @param {number} application_id - The ID of the application to update
   * @param {number} new_status_id - The new status ID to set for the application
   * @returns {Promise} A promise that resolves when the status is updated
   */
  async updateApplicationStatus(application_id: number, new_status_id: number) {
    try {
      return await this.applicationRepository.updateApplicationStatus(
        application_id,
        new_status_id
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Submits a new application with associated availabilities and competences
   * @param {number} person_id - The ID of the applicant
   * @param {Array<{from_date: Date, to_date: Date}>} availabilities - Array of availability periods
   * @param {Array<{competence_id: number, years_of_experience: number}>} competences - Array of competence profiles
   * @returns {Promise} A promise that resolves with the submitted application details
   * @throws {Error} If there's an error submitting the application
   */
  async submitApplication(
    person_id: number,
    availabilities: Array<{ from_date: Date; to_date: Date }>,
    competences: Array<{ competence_id: number; years_of_experience: number }>
  ) {
    try {
      return await this.applicationRepository.submitApplication(
        person_id,
        availabilities,
        competences
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
