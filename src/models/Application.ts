import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';
import Person from './Person';
import Status from './Status';

class Application extends Model {
  declare application_id: number;
  declare person_id: number;
  declare status_id: number;
  declare submitted_date: Date;
  
  // Associations
  declare Person?: Person;
  declare Status?: Status;
}

Application.init(
  {
    application_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
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
    status_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue : 1,
      references: { 
        model: Status, 
        key: 'status_id' 
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    submitted_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName : 'application',
    tableName: 'application',
    timestamps: false,
  }
);


export default Application;
