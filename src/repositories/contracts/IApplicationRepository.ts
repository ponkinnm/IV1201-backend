import { Application } from '../../models';
import { ApplicationDetailsDTO } from '../../models/ApplicationDetailsDTO';
import { ApplicationDTO } from '../../models/ApplicationDTO';

export interface IApplicationRepository {
  getAllApplications(): Promise<ApplicationDTO[]>;
  getApplicationDetailsById(
    application_id: number
  ): Promise<ApplicationDetailsDTO | undefined>;
  updateApplicationStatus(
    application_id: number,
    new_status_id: number
  ): Promise<Application | null | undefined>;

  submitApplication(
    person_id: number,
    availabilities: Array<{ from_date: Date; to_date: Date }>,
    competences: Array<{ competence_id: number; years_of_experience: number }>
  ): Promise<ApplicationDetailsDTO | null | undefined>;
}
