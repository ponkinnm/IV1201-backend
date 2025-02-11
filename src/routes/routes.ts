import { Router } from 'express';
import { ApplicationController } from "../controllers/ApplicationController";

const router = Router();
const applicationController = new ApplicationController();

router.get('/getApplications', applicationController.getAllApplications);

export default router;