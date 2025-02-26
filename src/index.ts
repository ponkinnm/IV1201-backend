import express from 'express';
import cors, { type CorsOptions } from 'cors';
import router from './routes/routes';
import { authRouter } from "./routes/auth";
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs'
import { initDb } from "./config/dbsetup";

const app = express();
const port = process.env.PORT || 3000;

//Only allow requests coming from the frontend domain.
const corsOptions: CorsOptions = {
  origin: ['https://iv1201-frontend.vercel.app', 'http://localhost:5173', /https:\/\/iv1201-frontend.+ponkinnms-projects\.vercel.app$/],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRouter);
app.use('/', router);


async function startServer() {
  await initDb();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;