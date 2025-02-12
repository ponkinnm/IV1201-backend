import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';
import Person from './Person';
import Competence from './Competence';

class CompetenceProfile extends Model {
  public competence_profile_id!: number;
  public person_id!: number;
  public competence_id!: number;
  public years_of_experience!: number;
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
    tableName: 'competence_profile',
    timestamps: false,
  }
);

export default CompetenceProfile;