import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';
import Person from './Person';

class Role extends Model {
  declare role_id: number;
  declare name: string;

  declare Persons?: Person[];
}

Role.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'role',
    tableName: 'role',
    timestamps: false
  }
);

export default Role;
