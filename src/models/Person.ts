import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';

class Person extends Model {
  declare person_id: number;
  declare name: string;
  declare surname: string;
  declare pnr: string;
  declare email: string;
  declare password: string;
  declare role_id: number;
  declare username: string;
}

Person.init(
  {
    person_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    surname: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pnr: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'person',
    timestamps: false,
  }
);

export default Person;
