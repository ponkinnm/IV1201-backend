import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbsetup';


class Role extends Model {
  public role_id!: number;
  public name!: string;
}

Role.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'role',
    timestamps: false,
  }
);

export default Role;
