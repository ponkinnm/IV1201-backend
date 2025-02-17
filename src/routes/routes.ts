import { Router } from 'express';
import { ApplicationController } from "../controllers/ApplicationController";


const router = Router();
const applicationController = new ApplicationController();

router.get('/applications', applicationController.getAllApplications);

router.get('/applications/:application_id', applicationController.getApplicationDetailsById);

router.put('/applications/:application_id/status', applicationController.updateApplicationStatus);

export default router;