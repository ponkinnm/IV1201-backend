import { Availability } from '../../models';
import { AvailabilityDTO } from '../../models/AvailabilityDTO';

export interface IAvailabilityRepository {
  getAllAvailabilyById(person_id: number): Promise<AvailabilityDTO[]>;
  addAvailability(
    person_id: number,
    availabilities: Array<{ from_date: Date; to_date: Date }>
  ): Promise<Availability[]>;
}
