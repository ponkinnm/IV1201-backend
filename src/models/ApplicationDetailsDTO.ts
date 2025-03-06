import { AvailabilityDTO } from './AvailabilityDTO';
import { CompetenceProfileDTO } from './CompetenceProfileDTO';
import { PersonDTO } from './PersonDTO';

/**
 * This class is an object contain application details for an sepecific applicant
 */
export class ApplicationDetailsDTO {
  application_id: number;
  person: PersonDTO;
  competence: CompetenceProfileDTO[];
  availability: AvailabilityDTO[];
  status: string;
  status_id: number;

  constructor(
    application_id: number,
    person: PersonDTO,
    competence: CompetenceProfileDTO[],
    availability: AvailabilityDTO[],
    status: string = 'unhandled',
    status_id: number
  ) {
    this.application_id = application_id;
    this.person = person;
    this.competence = competence;
    this.availability = availability;
    this.status = status;
    this.status_id = status_id;
  }
}
