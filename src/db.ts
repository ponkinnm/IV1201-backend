import sequelize from './config/dbsetup';
import { Application, Competence, Person, Status } from './model'; 

export const getApplications = async () => {
  const applications = await Application.findAll({
    include: [
      { model: Person, attributes: ['person_id', 'name', 'surname', 'email'] },
      { model: Status, attributes: ['status_name'] },
    ],
  });
  return applications;
};


export const getStatus = async () => {
  const status = await Competence.findAll();
  return status;
};