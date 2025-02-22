import { Availability } from "../models";
import { AvailabilityDTO } from "../models/AvailabilityDTO";
import { IAvailabilityRepository } from "./contracts/IAvailabilityRepository";

export class AvailabilityRepository implements IAvailabilityRepository{

    async getAllAvailabilyById(person_id :number){

        try {
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


      async  addAvailability(person_id : number, availabilities: Array<{from_date : Date, to_date: Date}>){
        try {
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
          throw new Error('Failed to add new availability for person with person_id ${person_id}.');
      }
        }
}