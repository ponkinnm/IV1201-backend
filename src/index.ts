import express from 'express';
import pool from './db';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Example Express + TypeScript Server');
});

app.get('/hello', (req, res) => {
  res.send('Hello World');
});

// 
app.get('/testing', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.person');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
