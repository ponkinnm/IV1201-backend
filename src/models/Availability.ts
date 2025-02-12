import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';
import Person from './Person';

class Availability extends Model {
  public availability_id!: number;
  public person_id!: number;
  public from_date!: Date;
  public to_date!: Date;
}

Availability.init(
  {
    availability_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    person_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Person, key: 'person_id' } },
    from_date: { type: DataTypes.DATEONLY, allowNull: false },
    to_date: { type: DataTypes.DATEONLY, allowNull: false },
  },
  {
    sequelize,
    tableName: 'availability',
    timestamps: false,
  }
);

export default Availability;
