import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';
import CompetenceProfile from './CompetenceProfile';

/**
 * Represents a skill or qualification that applicants can possess.
 * Each competence is associated with a competenceProfile
 */

class Competence extends Model {
  declare competence_id: number;
  declare name: string;

  declare CompetenceProfiles?: CompetenceProfile[];
}

Competence.init(
  {
    competence_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    modelName: 'competence',
    tableName: 'competence',
    timestamps: false
  }
);

export default Competence;
