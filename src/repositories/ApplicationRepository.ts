import { IApplicationRepository } from "./contracts/IApplicationRepository";
import Application from "../model/Application";
import { Person, Status } from "../model";

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