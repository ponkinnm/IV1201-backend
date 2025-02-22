import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';
import Person from './Person';

class Availability extends Model {
  declare availability_id: number;
  declare person_id: number;
  declare from_date: Date;
  declare to_date: Date;
}

Availability.init(
  {
    availability_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    person_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { 
        model: Person, 
        key: 'person_id' 
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    from_date: { type: DataTypes.DATEONLY, allowNull: false },
    to_date: { type: DataTypes.DATEONLY, allowNull: false },
  },
  {
    sequelize,
    modelName: 'availability',
    tableName: 'availability',
    timestamps: false,
  }
);

export default Availability;
