import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';
import Role from './Role';
import CompetenceProfile from './CompetenceProfile';
import Availability from './Availability';
import Application from './Application';
import bcrypt from 'bcrypt';

class Person extends Model {
  declare person_id: number;
  declare name: string;
  declare surname: string;
  declare pnr: string;
  declare email: string;
  declare password: string;
  declare role_id: number;
  declare username: string;

  declare Role?: Role;
  declare CompetenceProfiles?: CompetenceProfile[];
  declare Availabilities?: Availability[];
  declare Application?: Application;


  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

}

Person.init(
  {
    person_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    surname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pnr: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true
    },
    password: {
      type: DataTypes.STRING(255)
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'role_id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'person',
    tableName: 'person', 
    timestamps: false,
    hooks: {
      beforeCreate: async (person: Person) => {
        const saltRounds = 10;
        person.password = await bcrypt.hash(person.password, saltRounds);
      },
    },

  }
);

export default Person;
