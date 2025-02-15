export class ApplicationDTO {
    application_id: number; // Unique identifier for the application
    name: string;          // Applicant's first name
    surname: string;       // Applicant's last name
    email: string;         // Applicant's email
    status_name: string;   // Current status of the application (e.g., "Pending")
   


    constructor(
      application_id: number,
      name: string,
      surname: string,
      email: string,
      status_name: string
    ) {
      this.application_id = application_id;
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.status_name = status_name;
    }


  };