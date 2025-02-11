import { Router } from 'express';
import * as db from '../db';

const router = Router();

router.get('/', (req, res) => {
  res.send('Example Express + TypeScript Server');
});

router.get('/hello', (req, res) => {
  res.send('Hello World');
});

router.get('/getApplications', async (req, res) => {
  try {
    const persons = await db.getApplications();
    res.json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/getStatus', async (req, res) => {
  try {
    const status = await db.getStatus();
    res.json(status);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;