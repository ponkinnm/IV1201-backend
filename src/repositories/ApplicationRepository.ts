import { IApplicationRepository } from "./contracts/IApplicationRepository";
import Application from "../models/Applications";
import { Person, Status } from "../models";

export class ApplicationRepository implements IApplicationRepository {
  async getAllApplications() {
    return await Application.findAll({
      include: [
        { model: Person, attributes: ['person_id', 'name', 'surname', 'email'] },
        { model: Status, attributes: ['status_name'] },
      ],
    });
  };
}