import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { createNamespace } from 'cls-hooked';

dotenv.config();

// Create CLS namespace
const namespace = createNamespace('transaction-manager');
Sequelize.useCLS(namespace);

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Required for Heroku
    },
  },
  logging: false, // Disable logging for cleaner output
});


export default sequelize;
