import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';
import Person from './Person';
import Status from './Status';

/**
 * Represents a job application submitted by an applicant.
 * Each application belongs to a specific person, has a status,
 * and tracks when it was submitted. A person can only have one
 * active application at a time (person_id is unique).
 * Linked to person and status
 */

class Application extends Model {
  declare application_id: number;
  declare person_id: number;
  declare status_id: number;
  declare submitted_date: Date;

  // Associations
  declare person?: Person;
  declare status: Status;
}

Application.init(
  {
    application_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: Person, key: 'person_id' }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Status, key: 'status_id' }
    },
    submitted_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    sequelize,
    tableName: 'application',
    modelName: 'application',
    timestamps: false
  }
);

export default Application;
