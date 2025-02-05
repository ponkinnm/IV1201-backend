import { Router } from 'express';
import * as db from '../db';

const router = Router();

router.get('/', (req, res) => {
  res.send('Example Express + TypeScript Server');
});

router.get('/hello', (req, res) => {
  res.send('Hello World');
});

router.get('/testing', async (req, res) => {
  try {
    const persons = await db.getPersons();
    res.json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;