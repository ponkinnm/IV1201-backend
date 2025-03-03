
import { Availability } from "../models";
import { AvailabilityDTO } from "../models/AvailabilityDTO";
import { Validators } from "../util/validator";
import { IAvailabilityRepository } from "./contracts/IAvailabilityRepository";


/**
 * Repository class for handling availability-related database operations
 */
export class AvailabilityRepository implements IAvailabilityRepository {
  /**
   * Retrieves all availabilities for a specific person
   * @param {number} person_id - The ID of the person to retrieve availabilities for
   * @returns {Promise<AvailabilityDTO[]>} A promise that resolves with an array of availability DTOs
   */
  async getAllAvailabilyById(person_id: number) {
    try {
      const availabilities = await Availability.findAll({
        where: { person_id }
      });

      const availabilitiesDTO: AvailabilityDTO[] = availabilities.map(
        (app) => new AvailabilityDTO(app.person_id, app.from_date, app.to_date)
      );


        try {
            Validators.isValidId(person_id, "person_id");
            const availabilities = await Availability.findAll({ where: { person_id } });
            const availabilitiesDTO: AvailabilityDTO[] = availabilities.map((app) => new AvailabilityDTO(
              app.person_id,
              app.from_date,
              app.to_date
            ));
            
            return availabilitiesDTO;
          } catch (error) {
            console.error('Error fetching availabilities:', error);
            throw error; // Propagate the error to the service/controller layer
          }
        }

  /**
   * Adds multiple availability records for a person
   * @param {number} person_id - The ID of the person to add availabilities for
   * @param {Array<{from_date: Date, to_date: Date}>} availabilities - Array of availability objects with from/to dates
   * @returns {Promise} A promise that resolves when the availabilities are added
   */
  async addAvailability(
    person_id: number,
    availabilities: Array<{ from_date: Date; to_date: Date }>
  ) {
    try {
      const insertedAvailablility = await Availability.bulkCreate(
        availabilities.map((avai) => ({
          person_id,
          from_date: avai.from_date,
          to_date: avai.to_date
        }))
      );

    /**
     * Adds multiple availability records for a person
     * @param {number} person_id - The ID of the person to add availabilities for
     * @param {Array<{from_date: Date, to_date: Date}>} availabilities - Array of availability objects with from/to dates
     * @returns {Promise} A promise that resolves when the availabilities are added
     */
    async addAvailability(person_id : number, availabilities: Array<{from_date : Date, to_date: Date}>){
        try {
          for(const availability of availabilities){
            Validators.isValidDate(availability.from_date, "from_date");
            Validators.isValidDate(availability.to_date, "to_date");
          }
          const insertedAvailablility = await Availability.bulkCreate(
            availabilities.map((avai) => ({
                  person_id,
                  from_date: avai.from_date,
                  to_date: avai.to_date,
              }))
          );

          return insertedAvailablility;
      } catch (error) {
          console.error('Error adding new availability:', error);
          throw error;
      }
    }
}
