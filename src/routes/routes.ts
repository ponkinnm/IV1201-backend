import { Router } from 'express';
import { ApplicationController } from "../controllers/ApplicationController";

const router = Router();
const applicationController = new ApplicationController();

router.get('/getApplications', applicationController.getAllApplications);

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