import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { createNamespace } from 'cls-hooked';

dotenv.config({
  path: '.env.development.local'
});

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

export async function initDb() {
  await sequelize.authenticate();
  console.log('Database connection established successfully.');
  await sequelize.sync({ alter: true });
  console.log('Database models synchronized successfully.');
}


export default sequelize;
