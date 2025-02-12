import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';

class Competence extends Model {
    public competence_id!: number;
    public name!: string;
  }
  
  Competence.init(
    {
      competence_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: 'competence',
      timestamps: false,
    }
  );
  
  export default Competence;