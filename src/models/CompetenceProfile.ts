import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';
import Person from './Person';
import Competence from './Competence';

class CompetenceProfile extends Model {
  declare competence_profile_id: number;
  declare person_id: number;
  declare competence_id: number;
  declare years_of_experience: number;

  declare Person?: Person;
  declare Competence?: Competence;
}

CompetenceProfile.init(
  {
    competence_profile_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    person_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Person, key: 'person_id' } },
    competence_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Competence, key: 'competence_id' } },
    years_of_experience: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
  },
  {
    sequelize,
    modelName: 'competence_profile',
    tableName: 'competence_profile',
    timestamps: false,
  }
);


export default CompetenceProfile;