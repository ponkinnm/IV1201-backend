import { AvailabilityDTO } from "../../models/AvailabilityDTO";


export interface IAvailabilityRepository{
    getAllAvailabilyById(person_id : number): Promise<AvailabilityDTO[]>;
}