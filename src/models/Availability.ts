import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';
import Person from './Person';

/**
 * Represents a time period when an applicant is available to work.
 * Each availability record belongs to a specific person and defines
 * a date range with start and end dates.
 */

class Availability extends Model {
  declare availability_id: number;
  declare person_id: number;
  declare from_date: Date;
  declare to_date: Date;
  declare person: Person;
}
Availability.init(
  {
    availability_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Person,
        key: 'person_id'
      }
    },
    from_date: { type: DataTypes.DATEONLY, allowNull: false },
    to_date: { type: DataTypes.DATEONLY, allowNull: false }
  },
  {
    sequelize,
    modelName: 'availability',
    tableName: 'availability',
    timestamps: false
  }
);

export default Availability;
