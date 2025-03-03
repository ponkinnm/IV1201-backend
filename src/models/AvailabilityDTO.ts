export class AvailabilityDTO {
  // availability_id!: number;
  person_id: number;
  from_date: Date;
  to_date: Date;

  constructor(person_id: number, from_date: Date, to_date: Date) {
    this.person_id = person_id;
    this.from_date = from_date;
    this.to_date = to_date;
  }
}
