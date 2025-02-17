import {AvailabilityDTO} from "./AvailabilityDTO";
import { CompetenceProfileDTO } from "./CompetenceProfileDTO";
import { PersonDTO } from "./PersonDTO";

/**
 * This class is an object contain application details for an sepecific applicant 
 */
export class ApplicationDetailsDTO{
    application_id : number;
    person : PersonDTO;
    competence : CompetenceProfileDTO[];
    availability : AvailabilityDTO[];
    status : string;


    constructor(application_id : number, person: PersonDTO, competence: CompetenceProfileDTO [], availability: AvailabilityDTO[], status: string){
        this.application_id = application_id;
        this.person = person;
        this.competence = competence;
        this.availability = availability;
        this.status = status;
    }
}