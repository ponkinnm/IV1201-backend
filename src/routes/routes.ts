import { Router } from 'express';
import { ApplicationController } from "../controllers/ApplicationController";
import { authMiddleware } from "../middleware/middleware_auth";
import { StatusRepository } from '../repositories/StatusRepository';

const router = Router();
const applicationController = new ApplicationController();
const statusRepo = new StatusRepository();
//router.use(authMiddleware);


router.get('/applications', applicationController.getAllApplications);

router.get('/applications/:application_id', applicationController.getApplicationDetailsById);

router.put('/applications/:application_id/status', applicationController.updateApplicationStatus);

router.get('/status', async (req, res) => {
    try {
      const statuses = await statusRepo.getAllStatus();
      res.json(statuses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch statuses" });
    }
  }); 

export default router; 