import express from 'express';
import sequelize from './config/dbsetup';
import cors from 'cors'; 
import router from './routes/routes';

const app = express();
const port = process.env.PORT || 3000;

//Only allow requests coming from the frontend domain.
const corsOptions = {origin : 'https://iv1201-frontend.vercel.app'};

app.use(cors(corsOptions)); 
app.use(express.json());
app.use('/', router);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`Server running on port ${port}`);
});
