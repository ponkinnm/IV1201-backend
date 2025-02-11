import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';
import Person from './Person';
import Status from './Status';

class Application extends Model {
  public application_id!: number;
  public person_id!: number;
  public status_id!: number;
  public submitted_date!: Date;
}

Application.init(
  {
    application_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    person_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Person, key: 'person_id' } },
    status_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Status, key: 'status_id' } },
    submitted_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'application',
    timestamps: false,
  }
);

export default Application;
