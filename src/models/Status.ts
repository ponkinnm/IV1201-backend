import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';

class Status extends Model {
  declare status_id: number;
  declare status_name: string;
}

Status.init(
  {
    status_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    status_name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: 'status',
    timestamps: false,
  }
);

export default Status;
